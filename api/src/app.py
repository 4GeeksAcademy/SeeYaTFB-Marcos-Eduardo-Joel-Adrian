import os
import time

from flask import Flask, jsonify
from models import db, User, Favourite, City, Country, Hoteles, Vuelos, Excursiones, Coches
from flask import Flask, request, jsonify

app = Flask(__name__)
start_time = time.time()


@app.route("/health", methods=["GET"])
def health_check():
    return jsonify({"status": "ok", "uptime": round(time.time() - start_time, 2)}), 200


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

@app.route('/users/<int:user_id>/favorites', methods=['GET'])
def get_favorites(user_id):
    favorites = Favourite.query.filter_by(user_id=user_id).all()
    return jsonify(favorites), 200

@app.route('/users/<int:user_id>/favorites', methods=['POST'])
def add_favorite(user_id):
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

@app.route('/users/<int:user_id>/favorites/<int:id>', methods=['DELETE'])
def delete_favorite(user_id, id):
    favorite = Favourite.query.get(id)
    if not favorite:
        return jsonify({"error": "Favorite not found"}), 404
    db.session.delete(favorite)
    db.session.commit()
    return jsonify({"message": "Favorite deleted successfully"}), 200

@app.route('/hoteles', methods=['GET'])
def get_hoteles():
    all_hoteles = Hoteles.query.all()
    return jsonify(all_hoteles), 200

@app.route('/vuelos', methods=['GET'])
def get_vuelos():
    all_vuelos = Vuelos.query.all()
    return jsonify(all_vuelos), 200

@app.route('/excursiones', methods=['GET'])
def get_excursiones():
    all_excursiones = Excursiones.query.all()
    return jsonify(all_excursiones), 200

@app.route('/coches', methods=['GET'])
def get_coches():
    all_coches = Coches.query.all()
    return jsonify(all_coches), 200

@app.route('/city', methods=['GET'])
def get_cities():
    all_cities = City.query.all()
    return jsonify(all_cities), 200

@app.route('/country', methods=['GET'])
def get_countries():
    all_countries = Country.query.all()
    return jsonify(all_countries), 200

if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3000))
    app.run(host='0.0.0.0', port=PORT, debug=True)
