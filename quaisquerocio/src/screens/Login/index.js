import React, { useState, useEffect } from 'react';
import {
    StyleSheet, 
    View,
    ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
    Text, 
    Input,
    Button,
    CheckBox
} from 'react-native-elements';

import colors from '../../styles/colors';
import { resize } from '../../utils/dimensions';
import Splash from '../Splash'

import api from '../../utils/api';

const Login = ({ navigation }) => {

    useEffect(() => {
        setIsLoading(true);
        const getToken = async () => {
            const userToken = await AsyncStorage.getItem('userToken');
            if (userToken) {
                navigation.navigate('Partidas');
                setIsLoading(false);
            }
        }

        getToken();
        
    }, []);

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const logar = () => {
        if (!email || !senha) {
            console.warn("Email e senha necessários");
            return;
        }
        console.log("aqui")
        setIsLoading(false);
        api.post(`login`, {
            email: email,
            senha: senha
        }).then((response) => {
            console.log("aqui")
            const token = response.data.data.token;
            console.log(token);
            setToken(token);
            navigation.navigate('Partidas');
            setIsLoading(false);
        }).catch((err) => {
            console.warn(err)
            setIsLoading(false);
        });
    }

    const setToken = async (value) => {
        try {
          await AsyncStorage.setItem('userToken', value);
          console.log("token adicionado")
        } catch (e) {
          console.log('erro ao setar token')
        }
    }

    /*if (isLoading) {
        return <Splash />
    }*/

    return (
        <ScrollView style={{flex: 1}}>

            <View style={styles.container}>
                <View style={styles.header}>
                    <Text h1 h1Style={styles.title}>quaisquer Ócio</Text>
                    <Text h3 h3Style={styles.subTitle}>Login</Text>
                </View>
                <View style={styles.form}>
                    <Input 
                        label='E-mail'
                        inputContainerStyle={{borderBottomColor: colors.secundary}}
                        labelStyle={{color: colors.primary}}
                        onChangeText={(value) => setEmail(value)}
                    />
                    <Input 
                        secureTextEntry={true}
                        label='Senha'
                        inputContainerStyle={{borderBottomColor: colors.secundary}}
                        labelStyle={{color: colors.primary}}
                        onChangeText={(value) => setSenha(value)}
                    />
                    <Button
                        title="ENTRAR"
                        containerStyle={{width: '70%'}}
                        buttonStyle={{backgroundColor: colors.primary}}
                        titleStyle={{color: colors.secundary}}
                        onPress={ logar }
                    />

                    <View style={{marginTop: resize(50), width: '100%', alignItems: 'center'}}>
                        <Button
                            title="CADASTRAR"
                            containerStyle={{width: '70%'}}
                            buttonStyle={{backgroundColor: colors.primary}}
                            titleStyle={{color: colors.secundary}}
                            onPress={ () => navigation.navigate('Register') }
                        />
                    </View>

                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: resize(10)
  },
  header: {
    width: '100%',
    alignItems: 'center',
    marginTop: resize(100)
  },
  form: {
    width: '100%',
    alignItems: 'center',
    padding: resize(10),
    marginTop: resize(70)
  },
  title: {
    color: colors.secundary,
  },
  subTitle: {
    color: colors.primary,
  },
});

export default Login;
