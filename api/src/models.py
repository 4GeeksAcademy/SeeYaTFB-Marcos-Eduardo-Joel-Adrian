from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import ForeignKey, Enum
from enum import Enum as PyEnum

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    user_name = db.Column(db.String(50), nullable=False)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=True)
    email = db.Column(db.String(200), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    country = db.Column(db.String(30), nullable=True)
    city = db.Column(db.String(30), nullable=True)
    address = db.Column(db.String(100), nullable=True)  # Corrige "adress"
    phone_number = db.Column(db.String(20), nullable=True)  # Mejor usar string para teléfonos
    photo = db.Column(db.String(200), nullable=True)  
    favourite_list = db.Column(db.Integer, ForeignKey('favourite.id'))

    def __repr__(self):
        return f'<User {self.user_name}>'


class FavoriteTypeEnum(PyEnum):
    VUELO = "Vuelo"
    HOTEL = "Hotel"
    EXCURSION = "Excursion"
    COCHE = "Coche"


class Favourite(db.Model):
    __tablename__ = 'favourite'
    id = db.Column(db.Integer, primary_key=True)
    external_id = db.Column(db.Integer, nullable=False)
    type = db.Column(Enum(FavoriteTypeEnum), nullable=False)  
    name = db.Column(db.String(50), nullable=False)
    user_id = db.Column(db.Integer, ForeignKey('user.id'), nullable=False)

    def __repr__(self):
        return f'<Favourite {self.name}>'


class Follower(db.Model):
    __tablename__ = 'follower'
    user_from_id = db.Column(db.Integer, ForeignKey('user.id'), primary_key=True)
    user_to_id = db.Column(db.Integer, ForeignKey('user.id'), primary_key=True)

    def __repr__(self):
        return f'<Follower {self.user_from_id} -> {self.user_to_id}>'


class City(db.Model):
    __tablename__ = 'city'
    id = db.Column(db.Integer, primary_key=True)
    country_id = db.Column(db.Integer, ForeignKey('country.id'), nullable=False)
    population = db.Column(db.Integer, nullable=False)
    weather = db.Column(db.String(50), nullable=False)
    info = db.Column(db.String(500), nullable=False)

    def __repr__(self):
        return f'<City {self.id}>'


class Country(db.Model):
    __tablename__ = 'country'
    id = db.Column(db.Integer, primary_key=True)
    population = db.Column(db.Integer, nullable=False)
    weather = db.Column(db.String(50), nullable=False)
    currency = db.Column(db.String(50), nullable=False)  # Corrige "coin"
    info = db.Column(db.String(500), nullable=False)

    def __repr__(self):
        return f'<Country {self.id}>'

class Hoteles(db.Model):
    __tablename__ = 'hoteles'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    adress = db.Column(db.String(50), nullable=False)
    city = db.Column(db.Integer, ForeignKey('city.id'), nullable=False)
    country = db.Column(db.Integer, ForeignKey('country.id'), nullable=False)
    cost = db.Column(db.Integer, nullable=False)
    stars = db.Column(db.Integer, nullable=False)
    check_in = db.Column(db.Integer, nullable=False)
    check_out = db.Column(db.Integer, nullable=False)
    pension = db.Column(db.Boolean, nullable=False)
    available = db.Column(db.Boolean, nullable=False)
    parking = db.Column(db.Boolean, nullable=False)
    wifi = db.Column(db.Boolean, nullable=False)
    pets = db.Column(db.Boolean, nullable=False)
    pool = db.Column(db.Boolean, nullable=False)
    sports = db.Column(db.Boolean, nullable=False)
    events = db.Column(db.Boolean, nullable=False)

class Vuelos(db.Model):
    __tablename__ = 'vuelos'
    id = db.Column(db.Integer, primary_key=True)
    company = db.Column(db.String(50), nullable=False)
    punctuation = db.Column(db.Integer, nullable=False)
    duration = db.Column(db.Integer, nullable=False)
    land = db.Column(db.Integer, nullable=False)
    take_off = db.Column(db.Integer, nullable=False)
    origin_city = db.Column(db.Integer, ForeignKey('city.id'), nullable=False)
    destiny_city = db.Column(db.Integer, ForeignKey('city.id'), nullable=False)
    cost = db.Column(db.Integer, nullable=False)
    flight_type = db.Column(db.String(50), nullable=False)
    available = db.Column(db.Boolean, nullable=False)
    wifi = db.Column(db.Boolean, nullable=False)
    pets = db.Column(db.Boolean, nullable=False)
    baggage = db.Column(db.Boolean, nullable=False)
    baggage_kg = db.Column(db.Integer, nullable=False)
    lunch = db.Column(db.Boolean, nullable=False)
    time_departure = db.Column(db.Integer, nullable=False)
    time_arrival = db.Column(db.Integer, nullable=False)

    def __repr__(self):
        return f'<Vuelos {self.id}>'


class Excursiones(db.Model):
    __tablename__ = 'excursiones'
    id = db.Column(db.Integer, primary_key=True)
    company = db.Column(db.String(50), nullable=False)
    duration = db.Column(db.Integer, nullable=False)
    city = db.Column(db.Integer, ForeignKey('city.id'), nullable=False)
    country = db.Column(db.Integer, ForeignKey('country.id'), nullable=False)
    cost = db.Column(db.Integer, nullable=False)
    available = db.Column(db.Boolean, nullable=False)
    pets = db.Column(db.Boolean, nullable=False)
    lunch = db.Column(db.Boolean, nullable=False)
    excursion_type = db.Column(db.String(50), nullable=False)
    transport = db.Column(db.Boolean, nullable=False)
    people = db.Column(db.Integer, nullable=False)
    children_allowed = db.Column(db.Boolean, nullable=False)
    health_problems = db.Column(db.String(500), nullable=False)
    punctuation = db.Column(db.Integer, nullable=False)
    photo = db.Column(db.String(200), nullable=False)
    info = db.Column(db.String(500), nullable=False)

    def __repr__(self):
        return f'<Excursiones {self.id}>'


class Coches(db.Model):
    __tablename__ = 'coches'
    id = db.Column(db.Integer, primary_key=True)
    company = db.Column(db.String(50), nullable=False)
    brand = db.Column(db.String(50), nullable=False)
    city = db.Column(db.Integer, ForeignKey('city.id'), nullable=False)
    country = db.Column(db.Integer, ForeignKey('country.id'), nullable=False)
    cost = db.Column(db.Integer, nullable=False)
    available = db.Column(db.Boolean, nullable=False)
    km_limit_day = db.Column(db.Integer, nullable=False)
    duration = db.Column(db.Integer, nullable=False)
    car_type = db.Column(db.String(50), nullable=False)
    max_passengers = db.Column(db.Integer, nullable=False)
    fuel_type = db.Column(db.String(50), nullable=False)
    total_km = db.Column(db.Integer, nullable=False)
    automatic = db.Column(db.Boolean, nullable=False)
    photo = db.Column(db.String(200), nullable=False)
    doors = db.Column(db.Integer, nullable=False)
    airport_take = db.Column(db.String(50), nullable=False)
    air_conditioning = db.Column(db.Boolean, nullable=False)
    punctuation = db.Column(db.Integer, nullable=False)
    guarantee = db.Column(db.Boolean, nullable=False)
    insurance = db.Column(db.Boolean, nullable=False)
    info = db.Column(db.String(500), nullable=False)

    def __repr__(self):
        return f'<Coches {self.id}>'
