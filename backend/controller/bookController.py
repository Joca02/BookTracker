
from config import app
from models import Book
from flask import jsonify

@app.route('/get-all-books')
def getAllBooks():
    books=Book.query.all()
    list=[book.to_json() for book in books]
    return jsonify(list)

@app.route('/get-all-books/<int:idAuthor>')
def getBooksByAuthor(idAuthor):
    books=Book.query.filter(Book.idAuthor==idAuthor).all()
    list=[book.to_json() for book in books]
    return jsonify(list)





