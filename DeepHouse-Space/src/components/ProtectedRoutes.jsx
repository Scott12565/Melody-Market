import { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../context/firebaseContext";

const ProtectedRoutes = ({component: Component, ...rest}) => {
    const { currentUser } = useContext(AuthContext);
    return ( 
        <Route 
            {...rest}
            render={(props) => {
                if(currentUser) return <Component {...props} />
                if(!currentUser){
                    return (
                        <Redirect to={{pathname: "/signup", state: {from: props.location}}} />
                    )
                }
            }}
        />
     );
}
 
export default ProtectedRoutes;