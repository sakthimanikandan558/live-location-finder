import { useState } from "react";
import useGeolocation from "../hooks/useGeolocation";
import { getAddress } from "../api/location";

export default function LocationCard() {
    const { location, error, loading: geoLoading, getLocation } = useGeolocation();
    const [address, setAddress] = useState(null);
    const [addressLoading, setAddressLoading] = useState(false);

    const fetchAddress = async () => {
        setAddressLoading(true);
        const data = await getAddress(location.lat, location.lon);
        setAddress(data);
        setAddressLoading(false);
    };

    return (
        <div className="bg-white/10 backdrop-blur-xl shadow-2xl rounded-2xl p-8 w-[380px] border border-white/20">
            <h1 className="text-2xl font-bold text-white text-center mb-6">
                📍 Live Location Finder
            </h1>

            <button
                onClick={getLocation}
                disabled={geoLoading}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold hover:scale-[1.02] transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
                {geoLoading && (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                )}
                {geoLoading ? "Detecting..." : "Detect My Location"}
            </button>

            {error && (
                <p className="text-red-400 text-sm mt-4 text-center">{error}</p>
            )}

            {location && (
                <div className="mt-6 space-y-2 text-white text-sm">
                    <div className="flex justify-between">
                        <span>Latitude</span>
                        <span>{location.lat}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Longitude</span>
                        <span>{location.lon}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Accuracy</span>
                        <span>{location.accuracy} m</span>
                    </div>

                    <button
                        onClick={fetchAddress}
                        className="mt-5 w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold hover:scale-[1.02] transition shadow-lg"
                    >
                        Convert to Address
                    </button>
                </div>
            )}

            {/* Loader */}
            {addressLoading && (
                <div className="flex justify-center mt-6">
                    <div className="w-10 h-10 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                </div>
            )}

            {address && !addressLoading && (
                <div className="mt-6 bg-white/10 p-4 rounded-xl text-white text-sm space-y-1">
                    <p className="font-semibold">📌 {address.display_name}</p>
                    <p>🏙 {address.address.city || address.address.town}</p>
                    <p>🗺 {address.address.state}</p>
                    <p>🌍 {address.address.country}</p>
                    <p>📮 {address.address.postcode}</p>
                </div>
            )}
        </div>
    );
}
