import React from 'react'
import {Box, FormControl, FormLabel, Input, Button, Text} from "@chakra-ui/core";
import {connect} from 'react-redux'
import {loginUser} from '../actions/auth'
import { Link } from 'react-router-dom';


class Login extends React.Component {
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
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(this.state)
        }

        fetch('http://localhost:3000/auth', reqObj)
        .then(resp => resp.json())
        .then(user => {
            // store user data in redux store
            // redirect to dashboard
            if (!user.error) {
                this.props.loginUser(user)
                this.props.history.push('/')
            } else {
                alert(user.error)
                this.props.history.push('/login')
            }
        })

        this.setState({
            username: '',
            password: ''
        })
    }

    handleSignUpClick = () => {
        
    }
    
    render () {
        
        return (
            <div className="login">
                <FormControl 
                    ml="2%"
                    mt="2%"
                >
                    <form onSubmit={this.handleOnSubmit}>
                        <Box width={['45%', 0.35, 0.25, 0.15]}>
                            <FormLabel htmlFor="username">username </FormLabel>
                            <Input 
                                type="text" 
                                name="username" 
                                value={this.state.username} 
                                onChange={this.handleOnChange} 
                                focusBorderColor="lime"
                                size="sm"
                                isRequired
                            />
                        </Box>
                        <br />
                        <Box width={['45%', 0.35, 0.25, 0.15]}>
                            <FormLabel htmlFor="password">password </FormLabel>
                            <Input 
                                type="text" 
                                name="password" 
                                value={this.state.password} 
                                onChange={this.handleOnChange} 
                                focusBorderColor="lime"
                                size="sm"
                                isRequired
                            />
                        </Box>
                        <br />
                        <Button  
                            variant="solid" 
                            backgroundColor="messenger.600" 
                            color="#ffffff"
                            type="submit" 
                            value="Login"
                        >
                            Log In
                        </Button>
                    </form>
                </FormControl>
                <Box
                    ml="5"
                    mt="5"
                >
                    <Text>
                        Don't have an account? &nbsp;
                        <Link to="/signup">
                            <Button  
                                variant="solid" 
                                backgroundColor="green.400" 
                                color="#ffffff"
                                value="SignUp"
                            >
                                Sign Up
                            </Button>
                        </Link>
                    </Text>
                </Box>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loginUser: user => dispatch(loginUser(user))
    }
}

export default connect(null, mapDispatchToProps)(Login)