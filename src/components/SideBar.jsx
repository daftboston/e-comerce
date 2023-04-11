import React, { useState } from 'react';
import { ListGroup, Button } from 'react-bootstrap';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useSelector } from 'react-redux';
import getConfig from '../utils/getConfig';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { getProductThunk } from '../store/slices/cart.slice';


const SideBar = ({show,handleClose}) =>  {

    const productCart=useSelector(state=> state.cart)
    const dispatch = useDispatch()

    const checkoutCart=()=> {
      axios.post("https://e-commerce-api-v2.academlo.tech/api/v1/purchases",{
        "street": "Green St. 1456",
        "colony": "Southwest",
        "zipCode": 12345,
        "city": "USA",
        "references": "Some references"
    },getConfig()
      )
      .then (resp=>dispatch ( getProductThunk (resp.data)))
      .catch(error=> console.error(error))
    }


     
  

    return (
        <Offcanvas show={show} onHide={handleClose} placement={"end"}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>CARRITO</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
            <ListGroup>

           
          {  productCart.length !== 0 ?
             productCart?.map(itemCart=>(
            <ListGroup.Item key={itemCart.id}>
              {itemCart.product.title}
              {itemCart.product.price}           
            
            </ListGroup.Item>
          ))  :
           <h3>No hay productos seleccionados</h3>         
          }
          </ListGroup>

          <Button onClick={checkoutCart} disabled={productCart==0}>Checkout</Button>

    
        </Offcanvas.Body>
      </Offcanvas>
)
}
export default SideBar