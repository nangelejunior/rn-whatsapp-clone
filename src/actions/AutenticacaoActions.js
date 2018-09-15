import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import b64 from 'base-64';

export const modificaNome = (texto) => ({
    type: 'modifica_nome',
    payload: texto
});

export const modificaEmail = (texto) => ({
    type: 'modifica_email',
    payload: texto
});

export const modificaSenha = (texto) => ({
    type: 'modifica_senha',
    payload: texto
});

export const cadastroUsuario = ({ nome, email, senha }) => dispatch => {
    firebase.auth().createUserWithEmailAndPassword(email, senha)
        .then(() => {
            const emailB64 = b64.encode(email);

            firebase.database().ref(`/contatos/${emailB64}`)
                .push({ nome })
                .then(() => cadastroUsuarioSucesso(dispatch))
                .catch(error => cadastroUsuarioErro(error, dispatch));
        })
        .catch(error => cadastroUsuarioErro(error, dispatch));
};

const cadastroUsuarioSucesso = (dispatch) => {
    dispatch({ type: 'cadastro_usuario_sucesso' });

    Actions.boasVindas();
};

const cadastroUsuarioErro = (error, dispatch) => {
    dispatch({ type: 'cadastro_usuario_erro', payload: error.message });
};

export const autenticarUsuario = ({ email, senha }) => dispatch => {
    firebase.auth().signInWithEmailAndPassword(email, senha)
        .then(() => loginUsuarioSucesso(dispatch))
        .catch(error => loginUsuarioErro(error, dispatch));
};

const loginUsuarioSucesso = (dispatch) => {
    dispatch({ type: 'login_usuario_sucesso' });
};

const loginUsuarioErro = (error, dispatch) => { 
    dispatch({ type: 'login_usuario_erro', payload: error.message });
};
