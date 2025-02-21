import React from "react";

const cars = [
  {
    id: 1,
    model: "Toyota Corolla",
    company: "Hertz",
    city: "Madrid",
    country: "España",
    mileage: Math.floor(Math.random() * 200000) + 5000,
    fuelConsumption: "6.5 L/100km",
    seats: 5,
    transmission: "Automático",
    bluetooth: true,
    fuelType: "Gasolina",
    pricePerDay: 45,
    available: true,
    warranty: {
      duration: "3 años",
      coverage: "Cobertura total en colisiones menores, asistencia en carretera"
    },
    image: "https://source.unsplash.com/400x300/?car",
    info: "Un coche cómodo y eficiente, ideal para viajes urbanos y carretera."
  },
  {
    id: 2,
    model: "Ford Focus",
    company: "Avis",
    city: "Barcelona",
    country: "España",
    mileage: Math.floor(Math.random() * 200000) + 5000,
    fuelConsumption: "5.8 L/100km",
    seats: 5,
    transmission: "Manual",
    bluetooth: false,
    fuelType: "Diésel",
    pricePerDay: 50,
    available: false,
    warranty: {
      duration: "2 años",
      coverage: "Cobertura parcial, sin asistencia en carretera"
    },
    image: "https://source.unsplash.com/400x300/?car,ford",
    info: "Espacioso y potente, ideal para largos viajes por carretera."
  }
];

const CarCard = ({ car }) => {
  return (
    <div className="border p-4 rounded-lg shadow-lg bg-white">
      <img src={car.image} alt={car.model} className="w-full h-48 object-cover rounded-md" />
      <h2 className="text-xl font-bold mt-2">{car.model}</h2>
      <p className="text-gray-700">Compañía: {car.company}</p>
      <p className="text-gray-700">Ubicación: {car.city}, {car.country}</p>
      <p className="text-gray-700">Kilometraje: {car.mileage} km</p>
      <p className="text-gray-700">Consumo: {car.fuelConsumption}</p>
      <p className="text-gray-700">Plazas: {car.seats}</p>
      <p className="text-gray-700">Transmisión: {car.transmission}</p>
      <p className="text-gray-700">Bluetooth: {car.bluetooth ? "Sí" : "No"}</p>
      <p className="text-gray-700">Combustible: {car.fuelType}</p>
      <p className="text-gray-700 font-semibold">Precio/día: ${car.pricePerDay}</p>
      <p className={`font-bold ${car.available ? "text-green-500" : "text-red-500"}`}>
        {car.available ? "Disponible" : "No disponible"}
      </p>
      <div className="mt-2 border-t pt-2">
        <p className="font-bold">Garantía: {car.warranty.duration}</p>
        <p className="text-gray-700">{car.warranty.coverage}</p>
      </div>
      <p className="mt-2 text-gray-700">{car.info}</p>
    </div>
  );
};

export default function CarRental() {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">Alquiler de Coches</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cars.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>
    </div>
  );
}
