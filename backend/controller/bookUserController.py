from config import app,db
from models import Book_User,Review,Book
from flask import jsonify,request,session
from sqlalchemy.exc import IntegrityError
from sqlalchemy import text


@app.route('/add-to-libary',methods=['POST'])
def AddToLibary():
    data=request.get_json()
    idBook=data['idBook']
    idUser=data['idUser']
    if not idBook or not idUser:
            return jsonify({'error': 'Missing idBook or idUser'}), 400
    
    libary=Book_User(idBook=idBook,idUser=idUser)
    
    try:
        db.session.add(libary)
        db.session.commit()
        return jsonify({'message': 'Added to libary successfully'})
    except IntegrityError as e:
        db.session.rollback()
        return jsonify({'error': 'Insertion failed {}'.format(str(e))}), 500
    
@app.route('/remove-from-libary',methods=['DELETE'])
def RemoveFromLibary():
    data=request.get_json()
    idBook=data['idBook']
    idUser=data['idUser']
    if not idBook or not idUser:
            return jsonify({'error': 'Missing idBook or idUser'}), 400
    try:
        review=Review.query.filter_by(idBook=idBook,idUser=idUser).first()
        if review:
            db.session.delete(review)
        
        bookInLibary=Book_User.query.filter_by(idBook=idBook,idUser=idUser).first() 
        if bookInLibary:
           db.session.delete(bookInLibary)

        db.session.commit()
        return jsonify({'message': 'Book removed from libary successfully'})
    
    except IntegrityError as e:
        db.session.rollback()
        return jsonify({'error': 'Deletion failed {}'.format(str(e))}), 500
    

@app.route('/check-libary',methods=['POST'])
def CheckLibary():
     data=request.get_json()
     idBook=data['idBook']
     idUser=data['idUser']
     if not idBook or not idUser:
            return jsonify({'error': 'Missing idBook or idUser'}), 400
     try:
        isInLibary=0< Book_User.query.filter_by(idBook=idBook,idUser=idUser).count()
        return jsonify({'isInLibary':isInLibary})

     except IntegrityError as e:
        return jsonify({'error': 'Fetching a book in libary failed {}'.format(str(e))}), 500
     
@app.route('/get-books-by-user/<int:idUser>',methods=['GET'])
def GetBooksByUser(idUser):
        book_user_records = Book_User.query.filter_by(idUser=idUser).all()
        book_ids = [record.idBook for record in book_user_records]
        
        books = Book.query.filter(Book.idBook.in_(book_ids)).all()
        list = [book.to_json() for book in books]
        
        return jsonify(list)
     




