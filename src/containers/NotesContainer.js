  
import React from 'react'
import {connect} from 'react-redux'
import NotePreview from '../components/notes/NotePreview'
import {Box} from "@chakra-ui/core"
import NoteCard from '../components/notes/NoteCard'

class NotesContainer extends React.Component {
    constructor(){
        super()
        this.state = {
            notes: null,
            showNote: null
        }
    }

    renderNotesPreviews = () => {
        if (this.state.notes === null || this.state.notes.length === 0 || !this.state.notes) {
            return (
                <div>
                    <h4>
                        You don't have any notes! 
                        <br/> 
                        Click the New Note button to create one
                    </h4>
                </div>
            )
        }

        return this.state.notes.map(noteObj => {
            return (
                <div data-note-id={noteObj.id} key={noteObj.id}>
                    <NotePreview 
                        note={noteObj}
                        setShowNote={this.setShowNote}
                    />
                </div>
            )
        })
    }

    componentDidMount = () => {
        fetch(`http://localhost:3000/users/${this.props.user.id}`)
            .then(resp => resp.json())
            .then(data => this.setState({
                notes: data
            }))
    }

    setShowNote = id => {
        this.setState({
            showNote: id
        })
    }

    renderShowNote = () => {
        if (this.state.showNote === null) {
            return "Click on a note to see it"
        }

        let showNote = this.state.notes.filter(note => note.id === this.state.showNote)[0]
        return <NoteCard note={showNote} rerenderNotes={this.rerenderNotes}/>
    }

    rerenderNotes = (id) => {
        const newNotesArr = this.state.notes.filter(note => note.id !== id)
        this.setState({
            notes: newNotesArr,
            showNote: null
        })
    }

    render () {
        return (
            <div className="NotesContainer">
                <Box
                    d="flex"
                    alignItems="baseline"
                >
                    <Box 
                        as="span"
                        // d="flex"
                        // border="1px" //box around all note previews
                        m="2"
                        p={2}
                    >
                        <div className="NotePreviews">
                            {this.renderNotesPreviews()}
                        </div>
                    </Box>
                    <Box 
                        as="span"
                        // d="flex"
                        m="2"
                        p={2}
                    >
                        {this.renderShowNote()}
                    </Box>
                </Box>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth
    }
}

export default connect(mapStateToProps, null)(NotesContainer)