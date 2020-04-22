import React from 'react'
import {Box, FormControl, FormLabel, Input, Button, Textarea} from "@chakra-ui/core";
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'



class NewNoteForm extends React.Component {
	constructor(){
		super()
		this.state = {
			title: '',
			content: ''
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
			body: JSON.stringify({
				...this.state,
				user_id: this.props.user.id
			})
		}

		fetch('http://localhost:3000/notes', reqObj)
		.then(resp => resp.json())
		.then(note => {
			if (note.error) {
				alert(note.error)
				return
			}
			this.props.history.push('/')
		})

		this.setState({
			username: '',
			password: ''
		})
	}

	render () {
		if(!this.props.user) {
			this.props.history.push('/login')
			return null
		} 

		return (
			<div className="New-Note-Form">
				<FormControl 
					ml="2%"
					mt="2%"
				>
					<form onSubmit={this.handleOnSubmit}>
						<Box width={['45%', 0.35, 0.25, 0.15]}>
							<FormLabel htmlFor="title">Title </FormLabel>
							<Input 
								type="text" 
								name="title" 
								value={this.state.title} 
								onChange={this.handleOnChange} 
								focusBorderColor="lime"
								size="sm"
								isRequired
							/>
						</Box>
						<br />
						<Box width={['60%', 0.35, 0.25, 0.15]} >
							<FormLabel htmlFor="content">Content </FormLabel>
							<Textarea 
								type="text" 
								name="content" 
								value={this.state.content} 
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
							value="Save"
							mt={5}
						>
							Save
						</Button>
					</form>
				</FormControl>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		user: state.auth
	}
}

export default connect(mapStateToProps)(withRouter(NewNoteForm))