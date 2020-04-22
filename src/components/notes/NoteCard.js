import React from 'react'
import {Button} from "@chakra-ui/core"
import {withRouter} from 'react-router-dom'


class NoteCard extends React.Component {

	handleEditOnClick = e => {
		this.props.history.push(`/notes/${this.props.note.id}/edit`)
	}

	handleDeleteOnClick = e => {
		const confirmation = window.confirm('Are you sure you want to delete this note?')

		if (confirmation) {
			fetch(`http://localhost:3000/notes/${this.props.note.id}`, {method: "DELETE"})
			.then(resp => resp.json())
			.then(note => {
			if (note.error) {
				alert(note.error)
				return
			}
			this.props.rerenderNotes(this.props.note.id)
		})
		} else {
			return
		}

	}

	render () {
		const h3styles = {
			fontSize: "30px"
		}
		return (
			<div className="NoteCard">
				<h3 style={h3styles}>{this.props.note.title}</h3>
				<p>{this.props.note.content}</p>
				<Button  
					variant="solid" 
					backgroundColor="messenger.600" 
					color="#ffffff"
					type="submit" 
					value="Edit Note"
					onClick={this.handleEditOnClick}
					mt={4}
				>
					Edit
				</Button>
				<Button  
					variant="solid" 
					backgroundColor="messenger.600" 
					color="#ffffff"
					type="submit" 
					value="Delete Note"
					onClick={this.handleDeleteOnClick}
					mt={4}
					ml={2}
				>
					Delete
				</Button>
			</div>
		)
	}
}

export default (withRouter(NoteCard))