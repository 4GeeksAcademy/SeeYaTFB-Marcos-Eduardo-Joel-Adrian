import os
from flask import Flask, request, jsonify, url_for
from flask_migrate import Migrate
from flask_swagger import swagger
from flask_cors import CORS
from src.utils import APIException, generate_sitemap
from src.admin import setup_admin
from src.models import db, User, Vuelos,Hoteles,Coches,Company,Excursiones,Favourite
from flask_jwt_extended import create_access_token, get_csrf_token, jwt_required, JWTManager, set_access_cookies, unset_jwt_cookies, get_jwt_identity
from sqlalchemy import or_

import time
import bcrypt

import cloudinary
import cloudinary.uploader
import cloudinary.api
from cloudinary.utils import cloudinary_url

from dotenv import load_dotenv
load_dotenv()


app = Flask(__name__)

app.url_map.strict_slashes = False
db_url = os.getenv("DATABASE_URL")
if db_url is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

MIGRATE = Migrate(app, db)
db.init_app(app)
CORS(app, supports_credentials=True, origins=["https://redesigned-space-potato-97qx6p4676v9hx6x5-5173.app.github.dev"])
setup_admin(app)

api_secret = os.getenv("API_SECRET")
app.config["JWT_SECRET_KEY"] = api_secret
app.config["JWT_TOKEN_LOCATION"] = ["cookies"]
app.config["JWT_COOKIE_CSRF_PROTECT"] = True
app.config["JWT_CSRF_IN_COOKIES"] = True
app.config["JWT_COOKIE_SECURE"] = True 

cloudinary.config(
    cloud_name=os.getenv("CLOUDINARY_CLOUD_NAME"),
    api_key=os.getenv("CLOUDINARY_API_KEY"),
    api_secret=os.getenv("CLOUDINARY_API_SECRET"),
    secure=True
)

jwt = JWTManager(app)
# Handle/serialize errors like a JSON object
@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

start_time = time.time()
@app.route("/health", methods=["GET"])
def health_check():
    users = User.query.all()
    print(users)
    return jsonify({"status": "ok", "uptime": round(time.time() - start_time, 2)}), 200

# generate sitemap with all your endpoints
@app.route('/')
def sitemap():
    return generate_sitemap(app)


@app.route('/users', methods=['GET'])
def get_users():
    all_users = User.query.all()
    return jsonify(all_users), 200

@app.route('/users/<int:user_id>', methods=['GET'])
def get_single_user(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404
    return jsonify(user), 200

@app.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    
    username = data.get("username")
    email = data.get("email")
    password = data.get("password")
    first_name = data.get("first_name")
    last_name = data.get("last_name")
    country = data.get("country")
    city = data.get("city")
    address = data.get("address")
    phone_number = data.get("phone_number")
    photo = data.get("photo")
    
    existing_user = db.session.query(User).filter(or_(User.username == username, User.email == email)).first()
    if existing_user:
        return jsonify({"error": "Username or Email already registered"}), 400

    hashedPassword = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

    new_user = User(username=username,email=email,password=hashedPassword,first_name=first_name,last_name=last_name,country=country,city=city,address=address,phone_number=phone_number,photo=photo)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User registered successfully"}), 201

@app.route("/login", methods=["POST"])
def get_login():
    data = request.get_json()

    email = data["email"]
    password = data["password"]

    required_fields = ["email", "password"]
    if not all(field in data for field in required_fields):
        return jsonify({"error": "Missing required fields"}), 400

    user1 = User.query.filter_by(email=email).first()
    if not user1:
        return jsonify({"error": "User not found"}), 400

    is_password_valid = bcrypt.checkpw(password.encode('utf-8'), user1.password.encode('utf-8'))

    if not is_password_valid:
        return jsonify({"error": "Password not correct"}), 400

    access_token = create_access_token(identity=str(user1.id))
    csrf_token = get_csrf_token(access_token)
    response = jsonify({
        "msg": "login successful",
        "user": user1,
        "csrf_token": csrf_token
        })
    set_access_cookies(response, access_token)

    return response

@app.route("/logout", methods=["POST"])
@jwt_required()
def logout_with_cookies():
    response = jsonify({"msg": "logout successful"})
    unset_jwt_cookies(response)
    return response

@app.route('/hotels', methods=['GET'])
def get_hoteles():
    all_hoteles = Hoteles.query.all()
    return jsonify(all_hoteles), 200

@app.route("/hotels", methods=["POST"])
def create_hotel():
    data = request.get_json()
   
    new_hotel = Hoteles(
            name=data['name'],
            adress=data['adress'],
            city=data['city'],
            country=data['country'],
            cost=data['cost'],
            stars=data['stars'],
            check_in=data['check_in'],
            check_out=data['check_out'],
            pension=data['pension'],
            available=data['available'],
            parking=data['parking'],
            wifi=data['wifi'],
            pets=data['pets'],
            pool=data['pool'],
            sports=data['sports'],
            events=data['events']
        )
    db.session.add(new_hotel)
    db.session.commit()
    return jsonify({'message': 'Hotel created', 'hotel_id': new_hotel.id}), 201

@app.route('/flights', methods=['GET'])
def get_vuelos():
    all_vuelos = Vuelos.query.all()
    return jsonify(all_vuelos), 200

@app.route("/flights", methods=["POST"])
def create_flight():
    data = request.get_json()
   
    new_flight = Vuelos(
            company=data['company'],
            punctuation=data['punctuation'],
            duration=data['duration'],
            land=data['land'],
            take_off=data['take_off'],
            origin_city=data['origin_city'],
            destiny_city=data['destiny_city'],
            cost=data['cost'],
            flight_type=data['flight_type'],
            available=data['available'],
            wifi=data['wifi'],
            pets=data['pets'],
            baggage=data['baggage'],
            baggage_kg=data['baggage_kg'],
            lunch=data['lunch'],
            time_departure=data['time_departure'],
            time_arrival=data['time_arrival']
        )
    db.session.add(new_flight)
    db.session.commit()
    return jsonify({'message': 'Flight created'}), 201

@app.route('/cars', methods=['GET'])
def get_coches():
    all_coches = Coches.query.all()
    return jsonify(all_coches), 200

@app.route("/car", methods=["POST"])
def create_car():
    data = request.get_json()
    new_car = Coches(
            company=data['company'],
            brand=data['brand'],
            city=data['city'],
            country=data['country'],
            cost=data['cost'],
            available=data['available'],
            km_limit_day=data['km_limit_day'],
            duration=data['duration'],
            car_type=data['car_type'],
            max_passengers=data['max_passengers'],
            fuel_type=data['fuel_type'],
            total_km=data['total_km'],
            automatic=data['automatic'],
            photo=data['photo'],
            doors=data['doors'],
            airport_take=data['airport_take'],
            air_conditioning=data['air_conditioning'],
            punctuation=data['punctuation'],
            guarantee=data['guarantee'],
            insurance=data['insurance'],
            info=data['info']
        )
    db.session.add(new_car)
    db.session.commit()
    return jsonify({'message': 'Car created'}), 201

@app.route('/companies', methods=['GET'])
def get_companies():
    all_companies = Company.query.all()
    return jsonify(all_companies), 200

@app.route("/company", methods=["POST"])
def create_company():
    data = request.get_json()
   
    new_companny = Company(
            name=data['name'],
            admin=data['admin'], #user id
        )
    db.session.add(new_companny)
    db.session.commit()
    return jsonify({'message': 'Company created'}), 201
    

@app.route('/favourites', methods=['GET'])
@jwt_required()
def get_favorites():
    user_id=get_jwt_identity()
    favorites = Favourite.query.filter_by(user_id=user_id).all()
    return jsonify(favorites), 200

@app.route('/favourites', methods=['POST'])
@jwt_required()
def add_favorite():
    user_id=get_jwt_identity()
    data = request.get_json()
    required_fields = ["name", "type", "external_id"]
    if not all(field in data for field in required_fields):
        return jsonify({"error": "Missing required fields"}), 400
    
    new_favorite = Favourite(
        user_id=user_id,
        external_id=data["external_id"],
        name=data["name"],
        type=data["type"]
    )
    db.session.add(new_favorite)
    db.session.commit()
    return jsonify(new_favorite), 201

@app.route('/favourites/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_favorite(id):
    user_id=get_jwt_identity()
    data = request.get_json()
    favorite = Favourite.query.filter_by(
            id=data["id"], user_id=user_id
        ).first()
    if not favorite:
        return jsonify({"error": "Favorite not found"}), 404
    db.session.delete(favorite)
    db.session.commit()
    return jsonify({"message": "Favorite deleted successfully"}), 200




@app.route("/upload", methods=["POST"])
def upload_file():
    if "file" not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files["file"]  # Obtener la imagen subida

    if file.filename == "":
        return jsonify({"error": "No selected file"}), 400

    # Subir imagen a Cloudinary con un nombre único
    result = cloudinary.uploader.upload(file)

    return jsonify({"url": result["secure_url"]})


if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3000))
    app.run(host='0.0.0.0', port=PORT, debug=True)
