
# 🚀 WonderWise – Smart AI-Powered Travel Planner

**WonderWise** is a cutting-edge travel planning platform that uses artificial intelligence and dynamic path optimization to revolutionize how people plan and experience their journeys. Forget rigid tour packages and hours of manual research — WonderWise empowers travelers to create fully customizable, cost-efficient, and personalized itineraries in real time.

---

## 🧠 What is WonderWise?

> ✈️ A travel assistant that thinks with you.

WonderWise dynamically generates travel routes based on selected checkpoints (like cities, attractions, hotels, etc.) while optimizing for time, cost, and user preferences. It recalculates paths and budgets live as you modify your trip — ensuring ultimate flexibility, transparency, and convenience.

---

## 💡 Key Features

| Feature | Description |
|--------|-------------|
| 🧭 **Dynamic Checkpoint Planning** | Add/remove destinations anytime — the system adapts on the fly. |
| 📊 **Real-Time Cost Estimation** | Pricing updates instantly as you customize your route. |
| 🤖 **AI-Powered Recommendations** | Personalized suggestions using collaborative & content-based filtering. |
| 🧾 **QR-Based Unified Ticketing** | One QR code for all travel bookings, tickets, and checkpoints. |
| 🚗 **Modified A\* Algorithm** | Intelligent route optimization using advanced graph theory. |
| ☁️ **Modern Web Stack** | Built with React.js, Node.js (Express), and MongoDB for speed and scalability. |

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React.js, Map APIs |
| Backend | Node.js, Express.js |
| Database | MongoDB |
| AI Integration | Recommendation Systems (CF + CBF), Modified A* Algorithm |
| APIs Used | Google Maps API, TripAdvisor API, Skyscanner API, OpenWeather API, Booking.com, Exchange Rate APIs |

---

## 🧮 How It Works

WonderWise treats each user-selected location as a **node** and calculates the most efficient route using a **graph-based model** enhanced by a **modified A* search algorithm**. It constantly adapts to user behavior, budget, and interest via:

- **g(n):** Cost from the start to current checkpoint  
- **h(n):** Heuristic estimate from current to final destination  
- **f(n):** Total predicted cost of the path

When you add or remove a checkpoint, the system recalculates:

- Total trip cost  
- Best possible route  
- Nearby recommendations  
- QR-encoded journey pass

---

## 📦 Project Architecture

```
WonderWise/
│
├── client/             # React frontend (interactive UI, map view)
├── server/             # Node.js + Express backend
├── models/             # MongoDB schemas
├── routes/             # API endpoints
├── utils/              # AI logic, A* algorithm, recommendation engine
└── README.md
```

---

## 📈 Future Enhancements

- ✅ Mobile app version (React Native / Flutter)
- 🌐 Multi-language support
- 📅 Calendar-based planning assistant
- 🧠 Deep learning for better travel pattern prediction
- 📣 Voice-based itinerary creation

---

## 📄 License

This project is licensed under the [MIT License](https://choosealicense.com/licenses/mit/). You are free to use, modify, and distribute this project with credit to the original authors.

---

## 🙌 Acknowledgements

Developed with dedication by:
- Anjar Alam
- Anshu Upadhyay
- Jain Ketan
Special thanks to our mentors, contributors, and the developer community.
- Dr. Sandeep Kumar Mathariya
---

## 🌍 Let’s Redefine the Way We Travel!

If you like this project, consider ⭐ starring the repo to support it!  
For collaboration or feedback, feel free to open issues or pull requests.
