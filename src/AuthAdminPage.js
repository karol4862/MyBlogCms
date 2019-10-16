import React, { Component } from 'react';
import ListElement from './ListElement';
import AddElementForm from './AddElementForm';
import {withFirebase} from './Firebase';
import './styles/AuthAdminPage.css';

class AuthAdminPage extends Component {
    state = {
        contentFirebase: [],
    }

    componentDidMount() {
        this.props.firebase.getFromDatabase().then(snapshot => {
            snapshot.docs.forEach(doc => {
                let docObject = {
                    id: doc.id,
                    name: doc.data().name,
                    image: doc.data().image,
                    text: doc.data().text
                }
                this.setState(prevState => ({
                    contentFirebase: prevState.contentFirebase.concat(docObject)
                }))
            })
        })
        .then(doc => {
            this.setState(prevState => ({
                contentFirebase: prevState.contentFirebase.sort((a,b)=> b.image-a.image)
            }))
        })
    }
    
    removeArticle = id => {
        const contentFirebase = this.state.contentFirebase.filter(item => (
            item.id !== id
        ))
        this.setState({contentFirebase})
    }

    signOutAuth = () => this.props.firebase.doSignOut()

    render() {
        const {contentFirebase} = this.state;

        const articlesList = contentFirebase.map(item => (
            <ListElement 
                content = {item} 
                key={item.id}
                removeArticle={this.removeArticle}/>))
        return (
            <div className="authPage">
                <AddElementForm />
                <button className = "singOut buttonPage" onClick = {this.signOutAuth}>Sing Out</button>
                <ul className= "listFirebase">
                     {articlesList}
                </ul>
            </div>
        );
    }
}


export default withFirebase(AuthAdminPage);
