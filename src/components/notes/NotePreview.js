import React from 'react'
import {Box} from "@chakra-ui/core"

class NotePreview extends React.Component {

    handleOnClick = event => {
        let selectedNoteId
        if (event.target.tagName === "DIV") {
            selectedNoteId = event.target.dataset.noteId
        } else {
            selectedNoteId = event.target.parentElement.dataset.noteId
        }
        
        selectedNoteId = parseInt(selectedNoteId, 10)

        this.props.setShowNote(selectedNoteId)
    }

    
    render () {
        const slicedContent = this.props.note.content.slice(0, 10) + "..."
        return (
            <Box
                border="1px"
                mb={2}
                p={2}
                data-note-id={this.props.note.id}
                onClick={this.handleOnClick}
            >
                <h4>
                    {this.props.note.title}
                </h4>
                <p style={{color: "gray"}}>
                    {slicedContent}
                </p>
            </Box>
        )
    }
}

export default NotePreview