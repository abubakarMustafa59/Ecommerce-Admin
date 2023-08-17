import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import  "./login.css"
import { login } from "../../redux/apiCalls";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [adminName, setAdminName] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const feching=useSelector(state => state.admin.isFetching)
  const error=useSelector(state => state.admin.error)
  const admin=useSelector(state => state.admin.isAdmin)
  const handleClick = (e) => {
    e.preventDefault();
    login(dispatch, {username: adminName, password })
    setPassword("")
    setAdminName("")
    console.log("All clear")
    const toastWarn = () => toast.error("Wrong UserName or Password");
    const toastAlert = () => toast.warn("You are not Admin");
    if(error){
      toastWarn()
    }
    if(!admin){
      toastAlert()
    }
    setTimeout(() => {
      localStorage.removeItem("currentAdmin");
      localStorage.removeItem("adminId");
      console.log("Expired data removed");
    }, 60 * 6 * 1000);
  }
  // setTimeout(() => {
  //   localStorage.removeItem("currentAdmin");
  //   localStorage.removeItem("adminId");
  //   console.log("Expired data removed");
  // }, 6 * 1000);
    return (
      <div class="Container">
            <ToastContainer position="top-right" autoClose={900} />
      <div class="ToastContainer" position="top-right" autoClose="900"></div>
      <div class="Wrapper">
        <h1 class="Title">SIGN IN To Admin Pannel</h1>
        <form class="Form">
          <input type="email" value={adminName} onChange={(e)=>setAdminName(e.target.value)} class="Input"  placeholder="email" />
          <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)}  class="Input"  placeholder="password" />
          <button disabled={feching}  onClick={(e)=>handleClick(e)} class="Button">LOGIN</button>
          <a class="Link">DO NOT YOU REMEMBER THE PASSWORD?</a>
          <a class="Link">{admin && "CREATE A NEW ACCOUNT"}</a>
        </form>
      </div>
    </div>
    
    );
};

export default Login;