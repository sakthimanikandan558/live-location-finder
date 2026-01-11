import LocationCard from "./components/LocationCard";
import world from "./assets/world.jpg";

export default function App() {
  return (
    <div className="h-screen w-full grid grid-cols-1 md:grid-cols-2 overflow-hidden">

      {/* LEFT: Full Map */}
      <div className="relative">
        <img
          src={world}
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>

        {/* Branding */}
        <div className="absolute bottom-10 left-10 text-white">
          <h1 className="text-4xl font-bold">Global Positioning</h1>
          <p className="text-white/70 mt-2">
            Live geolocation powered by OpenStreetMap
          </p>
        </div>
      </div>

      {/* RIGHT: Sliding Card */}
      <div className="flex items-center justify-center bg-gradient-to-br 
        from-[#0f172a] via-[#312e81] to-[#581c87]">
        <div className="animate-slide-up">
          <LocationCard />
        </div>
      </div>
    </div>
  );
}
