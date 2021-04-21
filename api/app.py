from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from datetime import datetime
import random as rd

app = Flask(__name__)
#Database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///orders.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

CORS(app)
db = SQLAlchemy(app)

class Order(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  orderId = db.Column(db.Integer)
  restaurant = db.Column(db.String(20))
  itemName = db.Column(db.String(50))
  quantity = db.Column(db.Integer)
  productPrice = db.Column(db.Float)
  totalProduct = db.Column(db.Integer)
  orderTime = db.Column(db.DateTime)
  
  def __init__(self, orderId, restaurant, itemName, quantity, productPrice, totalProduct, orderTime):
    self.orderId = orderId
    self.restaurant = restaurant
    self.itemName = itemName
    self.quantity = quantity
    self.productPrice = productPrice
    self.totalProduct = totalProduct
    self.orderTime = orderTime

@app.route('/api/orders', methods=['POST'])
def add_orders():
  orders = request.json
  for order in orders:
    orderId = order['orderId']
    restaurant = order['restaurant']
    itemName = order['itemName']
    quantity = order['quantity']
    productPrice = order['productPrice']
    totalProduct = order['totalProducts']

    # Creating within 48hrs random order timestamp
    day = rd.randint(1, 2)
    hour = rd.randint(0, 23)
    minute = rd.randint(0, 59)
    second = rd.randint(0, 59)
    timeStamp = datetime(2021, 4, day, hour, minute, second, 0)

    new_order = Order(orderId, restaurant, itemName, 
    quantity, productPrice, totalProduct, timeStamp)

    db.session.add(new_order)
    db.session.commit()

  return jsonify({"itemCount": len(orders)})

#Get All orders
@app.route('/api/orders', methods=['GET'])
def get_orders():
  trendingOrders = []
  allOrders = Order.query.all()

  # datetime(year, month, day, hour, minute, second, microsecond)
  before = datetime(2021, 4, 1, 0, 0, 0, 0)
  now = datetime(2021, 4, 3, 0, 0, 0, 0)
  for order in allOrders:
    time = order.orderTime
    if before <= time and time <= now:
      trendingOrders.append(order)

  return jsonify(
      [{
          "orderId": order.orderId,
          "restaurant": order.restaurant,
          "itemName": order.itemName,
          "quantity": order.quantity,
          "productPrice": order.productPrice,
          "totalProduct": order.totalProduct,
          "orderTime": order.orderTime
      } for order in trendingOrders]
  )

if __name__ == "__main__":
  app.run(debug=True)
