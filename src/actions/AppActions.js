import firebase from 'firebase';
import b64 from 'base-64';
import _ from 'lodash';

import { MODIFICA_ADICIONA_CONTATO_EMAIL, ADICIONA_CONTATO_ERRO } from './types';

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

                firebase.database().ref(`/usuario_contato/${emailUsuarioB64}`)
                    .push({ email, nome: dadosUsuario.nome })
                    .then(() => console.log('Sucesso'))
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
