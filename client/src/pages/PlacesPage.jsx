import { Link } from "react-router-dom";
import AccountNav from "../AccountNav";
import { useEffect, useState } from "react";
import axios from "axios";
import PlaceImg from "../PlaceImg";
import AddressLink from "../AddressLink";

export default function PlacesPage() {
    const [places, setPlaces] = useState([]);

    useEffect(() => {
        axios.get('/user-places').then(({ data }) => {
            setPlaces(data);
        });
    }, []);

    const deletePlace = async (placeId) => {
        try {
            // Make a DELETE request to the backend
            await axios.delete(`/user-places/${placeId}`);
            // Update the state by filtering out the deleted place
            setPlaces(places.filter(place => place._id !== placeId));
        } catch (error) {
            console.error("Error deleting place:", error);
        }
    };

    return (
        <div>
            <AccountNav />
            <div className="text-center">
                <Link className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full" to={'/account/places/new'}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    Add new place
                </Link>
            </div>
            <div className="mt-4">
                {places.length > 0 && places.map(place => (
                    <div key={place._id} className="flex items-center cursor-pointer gap-4 bg-gray-100 p-2 rounded-2xl">
                        <Link 
                            to={'/account/places/' + place._id} 
                            className="flex grow gap-4">
                            <div className="w-32 h-32 bg-gray-300 flex items-center justify-center overflow-hidden rounded-lg shrink-0">
                                <PlaceImg place={place} className="w-full h-full object-cover" />
                            </div>
                            <div className="grow">
                                <h2 className="text-xl font-semibold">{place.title}</h2>
                                <AddressLink>{place.address}</AddressLink>
                                <p className="text-sm mt-2 text-gray-600">{place.description}</p>
                            </div>
                        </Link>
                        <button 
                            onClick={() => deletePlace(place._id)} 
                            className="bg-red-500 text-white py-2 px-4 rounded-full">
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
