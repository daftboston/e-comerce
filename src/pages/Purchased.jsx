 import { useSelector } from "react-redux"
 import axios from "axios"
 import { useState, useEffect } from "react"
import getConfig from "../utils/getConfig"
import { ListGroup } from "react-bootstrap"
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

 const Purchased = () => {

    const [purchases, setPurchases]=useState([])

    useEffect(()=>{

        axios
        .get("https://e-commerce-api-v2.academlo.tech/api/v1/purchases",getConfig())
        .then(resp=> {setPurchases(resp.data)
        console.log(resp.data);})

    },[])


    return( 
    <div>
        <h1>Purchased</h1>

        <Row xs={1} md={2} lg={3} className="py-3">
        {
            purchases.map(item=>(
                <ListGroup  key={item.id}>
                    <Card style={{ width: '18rem' }}>
                       <Card.Img variant="top" src={item.product?.images?.[0].url} />
                       <Card.Body>
                       <Card.Title>{item.product.title}</Card.Title>
                       </Card.Body>
                    </Card>
                    
                   
                </ListGroup>

            ))
        }


        </Row>
        

    </div>
        )
}
export default Purchased