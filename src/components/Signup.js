import React from 'react'
import { Box, FormControl, FormLabel, Input, Button  } from "@chakra-ui/core";

class SignUp extends React.Component {
    constructor(){
        super()
        this.state = {
            username: '',
            password: ''
        }
    }

    handleOnChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleOnSubmit = (e) => {
        e.preventDefault()

        const reqObj = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(this.state)
        }

        fetch('http://localhost:3000/users', reqObj)
        .then(resp => resp.json())
        .then(user => {
            if(user.error) {
                alert(user.error)
            } else {
                this.props.history.push('/login')
            }
        })
        
        this.setState({
            username: '',
            password: ''
        })
    }
    
    

export default SignUp