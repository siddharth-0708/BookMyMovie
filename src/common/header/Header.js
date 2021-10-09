import React, { useEffect,useState } from "react";
import logo from '../../assets/logo.svg';
import "./Header.css";
import {Button} from "@material-ui/core";
import LoginModal from "../../screens/modals/loginModal/LoginModal";
import {Link} from "react-router-dom";

export default function Header(props){
    console.log("This is header props", props);
    const [openModal, setIsOpen] = React.useState(false);
    const[showBookShowBtn, setBookShowBtn] = useState(false);
    const[showLogout, setShowLogout] = useState(false);
    const lastKey = window.location.href.split("/");
    const key = lastKey[lastKey.length - 1];

    function openModalHandler() {
        if(showLogout){

            async function logout(){
                const accessToken = JSON.parse(window.sessionStorage.getItem("token-details"));
                  try {
                    const rawPromise = fetch('http://localhost:8085/api/v1/auth/logout',{
                        method: 'POST',
                        headers: {
                          "Accept": "application/json;charset=UTF-8",
                          "authorization" : `Bearer ${accessToken}`
                        }
                    })
                    const rawResponse = await rawPromise;
                    //var result = await rawResponse.json();
                    
                  if(rawResponse.ok){
                      window.sessionStorage.removeItem("token-details");
                      window.sessionStorage.removeItem("user-details");
                      props.logoutIsSuccessful();
                  }else{
                      const error = new Error();
                      error.message = error.message ?  error.message : "something happened";
                      throw error;
                  }
            
                  } catch (error) {
                      
                  }
            }
            logout();
            return;
        }
        setIsOpen(true);
      }
    
    function onCloseModalHandler() {
        setIsOpen(false);
    }
    function showBookShowButton() {
        setBookShowBtn(true);
    }
    function hideBookShowButton() {
        setBookShowBtn(false);
    }
    function showLogoutFunc() {
        setShowLogout(true);
    }
    function hideLogoutFunc() {
        setShowLogout(false);
    }
    useEffect(() => {
        if(props.updateBtn){
            showBookShowButton();
        }else{
            hideBookShowButton();
        }
        if(props.isLoggedIn){
            showLogoutFunc();
        }else{
            hideLogoutFunc();
        }
    });
    return(
        <div className = "header">
            <img src = {logo} className="logo" alt="LOGO"/>
            <div className ="logButton">
            <Button color = "default" variant="contained" onClick = {openModalHandler}>{showLogout ? "Logout": "Login"}</Button>
            </div>
            <div className ="bookButton">
            {showBookShowBtn ? <Link to = {{pathname: `/bookshow/${key}`}}><Button color = "primary" variant="contained">Book Show</Button></Link> : null}
            </div>
            {console.log("This is header openModal ", openModal)}
            {openModal ? <LoginModal closeModal = {onCloseModalHandler} loginIsSuccessful = {props.loginIsSuccessful} showLogout = {showLogoutFunc}></LoginModal>: null}
        </div>
    ) 
       
}
