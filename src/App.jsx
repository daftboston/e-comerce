
import './App.css'
import { HashRouter,Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Purchased from './pages/Purchased'
import ProductDetail from './pages/ProductDetail'
import NavBar from './components/Navbar'
import Container from 'react-bootstrap/Container'
import Loader from './components/Loader'
import { useSelector } from 'react-redux'
import ProtectedRoutes from './components/ProtectedRoutes'


function App() {
  
const isLoading = useSelector(state=> state.isLoading)
  return (
    <HashRouter>
      <div className='App'>
      <NavBar/>  
          
      {isLoading&&<Loader/>}
      <Container className='my-5'>
      <Routes>
         <Route path="/" element= {<Home/>}/>
         <Route path="/product/:id" element={<ProductDetail/>}/>
         <Route element={ <ProtectedRoutes/>}>
               <Route path = "/purchased" element={<Purchased/>}/>
         </Route>       
         <Route path = "/login" element = {<Login/>}/>
      </Routes>
      </Container>
      </div>

    </HashRouter>
  )
}

export default App
