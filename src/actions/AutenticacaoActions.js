import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';

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

export const cadastroUsuario = ({ nome, email, senha }) => {
    return dispatch => {
        firebase.auth().createUserWithEmailAndPassword(email, senha)
            .then(usuario => cadastroUsuarioSucesso(dispatch))
            .catch(erro => cadastroUsuarioErro(erro, dispatch));
    };
};

const cadastroUsuarioSucesso = (dispatch) => {
    dispatch({ type: 'cadastro_usuario_sucesso' });

    Actions.boasVindas();
};

const cadastroUsuarioErro = (erro, dispatch) => {
    dispatch({ type: 'cadastro_usuario_erro', payload: erro.message });
};
