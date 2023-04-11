import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Card } from 'react-bootstrap';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AlertError from '../components/AlertError';

 const Login = () => {

    const [ email, setEmail]= useState("")
    const [password, setPassword]= useState("")
    const navigate= useNavigate()

    // Guarda el estado del alert
    const[alert, setAlert]=useState(false)

    //Estos estados email y password corresponden a los estados guardados en el useState
   // En local storage se almacena el token  que bota el login
    const handleSubmit =(e)=>{
        e.preventDefault()
        const data = {
            email,
            password
        }

        axios. post("https://e-commerce-api-v2.academlo.tech/api/v1/users/login", data)
        .then(resp => {
            console.log(resp.data.token);
            localStorage.setItem("token", resp.data.token)
            navigate("/")
        })
        .catch(error => { console.error(error)
        setAlert(true)})
    }


    return( 

        <>
                    <Card  style={{maxWidth:500, margin: "3rem auto", padding:"2rem"}}>
                    
                    <h3>LOGIN</h3>
                    
                        <Form onSubmit={(e)=>handleSubmit(e)}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address: daniel@gmail.com</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" 
                                value={email}
                                onChange={(e)=> setEmail(e.target.value)} />
                                
                        </Form.Group>
                    
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password: 8704</Form.Label>
                                    <Form.Control type="password" placeholder="Password"
                                    vlaue={password}
                                    onChange={(e)=> setPassword(e.target.value)} />
                        </Form.Group>
                        
                        <Button variant="primary" type="sub mit">
                                Submit
                        </Button>
                        </Form>
                    
                </Card>

                <AlertError
                isVisible ={alert}
                />




        </>


        )
}
export default Login