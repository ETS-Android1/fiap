import React, { useState, useEffect } from 'react';
import { 
    View,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Alert,
    FlatList
} from 'react-native';
import { Header, Button, Overlay, Text, Input, Card, ListItem } from 'react-native-elements';
import { CardPartidaDetalhe } from '../../components'

import { hp, resize, wp } from '../../utils/dimensions';
import colors from '../../styles/colors';

import AsyncStorage from '@react-native-async-storage/async-storage';

import api from '../../utils/api';

const Locais = ({ navigation, route }) => {

    const [visible, setVisible] = useState(false);
    const toggleOverlay = () => {
        setVisible(!visible);
    };
    const [load, setLoad] = useState(false);
    const [locais, setLocais] = useState([]);
    const [nome, setNome] = useState();
    const [rua, setRua] = useState();
    const [numero, setNumero] = useState();
    const [complemento, setComlemento] = useState();
    const [cep, setCep] = useState();
    const [bairro, setBairro] = useState();

    useEffect(() => {

        getLocais();

        
    }, []);

    const getLocais = async () => {

        try {
            const userToken = await AsyncStorage.getItem('userToken');
            if (userToken) {
                let config = {
                    headers: {
                        Authorization: `Bearer ${userToken}`,
                    }
                }

                api.get("local", config).then((response) => {
                   console.log(response.data)
                   setLocais(response.data.data)
                }).catch((err) => {
                    console.log(JSON.stringify(err));
                    return;
                });
            }

        } catch(err) {
            console.log("erro ao pegar token")
             console.log(err)
        }
        
    }

    const criar = async () => {
        setLoad(true);
        if (!nome || !rua || !numero || !cep || !bairro) {
            Alert.alert("", "Todos os campos são obrigatórios.");
            setLoad(false);
            return;
        }

        try {
            const userToken = await AsyncStorage.getItem('userToken');
            if (userToken) {
                let config = {
                    headers: {
                        Authorization: `Bearer ${userToken}`,
                    }
                }

                api.post("local", {
                    nome : nome,
                    rua: rua,
                    numero: numero,
                    complemento: complemento,
                    cep: cep,
                    bairro: bairro
        
                }, config).then((response) => {
                    setLoad(false);
                    setNome();
                    setRua();
                    setNumero();
                    setComlemento();
                    setCep();
                    setBairro();
                    toggleOverlay();
                    Alert.alert("", "Cadastrado com sucesso!");
                    getLocais();
                }).catch((err) => {
                    console.log(JSON.stringify(err));
                    setLoad(false);
                    return;
                });
            } else {
                setLoad(false);
            }

        } catch(err) {
            console.log("erro ao pegar token")
             console.log(err)
        }
        
    }

    const renderLocal = ({ item }) => {
        return (
            <Card key={item.id}>
                <Text>{item.nome}</Text>
            </Card>
        )
    }

    return (
         
        <View style={{flex:1, backgroundColor: 'white'}}>
            <Header 
                leftComponent={{ 
                    icon: 'keyboard-arrow-left', 
                    color: colors.secundary, 
                    iconStyle: { color: colors.secundary },
                    onPress: () => navigation.goBack(null)
                }}
                backgroundColor={colors.primary} 
                centerComponent={{text: 'LOCAIS', 
                style: {color: colors.secundary}}}
                rightComponent={
                    <TouchableOpacity 
                        onPress={toggleOverlay}
                        >
                        <Text style={{color: colors.secundary}}>Novo</Text>
                    </TouchableOpacity>
                }
            />

            <View style={{flex: 1}}>
                <FlatList 
                    data={locais}
                    renderItem={renderLocal}
                    keyExtractor={item => `${item.id}`}
                    contentContainerStyle={{paddingBottom: 10}}
                    refreshing={load}
                    onRefresh={() => getLocais()}
                />
            </View>
            <Overlay 
                isVisible={visible} 
                onBackdropPress={toggleOverlay}
                overlayStyle={styles.modal}>
                <Text h4>CRIAR LOCAL</Text>
                <ScrollView style={{width: '100%', paddingTop: resize(15)}} contentContainerStyle={{paddingBottom: resize(15), alignItems: 'center'}}>
                    <Input 
                        label='Nome'
                        inputContainerStyle={{borderBottomColor: colors.secundary}}
                        labelStyle={{color: colors.primary}}
                        onChangeText={(value) => setNome(value)}
                        />
                    <Input 
                        label='Endereço'
                        inputContainerStyle={{borderBottomColor: colors.secundary}}
                        labelStyle={{color: colors.primary}}
                        onChangeText={(value) => setRua(value)}
                        />
                    <Input 
                        label='Numero'
                        inputContainerStyle={{borderBottomColor: colors.secundary}}
                        labelStyle={{color: colors.primary}}
                        onChangeText={(value) => setNumero(value)}
                        />
                    <Input 
                        label='Complemento'
                        inputContainerStyle={{borderBottomColor: colors.secundary}}
                        labelStyle={{color: colors.primary}}
                        onChangeText={(value) => setComlemento(value)}
                        />
                    <Input 
                        label='CEP'
                        inputContainerStyle={{borderBottomColor: colors.secundary}}
                        labelStyle={{color: colors.primary}}
                        onChangeText={(value) => setCep(value)}
                        />
                    <Input 
                        label='Bairro'
                        inputContainerStyle={{borderBottomColor: colors.secundary}}
                        labelStyle={{color: colors.primary}}
                        onChangeText={(value) => setBairro(value)}
                        />
                     <Button
                        title="CRIAR"
                        containerStyle={{width: '55%'}}
                        buttonStyle={{backgroundColor: colors.primary}}
                        titleStyle={{color: colors.secundary}}
                        disabled={load}
                        onPress={criar}
                        />
                </ScrollView>
            </Overlay>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    modal: {
        width: '90%',
        height: hp(500),
        alignItems: 'center',
    }
})

export default Locais;