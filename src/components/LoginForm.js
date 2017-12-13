import React, { Component } from 'react';
import { Text } from 'react-native';
import firebase from 'firebase';
import { Button, Card, CardSection, Input, Spinner } from './common';


class LoginForm extends Component {
    state = { email: '', password: '', error: '', loading: false };

    onButtonPress() {
        const { email, password } = this.state;

        this.setState({ error: '', loading: true });

        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(this.onLoginSucess.bind(this))
        .catch(() => {
            firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(this.onLoginSucess.bind(this))
            .catch(this.onLoginFail.bind(this));
        });
    }

    onLoginFail() {
        this.setState({ 
            error: 'A autenticação falhou.',
            loading: false
        });
    }

    onLoginSucess() {
        this.setState({
            email: '',
            password: '',
            loading: false,
            error: ''
        });
    }

    renderButton() {
        if (this.state.loading) {
            return <Spinner size="small" />;
        }

        return (
            <Button onPress={this.onButtonPress.bind(this)}>
                Login
            </Button>
        );
    }

    render() {
        return (
            <Card>
                <CardSection >
                    <Input 
                    label="Email"
                    placeholder="exemplo@hotmail.com"
                    value={this.state.email}
                    onChangeText={email => this.setState({ email })}
                    />
                </CardSection>
                <CardSection>
                    <Input 
                    label="Senha"
                    placeholder="senha"
                    value={this.state.password}
                    onChangeText={password => this.setState({ password })}
                    secureTextEntry
                    />
                </CardSection>

                <Text style={styles.errorMessage}>
                    {this.state.error}
                </Text>

                <CardSection>
                    {this.renderButton()}
                </CardSection>
            </Card>
        ); 
    }
}

const styles = {
    errorMessage: {
        color: 'red',
        fontWeight: 'bold',
        alignSelf: 'center',
        padding: 5
    }
};

export default LoginForm;
