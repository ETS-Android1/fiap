import React, { useState } from 'react';
import {
    StyleSheet, 
    View,
    ScrollView,
    Alert
} from 'react-native';

import {
    Text, 
    Input,
    Button,
    CheckBox
} from 'react-native-elements';

import colors from '../../styles/colors';
import { resize } from '../../utils/dimensions';

import api from '../../utils/api';

const Register = ({ navigation }) => {

    const [load, setLoad] = useState(false);

    const [nome, setNome] = useState();
    const [sobrenome, setSobrenome] = useState();
    const [equipe, setEquipe] = useState();
    const [email, setEmail] = useState();
    const [senha, setSenha] = useState();
    const [confirmacao, setConfirmacao] = useState();
    const [telefone, setTelefone] = useState();

    const cadastrar = () => {
        setLoad(true);
        if (!nome || !sobrenome || !equipe || !email || !senha || !confirmacao || !telefone) {
            Alert.alert("", "Todos os campos são obrigatórios.")
            setLoad(false);
            return;
        }

        if (senha !== confirmacao) {
            Alert.alert("", "Senhas estão diferentes.")
            setLoad(false);
            return;
        }

        api.post("cadastro", {
            nome : nome,
            sobreNome: sobrenome,
            equipe: equipe,
            email: email,
            telefone: telefone,
            senha: senha

        }).then((response) => {
            setLoad(false);
            Alert.alert("", "Cadastrado com sucesso!");
            navigation.navigate('Login');
        }).catch((err) => {
            console.log(JSON.stringify(err));
            Alert.alert(JSON.stringify(err));
            setLoad(false);
            return;
        })

    }

    return (
        <ScrollView style={{flex: 1}}>

            <View style={styles.container}>
                <View style={styles.header}>
                    <Text h1 h1Style={styles.title}>quaisquer Ócio</Text>
                    <Text h3 h3Style={styles.subTitle}>CADASTRO</Text>
                </View>
                <View style={styles.form}>
                    <Input 
                        label='Nome'
                        inputContainerStyle={{borderBottomColor: colors.secundary}}
                        labelStyle={{color: colors.primary}}
                        onChangeText={(value) => setNome(value)}
                    />
                    <Input 
                        label='Sobrenome'
                        inputContainerStyle={{borderBottomColor: colors.secundary}}
                        labelStyle={{color: colors.primary}}
                        onChangeText={(value) => setSobrenome(value)}
                    />
                    <Input 
                        label='Nome da Equipe'
                        inputContainerStyle={{borderBottomColor: colors.secundary}}
                        labelStyle={{color: colors.primary}}
                        onChangeText={(value) => setEquipe(value)}
                    />
                    {/*<View style={{flexDirection: 'row'}}> 
                        <CheckBox
                            title='Masculino'
                            checked={true}
                        />
                         <CheckBox
                            title='Feminino'
                            checked={false}
                        />

                    </View>*/}
                    <Input 
                        label='E-mail'
                        inputContainerStyle={{borderBottomColor: colors.secundary}}
                        labelStyle={{color: colors.primary}}
                        onChangeText={(value) => setEmail(value)}
                    />
                    <Input 
                        label='Telefone'
                        inputContainerStyle={{borderBottomColor: colors.secundary}}
                        labelStyle={{color: colors.primary}}
                        onChangeText={(value) => setTelefone(value)}
                    />
                    <Input 
                        label='Senha'
                        inputContainerStyle={{borderBottomColor: colors.secundary}}
                        labelStyle={{color: colors.primary}}
                        onChangeText={(value) => setSenha(value)}
                    />
                    <Input 
                        label='Confirmar senha'
                        inputContainerStyle={{borderBottomColor: colors.secundary}}
                        labelStyle={{color: colors.primary}}
                        onChangeText={(value) => setConfirmacao(value)}
                    />
                    <Button
                        title="CADASTRAR"
                        containerStyle={{width: '70%'}}
                        buttonStyle={{backgroundColor: colors.primary}}
                        titleStyle={{color: colors.secundary}}
                        onPress={cadastrar}
                        disabled={load}
                    />

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
  },
  form: {
    width: '100%',
    alignItems: 'center',
    padding: resize(10),
  },
  title: {
    color: colors.secundary,
  },
  subTitle: {
    color: colors.primary,
  },
});

export default Register;
