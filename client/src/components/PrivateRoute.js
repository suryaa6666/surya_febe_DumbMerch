import { Outlet, Navigate } from "react-router-dom"


const PrivateRoute = () => {

    const login = localStorage.getItem('userLogin');

    return (
        login ? <Outlet /> : <Navigate to="/" />
    )
}

export default PrivateRoute