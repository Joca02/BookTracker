from config import db

class Book(db.Model):
    __tablename__='BOOK'

    idBook=db.Column(db.Integer,primary_key=True,autoincrement=True)
    title = db.Column(db.String(100), nullable=False)
    pageCount = db.Column(db.Integer, nullable=False)
    description = db.Column(db.String(1024), nullable=False)
    idAuthor = db.Column(db.Integer, db.ForeignKey('AUTHOR.idAuthor'), nullable=False)

    author = db.relationship('Author', backref='books')

    def __repr__(self):
        return f'<Book {self.title}>'
    
    def to_json(self):
        return {
            "idBook": self.idBook,
            "title": self.title,
            "pageCount": self.pageCount,
            "description": self.description,
            "author": {
                "idAuthor": self.author.idAuthor,
                "name": self.author.name,
                "lastName": self.author.lastName
            }
        }




class Author(db.Model):
    __tablename__ = 'AUTHOR'

    idAuthor = db.Column(db.Integer, primary_key=True,autoincrement=True)
    lastName = db.Column(db.String(20), nullable=False)
    name = db.Column(db.String(20), nullable=False)

    def __repr__(self):
        return f'<Author {self.name} {self.lastName}>'
    
    def to_json(self):
        return{
            "idAuthor": self.idAuthor,
            "name": self.name,
            "lastName": self.lastName
        }

class User(db.Model):
    __tablename__ = 'USER'

    idUser = db.Column(db.Integer, primary_key=True,autoincrement=True)
    username = db.Column(db.String(30), nullable=False)
    password = db.Column(db.String(30), nullable=False)

    def __repr__(self):
        return f'<User {self.username}>'
    

class Book_User(db.Model):
    __tablename__ = 'Book_User'

    idBook = db.Column(db.Integer, db.ForeignKey('BOOK.idBook'), primary_key=True)
    idUser = db.Column(db.Integer, db.ForeignKey('USER.idUser'), primary_key=True)



class Review(db.Model):
    __tablename__ = 'REVIEW'

    idReview = db.Column(db.Integer, primary_key=True,autoincrement=True)
    idBook = db.Column(db.Integer, db.ForeignKey('BOOK.idBook'), nullable=False)
    idUser = db.Column(db.Integer, db.ForeignKey('USER.idUser'), nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    reviewText = db.Column(db.Text)


    def __repr__(self):
        return f'{self.reviewText}'