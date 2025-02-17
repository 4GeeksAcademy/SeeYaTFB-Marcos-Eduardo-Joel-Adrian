import os
import sys
from sqlalchemy import ForeignKey, Integer, String
from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:////tmp/test.db"
app.config["SQLALCHEMY_ECHO"] = True
db = SQLAlchemy(app)

class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    user_name = db.Column(db.String(50), nullable=False)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=True)
    email = db.Column(db.String(200)) 
    country = db.Column(db.String(30), nullable=True)
    city = db.Column(db.String(30), nullable=True)
    number = db.Column(db.Integer(15), nullable=True)