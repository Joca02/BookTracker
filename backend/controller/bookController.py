
from config import app,db
from models import Book,Author,Book_User
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
        return jsonify({'message':'Book has been added successfully'})
    except IntegrityError as e:
        db.session.rollback()
        return jsonify({'error':'Insertion failed {}'.format(str(e))}),500
    
    
@app.route('/filter-books',methods=['GET'])
def FilterBooks():
    partialTitle = request.args.get('title', '')
    books = Book.query.filter(Book.title.like(f'%{partialTitle}%')).all()
    list = [book.to_json() for book in books]
    return jsonify(list)



@app.route('/filter-books-by-user', methods=['GET'])
def FilterBooksByUser():
    partialTitle = request.args.get('title', '')
    idUser = request.args.get('idUser', type=int)
    
    books = db.session.query(Book).join(Book_User, Book.idBook == Book_User.idBook) \
        .filter(Book.title.like(f'%{partialTitle}%'), Book_User.idUser == idUser).all()
    
    list = [book.to_json() for book in books]
    return jsonify(list)
