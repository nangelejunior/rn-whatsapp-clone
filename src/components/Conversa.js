import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, TextInput, Image, TouchableHighlight, FlatList } from 'react-native';
import _ from 'lodash';

import { modificaMensagem, enviaMensagem, conversaUsuarioFetch } from '../actions/AppActions';

const enviarMensagem = require('../imgs/enviar_mensagem.png');

class Conversa extends Component {
    componentWillMount() {
        this.props.conversaUsuarioFetch(this.props.contatoEmail);
        this.criaFonteDeDados(this.props.conversa);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.contatoEmail !== nextProps.contatoEmail) {
            this.criaFonteDeDados(nextProps.contatoEmail);
        }
        this.criaFonteDeDados(nextProps.conversa);
    }

    enviaMensagem() {
        const { mensagem, contatoNome, contatoEmail } = this.props;

        this.props.enviaMensagem(mensagem, contatoNome, contatoEmail);
    }

    criaFonteDeDados(conversa) {
        this.fonteDeDados = conversa;
    }

    keyExtractor = (item) => item.uid;

    renderItem = ({ item }) => {
        if (item.tipo === 'e') {
            return (
                <View
                    style={{
                        alignItems: 'flex-end',
                        marginTop: 5,
                        marginBottom: 5,
                        marginLeft: 40
                    }}
                >
                    <Text
                        style={{
                            fontSize: 18,
                            color: '#000',
                            padding: 10,
                            backgroundColor: '#dbf5b4',
                            elevation: 1
                        }}
                    >
                        {item.mensagem}
                    </Text>
                </View >
            );
        }

        return (
            <View
                style={{
                    alignItems: 'flex-start',
                    marginTop: 5,
                    marginBottom: 5,
                    marginRight: 40
                }}
            >
                <Text
                    style={{
                        fontSize: 18,
                        color: '#000',
                        padding: 10,
                        backgroundColor: '#f7f7f7',
                        elevation: 1
                    }}
                >
                    {item.mensagem}
                </Text>
            </View >
        );
    };

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#eee4dc', padding: 10 }}>
                <View style={{ flex: 1, paddingBottom: 20 }}>
                    <FlatList
                        enableEmptySections
                        data={this.fonteDeDados}
                        keyExtractor={this.keyExtractor}
                        renderItem={this.renderItem}
                    />
                </View>

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

const mapStateToProps = state => {
    const conversa = _.map(state.ListaConversaReducer, (val, uid) => ({
        ...val, uid
    }));

    return ({
        conversa,
        mensagem: state.AppReducer.mensagem
    });
};

export default connect(mapStateToProps, {
    modificaMensagem,
    enviaMensagem,
    conversaUsuarioFetch
})(Conversa);
