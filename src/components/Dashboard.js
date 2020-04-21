import React from 'react'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'


class Dashboard extends React.Component {

    componentDidMount = () =>{
     
    }

    render(){
        if(!this.props.auth) {
            this.props.history.push('/login')
            return null
          } 

        const h2styles = {
			color: "black",
			fontSize: "60px"
        }
        
        return (
            <div>hello</div> 
        )
        }
    }

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps)(withRouter(Dashboard))