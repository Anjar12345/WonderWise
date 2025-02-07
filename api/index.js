const express = require('express');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/User');
const Place = require('./models/Place');
const Booking = require('./models/Booking');
const cookieParser = require('cookie-parser');
const imageDownloader = require('image-downloader');
const multer = require('multer');
const fs = require('fs');
const Blog = require('./models/Blog');
const BookingModel = require('./models/Booking');
const uploadDir = path.join(__dirname, "uploads");

require('dotenv').config();
const app = express();

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'abcdefghij';

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173',
}));

const connectToDatabase = async () => {
    try {
        // Ensure you have a valid MongoDB URI in your `.env` file
        const mongoUri = process.env.MONGO_URL;
        if (!mongoUri) {
            throw new Error("MongoDB URI is not set in environment variables.");
        }

        await mongoose.connect(mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds
        });

        console.log("Connected to MongoDB successfully!");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);

        // Retry connection if necessary
        setTimeout(() => {
            console.log("Retrying MongoDB connection...");
            connectToDatabase();
        }, 5000); // Retry after 5 seconds
    }
};

// Initialize connection
connectToDatabase();


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);  
    },
    filename: function (req, file, cb) {
        const filename = Date.now() + '-' + file.originalname;
        cb(null, filename);  
    },
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 },
}).array('photos', 10);



function getUserDataFromReq(req) {
    return new Promise((resolve, reject) => {
        const token = req.cookies.token;
        if (!token || token.trim() === '') {
            return reject(new Error("No valid authentication token found"));
        }
        jwt.verify(token, jwtSecret, {}, (err, userData) => {
            if (err) {
                console.error("Token verification error:", err);
                if (err.name === 'TokenExpiredError') {
                    reject(new Error("Token has expired. Please log in again."));
                } else if (err.name === 'JsonWebTokenError') {
                    reject(new Error("Invalid token. Please log in again."));
                } else {
                    reject(new Error("Authentication failed"));
                }
            } else {
                resolve(userData);
            }
        });
    });
}

app.post("/upload-by-link", async (req, res) => {
    const { link } = req.body;
    try {
        const newName = `photo_${Date.now()}.jpg`;
        const destPath = path.join(__dirname, "uploads" , newName);
        await imageDownloader.image({
            url: link,
            dest: destPath,
        });
        res.json(newName);
    } catch (error) {
        console.error("Error downloading image:", error);
        res.status(500).json({ error: "Failed to download image" });
    }
});

app.post('/upload', upload, (req, res) => {
    const uploadedFiles = req.files.map(file => file.filename);
    res.json(uploadedFiles);
})

app.post('/blogs', upload, async (req, res) => {
    try {
        const userData = await getUserDataFromReq(req);
        if (!userData) {
            return res.status(401).json({ error: 'Unauthorized. Please log in to create a blog.' });
        }

        const { title, content } = req.body;

        if (!title || !content) {
            return res.status(400).json({ error: 'Title and content are required.' });
        }

        const imageFiles = req.files.map(file => file.filename);

        const blog = await Blog.create({
            title,
            content,
            author: userData.id,
            images: imageFiles,
        });

        res.status(201).json(blog);
    } catch (error) {
        console.error("Full Error Details:", error);
        res.status(500).json({ 
            error: error.message || 'Failed to create blog.',
            fullError: error
        });
    }
});

app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const userDoc = await User.create({
            name,
            email,
            password: bcrypt.hashSync(password, bcryptSalt),
        });
        res.json(userDoc);
    } catch (e) {
        res.status(422).json(e);
    }
});

app.get('/blogs', async (req, res) => {
    try {
        const blogs = await Blog.find().populate('author', 'name');
        res.json(blogs);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch blogs' });
    }
});

app.get("/blogs/:id", async (req, res) => {
    const { id } = req.params;
    const blog = await Blog.findById(id).populate('author', 'name'); // Adjust based on your database query
    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }
    res.json(blog);
  });
  

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const userDoc = await User.findOne({ email });
    if (userDoc) {
        const passOk = bcrypt.compareSync(password, userDoc.password);
        if (passOk) {
            jwt.sign(
                { email: userDoc.email, id: userDoc._id }, 
                jwtSecret, 
                {}, 
                (err, token) => {
                    if (err) throw err;
                    res.cookie('token', token, {
                        httpOnly: true,
                        secure: process.env.NODE_ENV === 'production',
                        sameSite: 'strict',
                        maxAge: 24 * 60 * 60 * 1000
                    }).json(userDoc);
                }
            );
        } else {
            res.status(422).json('pass not ok');
        }
    } else {
        res.json('not found');
    }
});

app.get('/profile', (req, res) => {
    const { token } = req.cookies;
    if (token) {
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) throw err;
            const { name, email, _id } = await User.findById(userData.id);
            res.json({ name, email, _id });
        });
    } else {
        res.json(null);
    }
});

app.post('/logout', (req, res) => {
    res.cookie('token', '').json(true);
});

app.post('/places', (req, res) => {
    const { token } = req.cookies;
    const { title, address, addedPhotos, description, price, perks, extraInfo, checkIn, checkOut, maxGuests } = req.body;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) throw err;
        const placeDoc = await Place.create({
            owner: userData.id,
            price,
            title,
            address,
            photos: addedPhotos,
            description,
            perks,
            extraInfo,
            checkIn,
            checkOut,
            maxGuests,
        });
        res.json(placeDoc);
    });
});

app.get('/user-places', (req, res) => {
    const { token } = req.cookies;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        const { id } = userData;
        res.json(await Place.find({ owner: id }));
    });
});

app.get('/places', async (req, res) => {
    res.json(await Place.find());
});

app.get('/places/:id', async (req, res) => {
    const { id } = req.params;
    res.json(await Place.findById(id));
});

app.put('/places', async (req, res) => {
    const { token } = req.cookies;
    const { id, title, address, addedPhotos, description, perks, extraInfo, checkIn, checkOut, maxGuests, price } = req.body;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) throw err;
        const placeDoc = await Place.findById(id);
        if (userData.id === placeDoc.owner.toString()) {
            placeDoc.set({
                title,
                address,
                photos: addedPhotos,
                description,
                perks,
                extraInfo,
                checkIn,
                checkOut,
                maxGuests,
                price,
            }); 
            await placeDoc.save();
            res.json('ok');
        }
    });
});

app.delete('/user-places/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await Place.findByIdAndDelete(id);
        res.status(200).send({ message: 'Place deleted successfully' });
    } catch (error) {
        res.status(500).send({ message: 'Error deleting place' });
    }
});

app.post('/bookings', async (req, res) => {
    try {
        const userData = await getUserDataFromReq(req);
        const { place, checkIn, checkOut, numberOfGuests, name, phone, price } = req.body;

        if (!place || !checkIn || !checkOut || !price) {
            return res.status(400).json({ error: 'Required fields are missing' });
        }

        const booking = await Booking.create({
            place,
            checkIn,
            checkOut,
            numberOfGuests,
            name,
            phone,
            price,
            user: userData.id,
        });

        res.status(201).json(booking);
    } catch (error) {
        console.error('Error creating booking:', error);
        res.status(500).json({ error: 'Failed to create booking' });
    }
});


app.get('/bookings', async (req, res) => {
    try {
        const userData = await getUserDataFromReq(req);
        const bookings = await Booking.find({ user: userData.id }).populate('place');
        res.json(bookings);
    } catch (error) {
        console.error('Error fetching bookings:', error);
        res.status(500).json({ error: 'Failed to fetch bookings' });
    }
});


app.delete('/api/blogs/:id', async (req, res) => {
    try {
        const blogId = req.params.id;
        const userData = await getUserDataFromReq(req);
        const blog = await Blog.findById(blogId);

        if (blog.author.toString() === userData.id.toString()) {
            await Blog.findByIdAndDelete(blogId);
            res.status(200).json({ message: 'Blog deleted successfully' });
        } else {
            res.status(403).json({ error: 'Unauthorized. You cannot delete this blog.' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message || 'Failed to delete the blog.' });
    }
});

app.listen(4000, () => {
    console.log("Server is running on port 4000");
});
