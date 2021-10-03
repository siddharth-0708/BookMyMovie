import React, { useEffect } from "react";
import logo from '../../assets/logo.svg';
import "./Header.css";
import {Button} from "@material-ui/core";
import LoginModal from "../../screens/modals/loginModal/LoginModal"

export default function Header(){
    const [openModal, setIsOpen] = React.useState(false);

    function openModalHandler() {
        setIsOpen(true);
      }
    
    function onCloseModalHandler() {
    setIsOpen(false);
    }

    return(
        <div className = "header">
            <img src = {logo} className="logo" alt="LOGO"/>
            <div className ="logButton">
            <Button color = "default" variant="contained" onClick = {openModalHandler}>Login</Button>
            </div>
            <div className ="bookButton">
            <Button color = "primary" variant="contained">Book Show</Button>
            </div>
            {console.log("This is header openModal ", openModal)}
            {openModal ? <LoginModal closeModal = {onCloseModalHandler}></LoginModal>: null}
        </div>
    )    
}