import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoutes = () => {

    // extrae en el valor del token y se guarda en la variable del token.
    const token = localStorage.getItem("token")

		// Aquí va la condición. Puede ser una condición de cualquier tipo. Lo que 
		// Importa es que valide si el usuario está loggeado o no
    if(token){
        return <Outlet />
    } else { 
        return <Navigate to='/login' />
    }                     // Aquí le debemos decir la ruta a la que queremos llevar
};                        // al usuario si no está autenticado

export default ProtectedRoutes;