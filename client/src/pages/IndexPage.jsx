import axios from "axios";
import { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import {useKindeAuth} from "@kinde-oss/kinde-auth-react";


export default function IndexPage() {
    const [places,setPlaces] = useState([]);
    const { login, register } = useKindeAuth();
    useEffect(() => {
        axios.get('/places').then(response => {
            setPlaces(response.data);
        });
    }, []);
    return (
        <div className="mt-8 px-4 md:px-8">
            <h1 className="text-3xl md:text-4xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500 drop-shadow-lg tracking-wide">
                Famous Destinations
            </h1>
            <button onClick={register} type="button">Register</button>
            <button onClick={login} type="button">Log In</button>
            <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {places.length > 0 && places.map(place => (
                <Link 
                    key={place._id}
                    to={'/place/' + place._id}>
                    <div className="bg-gray-500 mb-2 rounded-2xl flex">
                        {place.photos?.[0] && (
                            <img className="rounded-2xl object-cover aspect-square" src={'http://localhost:4000/uploads/'+place.photos?.[0]} alt=""/>
                        )}
                    </div>
                    <h2 className="font-bold">{place.title}</h2>
                    <h3 className="text-sm text-gray-1000">{place.address}</h3>
                    
                    <div className = "mt-1">
                        <span className="font-bold">Rs.{place.price}</span> per night
                    </div>
                </Link>
            ))}
        </div>
        </div>
        
    );
}