import React, { Component } from 'react';
import {withFirebase} from './Firebase';

export class AddElementForm extends Component {
    state = {
        name: '',
        image: '',
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleSubmit = e => {
        const imageName = new Date().getTime();
        const {name, image, text} = this.state;
        // eslint-disable-next-line no-lone-blocks
        {name && image && text
            ?this.props.firebase.sendImage(imageName, image)
                .then(
                    this.props.firebase.addToDatabase({
                        name: name,
                        image: imageName,
                        text: text,
                    })
                )
                .then(data => {
                    this.setState({
                        name: '',
                        image: null,
                        text: '',
                    })
                    alert("Files Added Succesful!")
                })
                :alert("Inputs can't be empty");
        }
        
        e.preventDefault();
    }

    fileInput = e => {
        this.setState({ [e.target.name]: e.target.files[0] });
    }
    render() {
        return (
            <form onSubmit = {this.handleSubmit}>
                <input 
                    type="text" 
                    name="name" 
                    placeholder="Title" 
                    value={this.state.name} 
                    onChange = {this.handleChange}/>
                    
                <label className="inputFileCustom" htmlFor="inputFile">
                    <input 
                        type="file" 
                        accept="image/png, image/jpeg" 
                        name="image" 
                        onChange = {this.fileInput} 
                        files={this.state.image}
                        id="inputFile"/>
                        Choose File
                </label>
                <textarea
                    type="textarea" 
                    name="text" 
                    placeholder="Text" 
                    value={this.state.text} 
                    onChange = {this.handleChange}/>
                    
                <button className="buttonPage">Send</button>                
            </form>
        );
    }
}

export default withFirebase(AddElementForm);
