import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AccountNav from "../AccountNav";
import PlaceImg from "../PlaceImg";
import BookingDates from "../BookingDates";

export default function BookingsPage() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get('/bookings')
            .then(response => {
                setBookings(response.data);
            })
            .catch(error => {
                console.error("Error fetching bookings:", error);
            });
    }, []);

    if(loading) {
        return <p className="text-center text-gray-600">Loading bookings...</p>;
    }

    return (
        <div>
            <AccountNav />
            <div className="mt-4">
                {bookings?.length > 0 ? (
                    bookings.map(booking => (
                        <Link 
                            key={booking._id} 
                            to={`/account/bookings/${booking._id}`} 
                            className="flex gap-4 bg-gray-200 rounded-2xl overflow-hidden p-4 mb-4"
                        >
                            <div className="w-48">
                                <PlaceImg place={booking.place} />
                            </div>
                            <div className="py-3 pr-3 grow">
                                <h2 className="text-xl font-semibold">{booking.place.title}</h2>
                                <div className="text-sm text-gray-500 mb-2 mt-4">
                                    <BookingDates booking={booking} />
                                </div>
                                <div className="flex items-center gap-2">
                                    <svg 
                                        xmlns="http://www.w3.org/2000/svg" 
                                        fill="none" 
                                        viewBox="0 0 24 24" 
                                        strokeWidth={1.5} 
                                        stroke="currentColor" 
                                        className="w-8 h-8 text-gray-600"
                                    >
                                        <path 
                                            strokeLinecap="round" 
                                            strokeLinejoin="round" 
                                            d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" 
                                        />
                                    </svg>
                                    <span className="text-xl font-semibold">
                                        Total price: Rs.{booking.price}
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))
                ) : (
                    <p className="text-center text-gray-600">No bookings found.</p>
                )}
            </div>
        </div>
    );
}
