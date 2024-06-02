from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_session import Session
from datetime import timedelta



app=Flask(__name__)

CORS(app, supports_credentials=True)
#########################
app.config["SQLALCHEMY_DATABASE_URI"]= r'mssql+pyodbc://@DESKTOP-LEQ1V46/LIBARY?trusted_connection=yes&driver=ODBC+Driver+17+for+SQL+Server'
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"]=False
app.config['SECRET_KEY'] = 'FUNKCIONALNOPROGRAMIRANJEIRBP'
app.config['SESSION_TYPE'] = 'filesystem'
app.config['SESSION_PERMANENT'] = False
app.config['SESSION_USE_SIGNER'] = True
app.config['SESSION_KEY_PREFIX'] = 'session:'

Session(app)



db=SQLAlchemy(app)
app.config['PERMANENT_SESSION_LIFETIME'] = timedelta(minutes=30)
import controller.bookController,controller.userController,controller.authorController,controller.bookUserController,controller.reviewController

