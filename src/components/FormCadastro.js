import React, { Component } from 'react';
import { View, TextInput, Button, ImageBackground, Text } from 'react-native';
import { connect } from 'react-redux';
import {
    modificaNome,
    modificaEmail,
    modificaSenha,
    cadastroUsuario
} from '../actions/AutenticacaoActions';

const bg = require('../imgs/bg.png');

class formCadastro extends Component {
    cadastroUsuario = () => {
        const { nome, email, senha } = this.props;

        this.props.cadastroUsuario({ nome, email, senha });
    }

    render() {
        return (
            <ImageBackground style={{ flex: 1 }} source={bg}>
                <View style={{ flex: 1, padding: 10 }}>
                    <View style={{ flex: 4, justifyContent: 'center' }}>
                        <TextInput
                            value={this.props.nome}
                            placeholder='Nome'
                            style={{ fontSize: 20, height: 45 }}
                            onChangeText={texto => this.props.modificaNome(texto)}
                        />
                        <TextInput
                            value={this.props.email}
                            placeholder='E-mail'
                            style={{ fontSize: 20, height: 45 }}
                            onChangeText={texto => this.props.modificaEmail(texto)}
                        />
                        <TextInput
                            secureTextEntry
                            value={this.props.senha}
                            placeholder='Senha'
                            style={{ fontSize: 20, height: 45 }}
                            onChangeText={texto => this.props.modificaSenha(texto)}
                        />
                        <Text
                            style={{ color: '#ff0000', fontSize: 18 }}
                        >
                            {this.props.cadastroErro}
                        </Text>
                    </View>
                    <View style={{ flex: 1 }}>
                        <Button
                            title='Cadastrar'
                            color='#115E54'
                            onPress={() => this.cadastroUsuario()}
                        />
                    </View>
                </View>
            </ImageBackground>
        );
    }
}

const mapStateToProps = state => ({
    nome: state.AutenticacaoReducer.nome,
    email: state.AutenticacaoReducer.email,
    senha: state.AutenticacaoReducer.senha,
    cadastroErro: state.AutenticacaoReducer.cadastroErro
});

export default connect(mapStateToProps, {
    modificaNome,
    modificaEmail,
    modificaSenha,
    cadastroUsuario
})(formCadastro);
