from config import app,db
from models import Book_User,Review
from flask import jsonify,request,session
from sqlalchemy.exc import IntegrityError
from sqlalchemy import text

@app.route('/add-review',methods=['POST'])
def AddReview():
    data=request.get_json()
    idBook=data['idBook']
    idUser=data['idUser']
    rating=data['rating']
    reviewText=data['reviewText']
    if not idBook or not idUser or not rating or not reviewText:
            return jsonify({'error': 'Missing data'}), 400
    
    newReview=Review(idBook=idBook,idUser=idUser,rating=rating,reviewText=reviewText)
    try:
          db.session.add(newReview)
          db.session.commit()
          return jsonify({'message': 'Review added successfully'})
    except IntegrityError as e:
        db.session.rollback()
        return jsonify({'error': 'Insertion failed {}'.format(str(e))}), 500
    
@app.route('/edit-review',methods=['PUT'])
def EditReview():
    data=request.get_json()
    idReview=data['idReview']
    rating=data['rating']
    reviewText=data['reviewText']

    review=Review.query.filter_by(idReview=idReview).first()
    if not review:
         return  jsonify({'error': 'Wrong review id '}), 400
    try:
        review.rating = rating
        review.reviewText = reviewText
        db.session.commit()
        return jsonify({'message': 'Review updated successfully'})

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'An error occurred: {}'.format(str(e))}), 500