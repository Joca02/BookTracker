from config import app,db
from models import Book_User,Review,Book
from flask import jsonify,request,session
from sqlalchemy.exc import IntegrityError
from sqlalchemy import text
from functools import reduce

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
    
@app.route('/check-review/<int:idUser>/<int:idBook>',methods=['GET'])
def CheckReview(idUser,idBook):
     response= Review.query.filter_by(idUser=idUser,idBook=idBook).count()>0
     return jsonify({'isReviewed':response})

@app.route('/get-review-info',methods=['POST'])
def GetReviewInfo():  
     data=request.get_json()
     if not data:
        print("Error: No data received")
        return jsonify({"error": "No data received"}), 400
     print("Received data:", data)
     idBook=data['idBook']
     idUser=data['idUser']
     review=Review.query.filter_by(idUser=idUser,idBook=idBook).first()
     
     if not review:
          return jsonify({"error":"Review not found"}),400
     title=Book.query.filter_by(idBook=idBook).first().title
     return jsonify({
          "title":title,
          "rating":review.rating,
          "reviewText":review.reviewText
     })



@app.route('/total-page-count-reviewed', methods=['GET'])
def total_page_count_reviewed():
    idUser = request.args.get('idUser', type=int)
    print(idUser)
    print("*******************")
    reviews = Review.query.filter_by(idUser=idUser).all()
    book_ids = list(map(lambda review: review.idBook, reviews))
    books = Book.query.filter(Book.idBook.in_(book_ids)).all()
    total_pages = reduce(lambda acc, book: acc + book.pageCount, books, 0)
    return jsonify({'totalPageCount': total_pages})


   

