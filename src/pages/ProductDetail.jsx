 import axios from "axios"
import { useState, useEffect } from "react"
 import { useParams } from "react-router-dom"
 import { setIsLoading } from "../store/slices/isLoading.slice"
 import { useDispatch, useSelector } from "react-redux"
import { Button, Row, Col, ListGroup } from "react-bootstrap"
import Carousel from 'react-bootstrap/Carousel';
import {  filterCategoriesThunk, filterProductThunk } from "../store/slices/product.slice"
import { addProductThunk } from "../store/slices/cart.slice"
import { useNavigate } from "react-router-dom"
import Card from 'react-bootstrap/Card';




 const ProductDetail = () => {
    const {id} = useParams ()
    const [ detail, setDetail]= useState ({})
    const dispatch = useDispatch()
    const productRelated=useSelector(state=> state.product)
    const navigate = useNavigate()

    //guarda la cantidad de productos
    const [quant, setQuant]= useState(1)

    useEffect(()=>{
        dispatch (setIsLoading(true))
        
        axios 
          .get (`https://e-commerce-api-v2.academlo.tech/api/v1/products/${id}`)
          .then (resp => { setDetail(resp.data),
            dispatch (filterCategoriesThunk(resp.data?.category?.id))


          // dispatch (filterProductThunk(resp.data?.categoryId))
            //console.log(resp.data)
          })
          .catch(error=> console.error(error))
          .finally( ()=>{
            setTimeout(
                ()=>{
                    dispatch (setIsLoading(false))},300)
          })

        
          
    },[id])


    // esta funcion crea un objeto que se ejecuta con el boton add to cart 
    const addToCart=()=>{
      const token = localStorage.getItem("token")
   
      if (token) {
        //si hay inicio de sesion 
        const cart= {
          quantity: quant,  
          productId: detail.id           
        }
        
        dispatch (addProductThunk (cart))        
      } else{
        // no hay sesion iniciada 
        // redirige al login 
        navigate("/login")     

      }
     
    }

    return( 
    <div>
        
       

        <Card style={{ width: '50rem' }}>
      <Card.Img variant="top" src="" />
      <Carousel>       
      <Carousel.Item>
      <img
          className="d-block w-40"
          style={{height:250}}
          src={detail?.images?.[0].url}
          alt="First slide"
        />      
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-40"
          style={{height:250}}
          src={detail?.images?.[1].url}
          alt="Second slide"
        />

      </Carousel.Item>
      <Carousel.Item>

      <img
          className="d-block w-10"
          style={{height:250}}
          src={detail?.images?.[2].url}
          alt="Third slide"
        />
        </Carousel.Item>
    </Carousel>



      <Card.Body>
        <Card.Title>{detail?.title}</Card.Title>
        <Card.Text>
        {detail?.description}
        </Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
     
        <ListGroup.Item> $ {detail?.price}</ListGroup.Item>
        
      </ListGroup>
      <Card.Body>
      <Button onClick={addToCart}>add to cart</Button>

<div className="mb-3">        
  <Button  onClick={()=>setQuant(quant-1)}>-</Button>
  {quant}
  <Button  onClick={()=>setQuant(quant+1)}>+</Button>
</div>
        
      </Card.Body>
    </Card>




      
      
        
      <Col>
        <h3>Related Products</h3>
        <ListGroup >
          {productRelated?.map(productItem=>(
            <ListGroup.
            Item 
            key={productItem.id}>
              {productItem.title}
            
            </ListGroup.
                        Item>
          ))
            
          }

        </ListGroup>
        
      </Col>
       

    </div>
        )
}
export default ProductDetail