from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS




app=Flask(__name__)

CORS(app)
#########################
app.config["SQLALCHEMY_DATABASE_URI"]= r'mssql+pyodbc://@DESKTOP-LEQ1V46/LIBARY?trusted_connection=yes&driver=ODBC+Driver+17+for+SQL+Server'
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"]=False
app.config['SECRET_KEY'] = 'FUNKCIONALNOPROGRAMIRANJEIRBP'

db=SQLAlchemy(app)

import controller.bookController,controller.userController,controller.authorController,controller.bookUserController,controller.reviewController

