
import { Container } from "react-bootstrap"
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useSelector,useDispatch } from "react-redux";
import { getProductsThunk,filterCategoriesThunk, filterProductThunk } from "../store/slices/product.slice";

import { useEffect, useState } from "react";
import axios from "axios";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { Link } from "react-router-dom";


 const Home = () => {
    const products = useSelector(state=>state.product)
    const dispatch = useDispatch()
    const [categories, setCategories]= useState([])
    const [inputSearch, setInputSearch] =useState("")

    useEffect(()=>{
        dispatch(getProductsThunk())
        axios
          .get("https://e-commerce-api-v2.academlo.tech/api/v1/categories")
          .then(resp => setCategories(resp.data))
          .catch (error => console.error(error))

    },[])



    return( 
    <div>
          <h1>Home</h1>
         <Container>
            <Row>
                {
                    categories?.map(category=>(
                        <Col key={category.id}>
                  <Button className="w-100" onClick={()=>dispatch(filterCategoriesThunk(category.id))}>{category.name}</Button>
                </Col>

                    ))
                }
                
            </Row>
            <Col>
              <Button onClick={()=>dispatch(getProductsThunk())}>
                ALL

              </Button>
            </Col>

            <Row className="py-3" >
            <Col>
                <InputGroup className="mb-3">
                <Form.Control
                 placeholder="Buscar Productos"
                 aria-label="ProductsName"
                 aria-describedby="basic-addon2"
                 value = {inputSearch}
                 onChange={e=> setInputSearch(e.target.       value)}
                 />
          <Button onClick={()=> dispatch(filterProductThunk(inputSearch))} variant= "outline-secondary">

            SEARCH
             
          </Button>
      </InputGroup>
            </Col>
            

            </Row>
            <Row xs={1} md={2} lg={3} className="py-3">
                {
                    products?.map(product=>
                
                <Col className="mb-3" key={product.id}>
                   <Card style={{ width: '18rem' }}>
                   <Card.Img variant="top" src={product.images[0].url} />
                   <Card.Body>
                    <Card.Title>{product.brand}</Card.Title>
                    <Card.Title>{product.title}</Card.Title>
                   
                    <Button variant="primary"
                    as={Link}
                    to={`/product/${product.id}`}>Detalle de Producto</Button>
                    </Card.Body>
                    </Card>          
                </Col>)}
            </Row>
         </Container>
      
    </div>
        )
}
export default Home