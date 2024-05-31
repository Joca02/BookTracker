from config import app,db
from models import Author
from flask import jsonify,request,session
from sqlalchemy.exc import IntegrityError
from sqlalchemy import text

@app.route('/get-all-authors')
def getAllAuthors():
    authors=Author.query.all()
    list=[author.to_json()for author in authors]
    return jsonify(list)

@app.route('/add-author',methods=['POST'])
def AddAuthor():
    output=''
    data=request.get_json()
    name=data['name']
    lastName=data['lastName']
    try:
        existing_author = Author.query.filter_by(name=name, lastName=lastName).first()

        if existing_author:
            return jsonify({'error': 'Author with the same name and lastName already exists'})

        new_author = Author(name=name, lastName=lastName)
        db.session.add(new_author)
        db.session.commit()

        return jsonify({'message': 'Author added successfully'})

    except IntegrityError as e:
        db.session.rollback()
        return jsonify({'error': 'Insertion failed {}'.format(str(e))}), 500