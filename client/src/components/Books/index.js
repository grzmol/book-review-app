import React, { Component } from 'react';
import { getBookWithReviewer } from '../../actions'
import { connect } from 'react-redux';

class BookView extends Component {

    componentWillMount(){
        this.props.dispatch(getBookWithReviewer(this.props.match.params.id))
    }


    render() {
        
        return (
            <div>
                book view
            </div>
        );
    }
}

function mapStateToProps(state){
    return{
        books:state.books
    }
}

export default connect(mapStateToProps)(BookView);