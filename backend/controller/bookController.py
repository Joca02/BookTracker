
from config import app,db
from models import Book,Author
from flask import jsonify,request
from sqlalchemy.exc import IntegrityError
from sqlalchemy import text


@app.route('/get-all-books',methods=['GET'])
def getAllBooks():
    books=Book.query.all()
    list=[book.to_json() for book in books]
    return jsonify(list)

@app.route('/get-all-books/<int:idAuthor>',methods=['GET'])
def getBooksByAuthor(idAuthor):
    books=Book.query.filter(Book.idAuthor==idAuthor).all()
    list=[book.to_json() for book in books]
    return jsonify(list)

@app.route('/add-book',methods=['POST'])
def addBook():
    data=request.get_json()
    title=data['title']
    pageCount=data['pageCount']
    description=data['description']
    idAuthor=data['idAuthor']
    try:
        author = Author.query.get(idAuthor)     
        newBook=Book(title=title, pageCount=pageCount, description=description, idAuthor=idAuthor,author=author)
        #return newBook.to_json()
        #pozivam proceduru koja pokrece trigger trig_CheckInsertBook
        db.session.execute(text(
            """
            EXEC dbo.InsertBook :title, :pageCount, :description, :idAuthor;
            """
        ), {
            'title': title,
            'pageCount': pageCount,
            'description': description,
            'idAuthor': idAuthor
        })
        db.session.commit()
        return jsonify({'message':'success'})
    except IntegrityError as e:
        db.session.rollback()
        return jsonify({'error':'Insertion failed {}'.format(str(e))}),500
    
    




