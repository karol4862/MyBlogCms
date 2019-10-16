import {withFirebase} from './Firebase';
import React, { Component } from 'react';

export class ListElement extends Component {


    handleDeleteButton = (id, image) => {
        this.props.removeArticle(id);
        this.props.firebase.deleteFromDatabase(id);
        this.props.firebase.removeImage(image)
    }
    
    render() {
        const {name, id, image} = this.props.content;
        return (
            <li>
                <h2>{name}</h2>
                <button className="buttonPage" onClick = {()=> this.handleDeleteButton(id, image)}>Delete</button>
            </li>
        );
    }
}

export default withFirebase(ListElement);