import React, { Component } from 'react';
import {withFirebase} from './Firebase';
import './styles/NoAuthAdminPage.css';

class NoAuthAdminPage extends Component {
    state = {
            name: '',
            password: '',
            error: null
    }
    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }
    signInAuth = e => {
        const {name, password} = this.state;
        this.props.firebase.doSignInWithEmailAndPassword(name, password)
        .catch(error => this.setState({error}))
        e.preventDefault();
    }
    render() {
        const {name, password, error} = this.state;
        return (
            <div className="noAuthPage">
                <form onSubmit = {this.signInAuth}>
                    <input 
                        type="text" 
                        value={name} 
                        name = "name" 
                        onChange= {this.handleChange} 
                        placeholder = "Login" />
                    <input 
                        type="password" 
                        value={password} 
                        name = "password" 
                        onChange= {this.handleChange} 
                        placeholder = "Password" />
                    <button className="buttonPage">Login</button>
                    {error && error.message}
                </form>
            </div>
        );
    }
}

export default withFirebase(NoAuthAdminPage);
