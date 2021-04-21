import React, {useEffect, useState} from 'react';
import axios from "axios";
import ProductItem from './ProductItem';

export default function Orders() {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/orders')
      .then(res => {
        const orders = res.data
        const productObj = {}
        for (var i = 0; i < orders.length; i++) {
          const order = orders[i]
          const name = order.itemName
          const place = order.restaurant
          const price = order.productPrice
          const qnty = order.quantity
          const time = order.orderTime
          const originalParse = Date.parse(time)
          if (name in productObj) {
            const orderQnty = productObj[name][0]
            const orderTime = productObj[name][1]
            let recentTime = orderTime
            let bigQnty = orderQnty
            if (qnty > orderQnty) {
              recentTime = time
              bigQnty = qnty
            }
            productObj[name][0] = bigQnty
            productObj[name][1] = recentTime
          } else {
            productObj[name] = [qnty, time, place, price]
          }
        }
        //console.log(productObj)
        const productArr = Object.keys(productObj).map(name => {
          return [name, productObj[name]];
        });
        productArr.sort((first, second) => {
          const fcnt = first[1][0]
          const scnt = second[1][0]
          const cntDiff = scnt - fcnt
          const ftime = Date.parse(first[1][1])
          const stime = Date.parse(second[1][1])
          const timeDiff = stime - ftime
          return cntDiff === 0 ? timeDiff : cntDiff
        });
        //console.log(productArr)
        setProducts(productArr)
        setLoading(true)
      }) .catch(err => console.error(`Error: ${err}`));
    
    //console.log(products)
  }, []);

  const productItems = products.map(product => {
    const productObj = {
      name: product[0],
      cnt: product[1][0],
      date: product[1][1],
      place: product[1][2],
      price: product[1][3]
    }

    return(
      <ProductItem key={productObj.name} pd={productObj}/>
    )
  })

  return(
    <div>
      {loading ?
          <div>
            {productItems}
          </div>
          :
          <h2>Loading...</h2>
        }
    </div>
  )
}