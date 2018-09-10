import React from 'react';
import { ImageBackground, View, Text, Image, Button } from 'react-native';
import { Actions } from 'react-native-router-flux';

const bg = require('../imgs/bg.png');
const logo = require('../imgs/logo.png');

export default props => (
    <ImageBackground style={{ flex: 1 }} source={bg}>
        <View style={{ flex: 1, padding: 15 }}>
            <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 20, color: '#fff' }}>Seja Bem-Vindo</Text>
                <Image source={logo} />
            </View>
            <View style={{ flex: 1 }}>
                <Button title='Fazer Login' onPress={() => Actions.formLogin()} />
            </View>
        </View >
    </ImageBackground>
);
