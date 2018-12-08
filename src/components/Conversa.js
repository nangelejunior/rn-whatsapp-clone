import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, TextInput, Image, TouchableHighlight } from 'react-native';
import { modificaMensagem, enviaMensagem } from '../actions/AppActions';

const enviarMensagem = require('../imgs/enviar_mensagem.png');

class Conversa extends Component {
    enviaMensagem() {
        const { mensagem, contatoNome, contatoEmail } = this.props;

        this.props.enviaMensagem(mensagem, contatoNome, contatoEmail);
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#eee4dc', padding: 10 }}>
                <View style={{ flex: 1, paddingBottom: 20 }} />
                <View style={{ flexDirection: 'row', height: 60 }}>
                    <TextInput
                        value={this.props.mensagem}
                        onChangeText={texto => this.props.modificaMensagem(texto)}
                        style={{ flex: 4, backgroundColor: '#fff', fontSize: 18 }}
                    />
                    <TouchableHighlight
                        onPress={this.enviaMensagem.bind(this)}
                        underlayColor='#fff'
                    >
                        <Image source={enviarMensagem} />
                    </TouchableHighlight>
                </View>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    mensagem: state.AppReducer.mensagem
});

export default connect(mapStateToProps, { modificaMensagem, enviaMensagem })(Conversa);
