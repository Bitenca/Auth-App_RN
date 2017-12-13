import React, { Component } from 'react';
import { View, } from 'react-native';
import firebase from 'firebase';
import { Header, Button, CardSection, Spinner } from './components/common';
import LoginForm from './components/LoginForm';


class App extends Component {
    state = { loggedIn: null };

    componentWillMount() {
        firebase.initializeApp({
            apiKey: 'AIzaSyCbayEbV-aW93Fm6VSLhjWT4pKXLNNlwL0',
            authDomain: 'autentication-e3bb5.firebaseapp.com',
            databaseURL: 'https://autentication-e3bb5.firebaseio.com',
            projectId: 'autentication-e3bb5',
            storageBucket: 'autentication-e3bb5.appspot.com',
            messagingSenderId: '281625359342'
          });
        
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ loggedIn: true });
            } else {
                this.setState({ loggedIn: false });
            }
        });
    }

    renderContent() {
        switch (this.state.loggedIn) {
            case true:
                return (
                    <CardSection>
                        <Button onPress={() => firebase.auth().signOut()}>
                            Deslogar
                        </Button>
                    </CardSection>
                );
            case false:
                return <LoginForm />;
            default :
                return (
                    <View style={{ marginTop: 50 }}>
                        <Spinner size="large" />
                    </View>
                );
        }   
    }

    render() {
        return (
            <View>
                <Header headerText="Autenticação" />
                {this.renderContent()}
            </View>
        );
    }
}

export default App;
