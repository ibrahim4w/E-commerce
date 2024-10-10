import { Navigate } from "react-router-dom";


export const Protected = ({children}) => {

    if(localStorage.getItem("tkn") == null){
        return <Navigate to={"/login"}/>;
    }
  return (
    <>{children}</>
  )
}
