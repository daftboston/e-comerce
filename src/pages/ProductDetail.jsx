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
        <h1>{detail?.title}</h1>
        <h2>category : {detail?.categoryId}</h2>

        <p>{detail?.description}</p>
        <h4>price : {detail?.price}</h4>
        <Button onClick={addToCart}>add to cart</Button>

      <div className="mb-3">        
        <Button  onClick={()=>setQuant(quant-1)}>-</Button>
        {quant}
        <Button  onClick={()=>setQuant(quant+1)}>+</Button>
      </div>
     
        <Row>
        <Carousel fade>
      <Carousel.Item>
        
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <img
          className="d-block w-100"
          src={detail?.images[1].url}
          alt="Third slide"
        /> 
      

        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={detail?.images[2].url}
          alt="Third slide"
        /> 

        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      
    </Carousel>
    </Row>

      

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