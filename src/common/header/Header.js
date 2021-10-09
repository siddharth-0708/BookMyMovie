import React, { useEffect,useState } from "react";
import logo from '../../assets/logo.svg';
import "./Header.css";
import {Button} from "@material-ui/core";
import LoginModal from "../../screens/modals/loginModal/LoginModal";

export default function Header(props){
    console.log("This is header props", props);
    const [openModal, setIsOpen] = React.useState(false);
    const[showBookShowBtn, setBookShowBtn] = useState(false);
    const[showLogout, setShowLogout] = useState(false);

    function openModalHandler() {
        if(showLogout){
            return
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
    function onShowButtonClicked(){
       if(window.sessionStorage.getItem("token-details")){
        console.log("heheehehe");
       } 
        //CONDITIONNNNNNN LINK TO???
    }
    useEffect(() => {
        if(props.updateBtn){
            showBookShowButton();
        }else{
            hideBookShowButton();
        }
        if(props.isLoggedIn){
            showLogoutFunc();
        }
    });
    return(
        <div className = "header">
            <img src = {logo} className="logo" alt="LOGO"/>
            <div className ="logButton">
            <Button color = "default" variant="contained" onClick = {openModalHandler}>{showLogout ? "Logout": "Login"}</Button>
            </div>
            <div className ="bookButton">
            {showBookShowBtn ? <Button color = "primary" variant="contained" onClick = {onShowButtonClicked}>Book Show</Button> : null}
            </div>
            {console.log("This is header openModal ", openModal)}
            {openModal ? <LoginModal closeModal = {onCloseModalHandler} loginIsSuccessful = {props.loginIsSuccessful} showLogout = {showLogoutFunc}></LoginModal>: null}
        </div>
    ) 
       
}
