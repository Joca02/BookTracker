from config import app,db
from models import User
from flask import jsonify,request,session
from sqlalchemy.exc import IntegrityError
from sqlalchemy import text

@app.route('/register',methods=['POST'])
def Register():
    data=request.get_json()
    username=data['username']
    password=data['password']
    try:
        existing_user = User.query.filter_by(username=username).first()
        if existing_user:
            return jsonify({'error': 'Username already exists'})
        
        newUser=User(username=username,password=password)
        #return newUser.idUser
        db.session.add(newUser)
        db.session.commit()
        return jsonify({
            'message':'Registration was comnplete'
            })
    except IntegrityError as e:
        db.session.rollback()
        return jsonify({'error':'Insertion failed {}'.format(str(e))}),500
    

#vraca error poruku ako je fail ili id+username ako je uspesno
@app.route('/login',methods=['POST'])
def Login():
    data=request.get_json()
    username=data['username']
    password=data['password']
    #moze i filter_by(usr=usr,psw=psw)
    user=User.query.filter((User.username==username) & (User.password==password)).first()

    if not user:
         return jsonify({'error': 'Wrong username or password'})
    session['idUser']=user.idUser
    session['username']=user.username

    return jsonify(
        {
            'username':user.username,
            'idUser':user.idUser
        })
    

@app.route('/logout',methods=['GET'])
def Logout():
    session.clear()
    return jsonify({'message': 'Logout successful'})

@app.route('/check-session',methods=['GET'])
def CheckSession():
    if(session.get('username')):
        return jsonify({'username':session['username']})
    return jsonify({'error':'Session has expired'})
    
