import React, { useState, useEffect } from "react";
import "./LoginModal.css";
import { Tab } from "@material-ui/core";
import { Tabs } from "@material-ui/core";
import { FormControl } from "@material-ui/core";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import {Button} from "@material-ui/core";
import Modal from 'react-modal';

export default function LoginModal(props){
  const [openModal, setIsOpen] = React.useState(true);
  const [value, setValue] = React.useState('one');

    Modal.setAppElement('#root');
    
    useEffect(() => {
      console.log("This is use effect of modal")
      isOpenModal();
    },[]);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    const customStyles = {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
        },
      };

    function isOpenModal(){
      setIsOpen(true);
    }
    function closeModal() {
      setIsOpen(false);
      props.closeModal();
    }

    function TabPanel(props) {
        const {value} = props;

        const [username, setUsername] = useState("");
        const [password, setPassword] = useState("");
        const [firstName, setFirstName] = useState("");
        const [lastName, setLastName] = useState("");
        const [email, setEmail] = useState("");
        const [contact, setContact] = useState("");

        const [reqUsername, setreqUsername] = useState("dispNone");
        const [reqPassword, setreqPassword] = useState("dispNone");
        const [reqFirstName, setreqFirstName] = useState("dispNone");
        const [reqLastName, setreqLastName] = useState("dispNone");
        const [reqEmail, setreqEmail] = useState("dispNone");
        const [reqContact, setreqContact] = useState("dispNone");



        function onLoginClick(e){
          username === "" ? setreqUsername("dispBlock") : setreqUsername("dispNone");
          password === "" ? setreqPassword("dispBlock") : setreqPassword("dispNone");
      
          if (username === "" || password === "") {
            return;
          }
        }
        function onRegisterClick(e){

          password === "" ? setreqPassword("dispBlock") : setreqPassword("dispNone");
          firstName === "" ? setreqFirstName("dispBlock") : setreqFirstName("dispNone");
          lastName === "" ? setreqLastName("dispBlock") : setreqLastName("dispNone");
          email === "" ? setreqEmail("dispBlock") : setreqEmail("dispNone");
          contact === "" ? setreqContact("dispBlock") : setreqContact("dispNone");

          if (password === "" || firstName === "" || lastName === "" || email === "" || contact === "") {
            return;
          }
        }

        if(value === "one"){
          return (
            <div className = "loginPanel">
            {console.log("This is loginPanel rendering again")}
            <FormControl required className = "formControl">
              <InputLabel htmlFor="username">
               username
              </InputLabel>
              <Input id = "username" value = {username} onChange={(e) => setUsername(e.target.value)}/>
              <FormHelperText className={reqUsername}>
                <span className="red">Required</span>
              </FormHelperText>
          </FormControl>
          <br/>
          <br/>
          <FormControl required className = "formControl">
              <InputLabel htmlFor="password">
               password
              </InputLabel>
              <Input id = "password" value = {password} type = "password" onChange={(e) => setPassword(e.target.value)} />
              <FormHelperText className={reqPassword}>
                <span className="red">Required</span>
              </FormHelperText>
          </FormControl>
          <br/>
          <br/>
          <br/>
          <Button color = "primary" variant="contained" onClick = {onLoginClick}>Login</Button>
          </div>
          );
        }else{
          return (
            <div className = "RegisterPanel">
            <FormControl required className = "formControl">
              <InputLabel htmlFor="firstname">
               First Name
              </InputLabel>
              <Input id = "firstname" value = {firstName} onChange={(e) => setFirstName(e.target.value)}/>
              <FormHelperText className={reqFirstName}>
                <span className="red">Required</span>
              </FormHelperText>
          </FormControl>
          <br/>
          <br/>
          <FormControl required className = "formControl">
              <InputLabel htmlFor="lastname">
               Last Name
              </InputLabel>
              <Input id = "lastname" value = {lastName} onChange={(e) => setLastName(e.target.value)}/>
              <FormHelperText className={reqLastName}>
                <span className="red">Required</span>
              </FormHelperText>
          </FormControl>
          <br/>
          <br/>
          <FormControl required className = "formControl">
              <InputLabel htmlFor="email">
               Email
              </InputLabel>
              <Input id = "email" value = {email} type = "email" onChange={(e) => setEmail(e.target.value)}/>
              <FormHelperText className={reqEmail}>
                <span className="red">Required</span>
              </FormHelperText>
          </FormControl>
          <br/>
          <br/>
          <FormControl required className = "formControl">
              <InputLabel htmlFor="password">
               Password
              </InputLabel>
              <Input id = "password"  value = {password} type = "password" onChange={(e) => setPassword(e.target.value)}/>
              <FormHelperText className={reqPassword}>
                <span className="red">Required</span>
              </FormHelperText>
          </FormControl>
          <br/>
          <br/>
          <FormControl required className = "formControl">
              <InputLabel htmlFor="contact">
               Contact No
              </InputLabel>
              <Input id = "contact" value = {contact} onChange={(e) => setContact(e.target.value)}/>
              <FormHelperText className={reqContact}>
                <span className="red">Required</span>
              </FormHelperText>
          </FormControl>
          <br/>
          <br/>
          <br/>
          <Button color = "primary" variant="contained" onClick = {onRegisterClick}>Register</Button>
          </div>
          );
        }
      }

    return (
        <div>
          {console.log("This is modal rendering again")}
          <Modal
            isOpen={openModal}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
          >
        <Tabs
            value={value}
            onChange={handleChange}
            textColor="secondary"
            indicatorColor="secondary"
            aria-label="secondary tabs example"
         >
            <Tab value="one" label="LOGIN"/> 
            <Tab value="two" label="REGISTER" />
      </Tabs>
            <TabPanel value={value}>
            </TabPanel>
          </Modal>
        </div>
      );   
}