import firebase from 'react-native-firebase';
import b64 from 'base-64';
import _ from 'lodash';

import {
    MODIFICA_ADICIONA_CONTATO_EMAIL,
    ADICIONA_CONTATO_ERRO,
    ADICIONA_CONTATO_SUCESSO,
    LISTA_CONTATO_USUARIO,
    MODIFICA_MENSAGEM,
    LISTA_CONVERSA_USUARIO,
    ENVIAR_MENSAGEM_SUCESSO,
    LISTA_CONVERSAS_USUARIO
} from './types';

export const modificaAdicionaContatoEmail = texto => ({
    type: MODIFICA_ADICIONA_CONTATO_EMAIL,
    payload: texto
});

export const adicionaContato = email => dispatch => {
    const emailB64 = b64.encode(email);

    firebase.database().ref(`/contatos/${emailB64}`)
        .once('value')
        .then(snapshot => {
            if (snapshot.val()) {
                const dadosUsuario = _.first(_.values(snapshot.val()));

                const { currentUser } = firebase.auth();
                const emailUsuarioB64 = b64.encode(currentUser.email);

                firebase.database().ref(`/usuario_contatos/${emailUsuarioB64}`)
                    .push({ email, nome: dadosUsuario.nome })
                    .then(() => adicionaContatoSucesso(dispatch))
                    .catch(erro => adicionaContatoErro(erro.message, dispatch));
            } else {
                adicionaContatoErro(
                    'E-mail informado não corresponde a um usuário válido!',
                    dispatch
                );
            }
        });
};

const adicionaContatoErro = (erro, dispatch) => {
    dispatch({
        type: ADICIONA_CONTATO_ERRO,
        payload: erro
    });
};

const adicionaContatoSucesso = dispatch => {
    dispatch({
        type: ADICIONA_CONTATO_SUCESSO,
        payload: true
    });
};

export const habilitaInclusaoContato = () => ({
    type: ADICIONA_CONTATO_SUCESSO,
    payload: false
});

export const contatosUsuarioFetch = () => {
    const { currentUser } = firebase.auth();

    return (dispatch) => {
        const emailUsuarioB64 = b64.encode(currentUser.email);

        firebase.database().ref(`/usuario_contatos/${emailUsuarioB64}`)
            .on('value', snapshot => {
                dispatch({ type: LISTA_CONTATO_USUARIO, payload: snapshot.val() });
            });
    };
};

export const modificaMensagem = texto => ({
    type: MODIFICA_MENSAGEM,
    payload: texto
});

export const enviaMensagem = (mensagem, contatoNome, contatoEmail) => {
    const { currentUser } = firebase.auth();
    const usuarioEmail = currentUser.email;

    return dispatch => {
        const usuarioEmailB64 = b64.encode(usuarioEmail);
        const contatoEmailB64 = b64.encode(contatoEmail);

        firebase.database().ref(`/mensagens/${usuarioEmailB64}/${contatoEmailB64}`)
            .push({ mensagem, tipo: 'e' })
            .then(() => {
                firebase.database().ref(`/mensagens/${contatoEmailB64}/${usuarioEmailB64}`)
                    .push({ mensagem, tipo: 'r' })
                    .then(() => {
                        dispatch({ type: ENVIAR_MENSAGEM_SUCESSO });
                    });
            })
            .then(() => {
                firebase.database().ref(`/usuario_conversas/${usuarioEmailB64}/${contatoEmailB64}`)
                    .set({ nome: contatoNome, email: contatoEmail });
            })
            .then(() => {
                firebase.database().ref(`/contatos/${usuarioEmailB64}`)
                    .once('value')
                    .then(snapshot => {
                        const dadosUsuario = _.first(_.values(snapshot.val()));

                        firebase.database().ref(`/usuario_conversas/${contatoEmailB64}/${usuarioEmailB64}`)
                            .set({ nome: dadosUsuario.nome, email: usuarioEmail });
                    });
            });
    };
};

export const conversaUsuarioFetch = contatoEmail => {
    const { currentUser } = firebase.auth();

    const usuarioEmailB64 = b64.encode(currentUser.email);
    const contatoEmailB64 = b64.encode(contatoEmail);

    return dispatch => {
        firebase.database().ref(`/mensagens/${usuarioEmailB64}/${contatoEmailB64}`)
            .on('value', snapshot => {
                dispatch({ type: LISTA_CONVERSA_USUARIO, payload: snapshot.val() });
            });
    };
};

export const conversasUsuarioFetch = () => {
    const { currentUser } = firebase.auth();

    const usuarioEmailB64 = b64.encode(currentUser.email);

    return dispatch => {
        firebase.database().ref(`/usuario_conversas/${usuarioEmailB64}`)
            .on('value', snapshot => {
                dispatch({ type: LISTA_CONVERSAS_USUARIO, payload: snapshot.val() });
            });
    };
};
