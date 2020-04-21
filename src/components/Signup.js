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
    
    render () {
        return (
            <div className="signup">
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
                            backgroundColor="green.400" 
                            color="#ffffff"
                            type="submit"
                            value="SignUp"
                        >
                            Sign Up
                        </Button>
                    </form>
                </FormControl>
            </div>
        )
    }
}

export default SignUp