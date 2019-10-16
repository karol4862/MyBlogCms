import React, { Component } from 'react';
import {withFirebase} from './Firebase';
import LandingPageElement from './LandingPageElement';
import './styles/LandingPage.css';
import pcImage from './img/work.jpg'

export class LandingPage extends Component {

    state = {
        contentList : []
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
                    contentList: prevState.contentList.concat(docObject)
                }))
            })
        })
        .then(doc => {
            this.setState(prevState => ({
                contentList: prevState.contentList.sort((a,b)=> b.image-a.image)
            }))
        })
    }

    render() {
        const {contentList} = this.state;
        const landingPageList = contentList.map(item => (
            <LandingPageElement content={item} key={item.id}/>
        ))
        return (
            <>
            <section className="welcomeSection">
                <div className="contentBox">
                    <h2> <span className="yellow">Hi</span>, my name is Karol.</h2>
                    <p>
                    This site is my own CMS based on Firebase. <br/>
                    Feel free to put your own post here and write what could I change in this site, or send a funny meme.<br/>
                    Go to the subpage <span className="yellow">/admin</span>, then sing in by use admin@admin and password admin123, and send a post.
                    You can atach the image, write the title and the text.
                    </p>
                </div>
                <img src={pcImage} alt="pcImage"/>
                <span className="yellow welcomeSpan">return valuablePost</span>
            </section>
            <div className="landingPage">
                {landingPageList}
            </div>
            </>
        );
    }
}

export default withFirebase(LandingPage);
