import React, { Component } from 'react';
import { View, Text, FlatList, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Actions } from 'react-native-router-flux';
import { conversasUsuarioFetch } from '../actions/AppActions';

class Conversas extends Component {
    componentWillMount() {
        this.props.conversasUsuarioFetch();
        this.criaFonteDeDados(this.props.conversas);
    }

    componentWillReceiveProps(nextProps) {
        this.criaFonteDeDados(nextProps.conversas);
    }

    criaFonteDeDados(conversas) {
        this.fonteDeDados = conversas;
    }

    keyExtractor = (item) => item.uid;

    renderItem = ({ item }) => (
        <TouchableHighlight
            onPress={() => Actions.conversa({
                title: item.nome,
                contatoNome: item.nome,
                contatoEmail: item.email
            })}
        >
            <View
                style={{
                    flex: 1,
                    padding: 20,
                    borderBottomWidth: 1,
                    borderColor: '#CCC'
                }}
            >
                <Text style={{ fontSize: 25 }}>{item.nome}</Text>
            </ View>
        </TouchableHighlight >
    );

    render() {
        return (
            <FlatList
                enableEmptySections
                data={this.fonteDeDados}
                keyExtractor={this.keyExtractor}
                renderItem={this.renderItem}
            />
        );
    }
}

const mapStateToProps = state => {
    const conversas = _.map(state.ListaConversasReducer, (val, uid) => ({ ...val, uid }));
    return { conversas };
};

export default connect(mapStateToProps, {
    conversasUsuarioFetch
})(Conversas);
