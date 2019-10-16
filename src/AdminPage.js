import {withFirebase} from './Firebase';
import React, { Component } from 'react';
import AuthAdminPage from './AuthAdminPage';
import NoAuthAdminPage from './NoAuthAdminPage';


class AdminPage extends Component {
    state = {
        authUser: null
    }

    componentDidMount() {
        this.listener = this.props.firebase.auth.onAuthStateChanged(authUser => {
            authUser
              ? this.setState({ authUser })
              : this.setState({ authUser: null });
          });
    }

    componentWillUnmount() {
        this.listener() ;
    }
    
    render() {

        return (
            this.state.authUser ? <AuthAdminPage /> : <NoAuthAdminPage />
        );
    }
}


export default withFirebase(AdminPage);