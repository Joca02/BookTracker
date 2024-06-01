from config import app,db
from models import Book_User,Review
from flask import jsonify,request,session
from sqlalchemy.exc import IntegrityError
from sqlalchemy import text


@app.route('/add-to-libary',methods=['POST'])
def AddToLibary():
    data=request.get_json()
    idBook=data['idBook']
    idUser=session['idUser']
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
    idUser=session['idUser']
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




