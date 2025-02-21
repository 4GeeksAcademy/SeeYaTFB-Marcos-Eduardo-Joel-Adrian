from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import ForeignKey, Enum
from dataclasses import dataclass
from enum import Enum as PyEnum

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
    favourite_list: int = db.Column(db.Integer, ForeignKey('favourite.id'))

@dataclass
class Favourite(db.Model):
    __tablename__ = 'favourite'
    id: int = db.Column(db.Integer, primary_key=True)
    external_id: int = db.Column(db.Integer, nullable=False)
    type: str = db.Column(Enum(PyEnum('FavoriteTypeEnum', 'VUELO HOTEL EXCURSION COCHE')), nullable=False)
    name: str = db.Column(db.String(50), nullable=False)
    user_id: int = db.Column(db.Integer, ForeignKey('user.id'), nullable=False)

@dataclass
class Follower(db.Model):
    __tablename__ = 'follower'
    user_from_id: int = db.Column(db.Integer, ForeignKey('user.id'), primary_key=True)
    user_to_id: int = db.Column(db.Integer, ForeignKey('user.id'), primary_key=True)

@dataclass
class City(db.Model):
    __tablename__ = 'city'
    id: int = db.Column(db.Integer, primary_key=True)
    country_id: int = db.Column(db.Integer, ForeignKey('country.id'), nullable=False)
    population: int = db.Column(db.Integer, nullable=False)
    weather: str = db.Column(db.String(50), nullable=False)
    info: str = db.Column(db.String(500), nullable=False)

@dataclass
class Country(db.Model):
    __tablename__ = 'country'
    id: int = db.Column(db.Integer, primary_key=True)
    population: int = db.Column(db.Integer, nullable=False)
    weather: str = db.Column(db.String(50), nullable=False)
    currency: str = db.Column(db.String(50), nullable=False)
    info: str = db.Column(db.String(500), nullable=False)

@dataclass
class Hoteles(db.Model):
    __tablename__ = 'hoteles'
    id: int = db.Column(db.Integer, primary_key=True)
    name: str = db.Column(db.String(50), nullable=False)
    address: str = db.Column(db.String(50), nullable=False)
    city: int = db.Column(db.Integer, ForeignKey('city.id'), nullable=False)
    country: int = db.Column(db.Integer, ForeignKey('country.id'), nullable=False)
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

@dataclass
class Vuelos(db.Model):
    __tablename__ = 'vuelos'
    id: int = db.Column(db.Integer, primary_key=True)
    company: str = db.Column(db.String(50), nullable=False)
    punctuation: int = db.Column(db.Integer, nullable=False)
    duration: int = db.Column(db.Integer, nullable=False)
    land: int = db.Column(db.Integer, nullable=False)
    take_off: int = db.Column(db.Integer, nullable=False)
    origin_city: int = db.Column(db.Integer, ForeignKey('city.id'), nullable=False)
    destiny_city: int = db.Column(db.Integer, ForeignKey('city.id'), nullable=False)
    cost: int = db.Column(db.Integer, nullable=False)
    flight_type: str = db.Column(db.String(50), nullable=False)
    available: bool = db.Column(db.Boolean, nullable=False)
    wifi: bool = db.Column(db.Boolean, nullable=False)
    pets: bool = db.Column(db.Boolean, nullable=False)
    baggage: bool = db.Column(db.Boolean, nullable=False)
    baggage_kg: int = db.Column(db.Integer, nullable=False)
    lunch: bool = db.Column(db.Boolean, nullable=False)
    time_departure: int = db.Column(db.Integer, nullable=False)
    time_arrival: int = db.Column(db.Integer, nullable=False)

@dataclass
class Excursiones(db.Model):
    __tablename__ = 'excursiones'
    id: int = db.Column(db.Integer, primary_key=True)
    company: str = db.Column(db.String(50), nullable=False)
    duration: int = db.Column(db.Integer, nullable=False)
    city: int = db.Column(db.Integer, ForeignKey('city.id'), nullable=False)
    country: int = db.Column(db.Integer, ForeignKey('country.id'), nullable=False)
    cost: int = db.Column(db.Integer, nullable=False)
    available: bool = db.Column(db.Boolean, nullable=False)
    pets: bool = db.Column(db.Boolean, nullable=False)
    lunch: bool = db.Column(db.Boolean, nullable=False)
    excursion_type: str = db.Column(db.String(50), nullable=False)

@dataclass
class Coches(db.Model):
    __tablename__ = 'coches'
    id: int = db.Column(db.Integer, primary_key=True)
    company: str = db.Column(db.String(50), nullable=False)
    brand: str = db.Column(db.String(50), nullable=False)
    city: int = db.Column(db.Integer, ForeignKey('city.id'), nullable=False)
    country: int = db.Column(db.Integer, ForeignKey('country.id'), nullable=False)
    cost: int = db.Column(db.Integer, nullable=False)
    available: bool = db.Column(db.Boolean, nullable=False)
    car_type: str = db.Column(db.String(50), nullable=False)
    