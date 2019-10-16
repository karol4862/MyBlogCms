import React from 'react';

const firebaseContent = React.createContext(null);

export const withFirebase = Component => props => (
    <firebaseContent.Consumer>
        {firebase => <Component {...props} firebase= {firebase} />}
    </firebaseContent.Consumer>
)

export default firebaseContent;