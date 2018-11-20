import React, { Component } from 'react';
import { View, Text, FlatList, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Actions } from 'react-native-router-flux';
import { contatosUsuarioFetch } from '../actions/AppActions';

class Contatos extends Component {
    componentWillMount() {
        this.props.contatosUsuarioFetch();
        this.criaFonteDeDados(this.props.contatos);
    }

    componentWillReceiveProps(nextProps) {
        this.criaFonteDeDados(nextProps.contatos);
    }

    criaFonteDeDados(contatos) {
        this.fonteDeDados = contatos;
    }

    keyExtractor = (item) => item.uid;

    renderItem = ({ item }) => (
        <TouchableHighlight
            onPress={() => Actions.conversa()}
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
                <Text style={{ fontSize: 18 }}>{item.email}</Text>
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
    const contatos = _.map(state.ListaContatosReducer, (val, uid) => ({ ...val, uid }));
    return { contatos };
};

export default connect(mapStateToProps, {
    contatosUsuarioFetch
})(Contatos);
