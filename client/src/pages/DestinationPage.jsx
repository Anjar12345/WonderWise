

export default function DestinationPage() {
    const destinations = [
        {
            name: "Paris, France",
            image: "https://plus.unsplash.com/premium_photo-1661919210043-fd847a58522d?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGFyaXN8ZW58MHx8MHx8fDA%3D",
            description: "Known as the City of Lights, Paris offers world-class art, culture, and cuisine.",
        },
        {
            name: "Tokyo, Japan",
            image: "https://plus.unsplash.com/premium_photo-1661914240950-b0124f20a5c1?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dG9reW98ZW58MHx8MHx8fDA%3D",
            description: "A vibrant mix of traditional and futuristic experiences awaits you in Tokyo.",
        },
        {
            name: "Santorini, Greece",
            image: "https://plus.unsplash.com/premium_photo-1688410049290-d7394cc7d5df?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8c2FudG9yaW5pJTJDJTIwZ3JlZWNlfGVufDB8fDB8fHww",
            description: "Famous for its whitewashed buildings, stunning sunsets, and crystal-clear waters.",
        },
        {
            name: "Taj Mahal, Agra, India",
            image: "https://images.unsplash.com/photo-1523980077198-60824a7b2148?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dGFqJTIwbWFoYWx8ZW58MHx8MHx8fDA%3D",
            description: "A stunning white marble mausoleum in Agra, India, symbolizing eternal love and architectural brilliance.",
        },
        {
            name: "The Great Wall Of China",
            image: "https://plus.unsplash.com/premium_photo-1664304492320-8359efcaad38?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Z3JlYXQlMjB3YWxsJTIwb2YlMjBjaGluYXxlbnwwfHwwfHx8MA%3D%3D",
            description: "An iconic ancient structure spanning thousands of miles, built to protect and unify China's borders.",
        },
        {
            name: "Petra, Jordan",
            image: "https://images.unsplash.com/photo-1693776578909-20d8364db6fd?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHBldHJhJTIwam9yZGFufGVufDB8fDB8fHww",
            description: "An ancient city carved into rose-red cliffs, renowned for its stunning archaeological wonders and historical significance.",
        },
        {
            name: "Christ the Redeemer, Brazil",
            image: "https://images.unsplash.com/photo-1564659907532-6b5f98c8e70f?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Q2hyaXN0JTIwdGhlJTIwUmVkZWVtZXIlMjAoQnJhemlsKXxlbnwwfHwwfHx8MA%3D%3D",
            description: "A towering statue of Jesus in Rio de Janeiro.",
        },
        {
            name: "Chichen Itza, Mexico",
            image: "https://images.unsplash.com/photo-1653423383200-5af8e48d9867?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Q2hpY2hlbiUyMEl0emElMjAoTWV4aWNvKXxlbnwwfHwwfHx8MA%3D%3D",
            description: "A large pre-Columbian archaeological site with the iconic El Castillo pyramid.",
        },
        {
            name: "Colosseum, Italy",
            image: "https://plus.unsplash.com/premium_photo-1675975678138-9413779a753a?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Q29sb3NzZXVtJTIwKEl0YWx5KXxlbnwwfHwwfHx8MA%3D%3D",
            description: "An iconic Roman amphitheater in Rome.",
        },

    ];

    return (
        <div className="bg-gradient-to-r from-blue-50 via-white to-blue-50 min-h-screen p-8">
            <h1 className="text-5xl font-extrabold text-center mb-12 text-transparent bg-clip-text bg-primary">
                Popular Destinations
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {destinations.map((destination, index) => (
                    <div
                        key={index}
                        className="relative group transform hover:-translate-y-2 hover:scale-105 transition-all duration-300 ease-in-out shadow-xl rounded-3xl overflow-hidden bg-white"
                    >
                        <img
                            src={destination.image}
                            alt={destination.name}
                            className="w-full h-60 object-cover transition-opacity duration-300 group-hover:opacity-90"
                        />
                        <div className="p-4">
                            <h2 className="text-2xl font-semibold mb-2 text-gray-800">
                                {destination.name}
                            </h2>
                            <p className="text-gray-600">{destination.description}</p>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-300"></div>
                        <div className="absolute bottom-4 left-4 bg-blue-600 text-white py-1 px-4 rounded-full text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            Explore Now
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
