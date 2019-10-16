import React, { Component } from 'react';
import {withFirebase} from './Firebase';
import './styles/LandingPageElement.css';

export class LandingPageElement extends Component {
    state = {
        imageUrl: '',
        contentEnable: false,
    }
    componentDidMount() {
        this.props.firebase.getImage(this.props.content.image).then(url => this.setState({
            imageUrl: url
        }));
    }
    handleButtonContent = () => {
        this.setState(prevState => ({
            contentEnable: !prevState.contentEnable
        }))
    }
    render() {
        const {name, image, text} = this.props.content;
        const {imageUrl, contentEnable} = this.state;
        return (
            <section className="landingPageElement">
                <img src={imageUrl} alt={image} />
                <h2>{name}</h2>
                {contentEnable && <p>{text}</p>}
                <button onClick = {this.handleButtonContent}>{contentEnable ? "Hide" : "Show"}</button>
            </section>
        );
    }
}

export default withFirebase(LandingPageElement);
