import './ProductItem.css'

export default function ProductItem({pd}) {
  const purchTime = pd.date
  const currTime = "03 April 2021 00:00:00 GMT"
  const purchParse = Date.parse(purchTime)
  const currParse = Date.parse(currTime)

  const diffParse = currParse - purchParse
  console.log(purchTime, currTime, diffParse)
  const day = " " + Math.floor(diffParse/86400000) + " day "
  const hour = Math.floor(diffParse/3600000)
  const updateHour = hour > 23 ? hour - 24 : hour
  const finalHour = updateHour > 0 ? 
    " " + updateHour + " hours " : null
  const min = " " + Math.floor(diffParse/60000) + " mins "
  const sec = " " + Math.floor(diffParse/1000) + " seconds "

  return(
    <div id='product'>
      <h1>{pd.name}</h1>
      <h2>{pd.cnt} purchased recently</h2>
      <h2>
        ordered 
        {
          diffParse > 86400000 ? day + finalHour
            :
            diffParse > 3600000 ? finalHour
              :
              diffParse > 60000 ? min
                :
                diffParse > 1000 ? sec
                  :
                  null
        }
        ago
      </h2>
      <p>{pd.place} ${pd.price}</p>
    </div>
  )
}