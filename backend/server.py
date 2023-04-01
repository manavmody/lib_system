# Import flask and datetime module for showing date and time
from flask import Flask, jsonify,request
import requests
import json
import datetime
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_cors import CORS
x = datetime.datetime.now()

# Initializing flask app
app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root''@localhost/lib_members'
app.config['SQLALCHEMY_BINDS'] = {'database2': 'mysql://root''@localhost/books'}
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db1=SQLAlchemy(app)
ma1 = Marshmallow(app)


class Members(db1.Model):
	id = db1.Column(db1.Integer, primary_key=True)
	name = db1.Column(db1.String(100))
	description = db1.Column(db1.String(100))
	date = db1.Column(db1.DateTime, default = x)
	# issued_book_id = db1.Column(db1.Integer, db1.ForeignKey('book.id'), nullable=True)

	def __init__(self,name,description):
		self.name = name
		self.description = description

class MemberSchema(ma1.Schema):
	class Meta:
		fields= ('id','name','description','date')

member_schema = MemberSchema()
members_schema = MemberSchema(many=True)

class Books(db1.Model):
	id = db1.Column(db1.Integer, primary_key=True)
	title = db1.Column(db1.String(100))
	author = db1.Column(db1.String(100))
	stock = db1.Column(db1.Integer)
	date = db1.Column(db1.DateTime, default = x)
	# issued_to = db1.relationship('Members',backref='transactions',lazy=True)
	

	def __init__(self,title,author,stock):
		self.title= title
		self.author = author
		self.stock = stock
	__bind_key__ = 'database2'

class BookSchema(ma1.Schema):
	class Meta:
		fields= ('id','title','author','stock','date')

book_schema = BookSchema()
books_schema = BookSchema(many=True)



# Route for CRUD of members
@app.route('/get', methods = ['GET'])
def get_member():
	all_members = Members.query.all()
	results = members_schema.dump(all_members)
	return jsonify(results)

@app.route('/get/<id>/', methods = ['GET'])
def member_details(id):
	member = Members.query.get(id)
	return member_schema.jsonify(member)

@app.route('/add', methods = ['POST'])
def add_member():
	name = request.json['name']
	description = request.json['description']
	members = Members(name,description)

	db1.session.add(members)
	db1.session.commit()
	return member_schema.jsonify(members)

@app.route('/update/<id>/', methods= ['PUT'])
def update_member(id):
	member = Members.query.get(id)
	name = request.json['name']
	description = request.json['description']
	member.name = name
	member.description = description

	db1.session.commit()
	return member_schema.jsonify(member)

@app.route('/delete/<id>/', methods =['DELETE'])
def delete_member(id):
	member = Members.query.get(id)
	db1.session.delete(member)
	db1.session.commit()

	return member_schema.jsonify(member)

#Routes for books
@app.route('/api/data',methods=['GET'])
def get_data():
    # Retrieve data from the API without any search query
    response = requests.get('https://frappe.io/api/method/frappe-library')
    data = response.json()
    return data

@app.route('/api/data/query',methods=['POST'])
def get_data_query():
	# Retrieve data from the API with any search query
	parameters = {"title":request.json['title'] , "page": request.json['page'], "authors": request.json['author'],
	       		 "isbn":request.json['isbn'],"pulisher":request.json['publisher']}
	parameters_filtered = {}
	for k,v in parameters.items():
		if v:
			parameters_filtered[k]=v
	
	response = requests.get('https://frappe.io/api/method/frappe-library',parameters_filtered)
	data = response.json()
	return data

#CRUD for books
@app.route('/get/books', methods = ['GET'])
def get_books():
	all_books = Books.query.all()
	results = books_schema.dump(all_books)
	return jsonify(results)

@app.route('/get/books/<id>/', methods = ['GET'])
def book_details(id):
	book = Books.query.get(id)
	return book_schema.jsonify(book)

@app.route('/add/books', methods = ['POST'])
def add_book():
	title = request.json['title']
	author = request.json['author']
	stock = request.json['stock']
	books = Books(title,author,stock)

	db1.session.add(books)
	db1.session.commit()
	return book_schema.jsonify(books)

@app.route('/update/books/<id>/', methods= ['PUT'])
def update_book(id):
	book = Books.query.get(id)
	stock = request.json['stock']
	book.stock = stock
	db1.session.commit()
	return book_schema.jsonify(book)
	#works


@app.route('/delete/books/<id>/', methods =['DELETE'])
def delete_book(id):
	book = Books.query.get(id)
	db1.session.delete(book)
	db1.session.commit()

	return book_schema.jsonify(book)



with app.app_context():
    db1.create_all()	
# Running app
if __name__ == '__main__':
	app.run(debug=True)
