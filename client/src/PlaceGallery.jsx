import { useState } from "react";
import PropTypes from "prop-types";

export default function PlaceGallery({ place }) {
  const [showAllPhotos, setShowAllPhotos] = useState(false);

  if (showAllPhotos) {
    return (
      <div className="fixed inset-0 bg-black/90 text-white min-h-screen z-50 overflow-y-auto">
        <div className="max-w-6xl mx-auto p-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-semibold text-gray-100">Photos of {place.title}</h2>
            <button
              onClick={() => setShowAllPhotos(false)}
              className="py-2 px-4 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-colors duration-300 flex items-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              Close
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {place?.photos?.length > 0 &&
              place.photos.map((photo, index) => (
                <div 
                  key={index} 
                  className="transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
                >
                  <img
                    src={`http://localhost:4000/uploads/${photo}`}
                    alt={`Photo ${index + 1}`}
                    className="w-full h-72 object-cover rounded-xl shadow-lg"
                  />
                </div>
              ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="grid gap-4 grid-cols-[2fr_1fr] rounded-3xl overflow-hidden shadow-2xl">
        <div className="relative">
          {place.photos?.[0] && (
            <div className="h-full">
              <img
                onClick={() => setShowAllPhotos(true)}
                className="w-full h-full object-cover cursor-pointer"
                src={`http://localhost:4000/uploads/${place.photos[0]}`}
                alt="Main Photo"
              />
            </div>
          )}
        </div>
        <div className="grid grid-rows-2 gap-4">
          {place.photos?.[1] && (
            <img
              onClick={() => setShowAllPhotos(true)}
              className="w-full h-full object-cover cursor-pointer"
              src={`http://localhost:4000/uploads/${place.photos[1]}`}
              alt="Photo 2"
            />
          )}
          {place.photos?.[2] && (
            <img
              onClick={() => setShowAllPhotos(true)}
              className="w-full h-full object-cover cursor-pointer"
              src={`http://localhost:4000/uploads/${place.photos[2]}`}
              alt="Photo 3"
            />
          )}
        </div>
      </div>

      <button
        onClick={() => setShowAllPhotos(true)}
        className="absolute bottom-4 right-4 py-2 px-4 bg-white/80 hover:bg-white text-black rounded-xl shadow-lg flex items-center gap-2 transition-all duration-300"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M21 21H4.5a2.25 2.25 0 01-2.25-2.25V6.75A2.25 2.25 0 014.5 4.5h15A2.25 2.25 0 0121 6.75v10.5A2.25 2.25 0 0118.75 21z"
          />
        </svg>
        Show More Photos
      </button>
    </div>
  );
}

PlaceGallery.propTypes = {
  place: PropTypes.shape({
    title: PropTypes.string,
    photos: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};