import { Navigate } from 'react-router-dom'
import { useContext } from 'react'
import AuthContext from '../context/AuthProvider'

const PrivateRoute = ({children, ...rest}) => {
    let {user} = useContext(AuthContext)

    return !user ? <Navigate to='/login'/> : children;
}

export default PrivateRoute;