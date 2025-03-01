import { useState, useEffect } from "react";
import { Card, CardContent, Input, Button } from "@mui/material";


const Vuelosbuscador = () => {
  const [hotels, setHotels] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/hotels")
      .then((res) => res.json())
      .then((data) => setHotels(data))
      .catch((error) => console.error("Error fetching hotels:", error));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Encuentra tu hotel ideal</h1>
      <Input
        type="text"
        placeholder="Buscar por ciudad o nombre..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4"
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {hotels
          .filter((hotel) =>
            hotel.name.toLowerCase().includes(search.toLowerCase())
          )
          .map((hotel) => (
            <Card key={hotel.id} className="p-4 shadow-lg">
              <img src={hotel.image} alt={hotel.name} className="w-full h-40 object-cover rounded-lg mb-2" />
              <CardContent>
                <h2 className="text-lg font-semibold">{hotel.name}</h2>
                <p className="text-gray-600">{hotel.location}</p>
                <p className="text-green-600 font-bold">${hotel.price} por noche</p>
                <Button className="mt-2">Ver detalles</Button>
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  );
};

export default Vuelosbuscador;

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/hotelesDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const hotelSchema = new mongoose.Schema({
  name: String,
  location: String,
  price: Number,
  image: String,
});

const Hotel = mongoose.model("Hotel", hotelSchema);

// Obtener todos los hoteles
app.get("/hotels", async (req, res) => {
  try {
    const hotels = await Hotel.find();
    res.json(hotels);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
