 import { useSelector } from "react-redux"
 import axios from "axios"
 import { useState, useEffect } from "react"
import getConfig from "../utils/getConfig"
import { ListGroup } from "react-bootstrap"

 const Purchased = () => {

    const [purchases, setPurchases]=useState([])

    useEffect(()=>{

        axios
        .get("https://e-commerce-api-v2.academlo.tech/api/v1/purchases",getConfig())
        .then(resp=> setPurchases(resp.data))

    },[])


    return( 
    <div>
        <h1>Purchased</h1>
        {
            purchases.map(item=>(
                <ListGroup  key={item.id}>
                    {item.product.title}
                </ListGroup>

            ))
        }

    </div>
        )
}
export default Purchased