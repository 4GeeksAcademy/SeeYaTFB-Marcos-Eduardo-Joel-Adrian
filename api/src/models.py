from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import ForeignKey, Enum
from dataclasses import dataclass
from enum import Enum 

db = SQLAlchemy()

@dataclass
class User(db.Model):
    __tablename__ = 'user'
    id: int = db.Column(db.Integer, primary_key=True)
    username: str = db.Column(db.String(50), nullable=False)
    first_name: str = db.Column(db.String(50), nullable=False)
    last_name: str = db.Column(db.String(50), nullable=True)
    email: str = db.Column(db.String(200), unique=True, nullable=False)
    password: str = db.Column(db.VARCHAR(60), nullable=False)
    country: str = db.Column(db.String(30), nullable=False)
    city: str = db.Column(db.String(30), nullable=True)
    address: str = db.Column(db.String(100), nullable=True)
    phone_number: str = db.Column(db.String(20), nullable=True)
    photo: str = db.Column(db.String(200), nullable=True)

class FavoriteTypeEnum(str, Enum):
    Hotels= "Hotel"
    Flys= "Flight"
    Excursions= "Excursion"
    Cars = "Car"

@dataclass
class Company(db.Model):
    __tablename__ = 'company'
    id: int = db.Column(db.Integer, primary_key=True)
    name: str= db.Column(db.String(50), nullable=False)
    admin = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    #do type of product
    def __repr__(self):
        return f"<Company {self.name}>"

@dataclass
class Favourite(db.Model): #Esto son las reservas
    __tablename__ = 'favourite'
    id: int = db.Column(db.Integer, primary_key=True)
    external_id: int = db.Column(db.Integer, nullable=False)
    type:FavoriteTypeEnum = db.Column(db.Enum(FavoriteTypeEnum), nullable=False)
    name: str = db.Column(db.String(50), nullable=False)
    user_id: int = db.Column(db.Integer, ForeignKey('user.id'), nullable=False)
    def __repr__(self):
        return f"<Favorito {self.name}>"

@dataclass
class Follower(db.Model):
    __tablename__ = 'follower'
    user_from_id: int = db.Column(db.Integer, ForeignKey('user.id'), primary_key=True)
    user_to_id: int = db.Column(db.Integer, ForeignKey('user.id'), primary_key=True)
  

@dataclass
class Hoteles(db.Model):
    __tablename__ = 'hoteles'
    id: int = db.Column(db.Integer, primary_key=True)
    name: str = db.Column(db.String(50), nullable=True)
    address: str = db.Column(db.String(50), nullable=False)
    city: str = db.Column(db.String(50), nullable=False)
    country: str = db.Column(db.String(50), nullable=False)
    cost: int = db.Column(db.Integer, nullable=False)
    stars: int = db.Column(db.Integer, nullable=False)
    check_in: int = db.Column(db.Integer, nullable=False)
    check_out: int = db.Column(db.Integer, nullable=False)
    pension: bool = db.Column(db.Boolean, nullable=False)
    available: bool = db.Column(db.Boolean, nullable=False)
    parking: bool = db.Column(db.Boolean, nullable=False)
    wifi: bool = db.Column(db.Boolean, nullable=False)
    pets: bool = db.Column(db.Boolean, nullable=False)
    pool: bool = db.Column(db.Boolean, nullable=False)
    sports: bool = db.Column(db.Boolean, nullable=False)
    events: bool = db.Column(db.Boolean, nullable=False)
    photo: str = db.Column(db.String(200), nullable=True)

    def __repr__(self):
        return f"<Hotel {self.name}>"

@dataclass
class Vuelos(db.Model):
    __tablename__ = 'vuelos'
    id: int = db.Column(db.Integer, primary_key=True)
    name: str = db.Column(db.String(50), nullable=True)
    company_id: int = db.Column(db.Integer, ForeignKey('company.id'), nullable=False)
    punctuation: int = db.Column(db.Integer, nullable=False)
    duration: str = db.Column(db.String, nullable=False)
    land: str = db.Column(db.String(50), nullable=False)
    take_off: str = db.Column(db.String(50), nullable=False)
    origin_city: str = db.Column(db.String(50), nullable=False)
    destiny_city: str = db.Column(db.String(50), nullable=False)
    cost: int = db.Column(db.Integer, nullable=False)
    flight_type: str = db.Column(db.String(50), nullable=False)
    available: bool = db.Column(db.Boolean, nullable=False)
    wifi: bool = db.Column(db.Boolean, nullable=False)
    pets: bool = db.Column(db.Boolean, nullable=False)
    baggage: bool = db.Column(db.Boolean, nullable=False)
    baggage_kg: int = db.Column(db.Integer, nullable=False)
    lunch: bool = db.Column(db.Boolean, nullable=False)
    time_departure: str = db.Column(db.String, nullable=False)
    time_arrival: str = db.Column(db.String, nullable=False)
    photo: str = db.Column(db.String(200), nullable=True)

    def __repr__(self):
        return f"<Vuelos {self.name}>"

@dataclass
class Excursiones(db.Model):
    __tablename__ = 'excursiones'
    id: int = db.Column(db.Integer, primary_key=True)
    company: str = db.Column(db.String(50), nullable=False)
    duration: int = db.Column(db.Integer, nullable=False)
    city: str = db.Column(db.String(50), nullable=False)
    country: str = db.Column(db.String(50), nullable=False)
    cost: int = db.Column(db.Integer, nullable=False)
    available: bool = db.Column(db.Boolean, nullable=False)
    pets: bool = db.Column(db.Boolean, nullable=False)
    lunch: bool = db.Column(db.Boolean, nullable=False)
    excursion_type: str = db.Column(db.String(50), nullable=False)
    transport: str = db.Column(db.String(50), nullable=False)
    max_people: str = db.Column(db.String(50), nullable=False)
    childs: bool = db.Column(db.Boolean, nullable=False)
    health_problems: str = db.Column(db.String(50), nullable=False)
    info: str = db.Column(db.String(5000), nullable=False)
    photo: str = db.Column(db.String(200), nullable=True)
    punctuation: int = db.Column(db.Integer, nullable=False)

    def __repr__(self):
        return f"<Excursiones {self.name}>"

@dataclass
class Coches(db.Model):
    __tablename__ = 'coches'
    id: int = db.Column(db.Integer, primary_key=True)
    name: str = db.Column(db.String(50), nullable=True)
    company: str = db.Column(db.String(50), nullable=False)
    brand: str = db.Column(db.String(50), nullable=False)
    city: str = db.Column(db.String(50), nullable=False)
    country: str = db.Column(db.String(50), nullable=False)
    cost: int = db.Column(db.Integer, nullable=False)
    available: bool = db.Column(db.Boolean, nullable=False)
    car_type: str = db.Column(db.String(50), nullable=False)
    km_limit_day: str = db.Column(db.String(50), nullable=False)
    duration: str = db.Column(db.String(50), nullable=False)
    type: str = db.Column(db.String(50), nullable=False)
    max_passengers: str = db.Column(db.String(50), nullable=False)
    fuel_type: str = db.Column(db.String(50), nullable=False)
    total_km: str = db.Column(db.String(50), nullable=False)
    automatic: bool = db.Column(db.Boolean, nullable=False)
    photo: str = db.Column(db.String(200), nullable=True)
    door: str = db.Column(db.String(200), nullable=True)
    airport_take: bool = db.Column(db.Boolean, nullable=False)
    air: bool = db.Column(db.Boolean, nullable=False)
    punctuation: int = db.Column(db.Integer, nullable=False)
    guarantee: bool = db.Column(db.Boolean, nullable=False)
    insurance: bool = db.Column(db.Boolean, nullable=False)
    info: str = db.Column(db.String(5000), nullable=False)


    def __repr__(self):
        return f"<Coches {self.name}>"