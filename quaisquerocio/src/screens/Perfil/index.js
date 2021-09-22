import React, { useState, useEffect } from 'react';
import {
    Text,
    StyleSheet,
    View,
    TouchableOpacity
} from 'react-native'

import { Avatar, Header, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { resize } from '../../utils/dimensions';
import colors from '../../styles/colors';

import AsyncStorage from '@react-native-async-storage/async-storage';

import ImageCropPicker from 'react-native-image-crop-picker';
import api from '../../utils/api';

const Perfil = ({ navigation }) => {

    const getEquipe = async () => {
        try {
            const userToken = await AsyncStorage.getItem('userToken');
            if (userToken) {
                let config = {
                    headers: {
                        Authorization: `Bearer ${userToken}`,
                    }
                }
                
                api.get('perfil', config)
                    .then((response) => {
                        console.log('perfil')
                        const equipe = response.data.data;
                        setTipoImagem(equipe.tipoByteArray);
                        setImagem(equipe.escudoByteArray);
                    }).catch((err) => {
                        console.log('erro')
                        console.log(err)
                    });
            }  

        } catch(err) {
            console.log("erro ao pegar token")
          console.log(err)
        }
    }

    useEffect(() => {
        console.log('entrou useeffect perfi')
        getEquipe();
        
    }, []);


    const [tipoImagem, setTipoImagem] = useState('');
    const [imagem, setImagem] = useState('');

    const launchImageLibrary = () => {
        ImageCropPicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
        }).then(image => {
            upload(image)
        });

    }

    const upload = async (imageFile) => {
        
        try {
            
            const userToken = await AsyncStorage.getItem('userToken');
            const config = {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                    "Content-Type": "multipart/form-data"
                }
            };

            let formData = new FormData();
            formData.append("image", {
                uri: imageFile.path, 
                name: "escudo",
                type: imageFile.mime
            });

            //console.log(JSON.stringify(dataFile));
            api.post('perfil/upload', formData, config)
                .then((response) => {
                    const escudo = response.data.data;
                    setTipoImagem(escudo.tipoByteArray);
                    setImagem(escudo.escudoByteArray);
                }).catch((err) => {
                    console.log(err)
                })

        } catch(err) {
            console.log("erro ao pegar token")
                console.log(err)
        }
    }

    

    const removeToken = async () => {
        try {
          await AsyncStorage.removeItem('userToken');
        } catch (error) {
          console.log(error)
        }
      };

    return (
        <View style={styles.container}>
            <Header 
                leftComponent={{ 
                    icon: 'keyboard-arrow-left', 
                    color: colors.secundary, 
                    iconStyle: { color: colors.secundary },
                    onPress: () => navigation.goBack(null)
                }}
                backgroundColor={colors.primary} 
                centerComponent={{text: 'PERFIL', 
                style: {color: colors.secundary}}}
            />
            <View style={styles.content}>
                <Avatar
                    source={{
                        uri: imagem ? `data:${tipoImagem};base64,` + imagem : null,
                    }}
                    size="xlarge"
                    rounded
                    title="Escudo"
                    activeOpacity={0.7}
                >
                    <Avatar.Accessory 
                        name="pencil"
                        type="font-awesome"
                        size={resize(35)}
                        onPress={launchImageLibrary}
                    />
                </Avatar>
                <View style={{marginTop: resize(10), alignItems: 'center'}}>
                    <Text style={styles.title}>Pinga na Cuca FC</Text>
                    <Button
                        title="EDITAR"
                        containerStyle={{width: '70%'}}
                        buttonStyle={{backgroundColor: colors.primary}}
                        titleStyle={{color: colors.secundary}}
                    />
                </View>
                <View style={{marginTop: resize(70), width: '90%'}}>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('Locais');
                        }}>
                        <View style={{flexDirection: 'row', width: '100%', alignItems: 'center'}}>
                            <Icon name='edit' size={resize(20)}/>
                            <Text style={{marginStart: resize(15), fontSize: resize(20)}}>MEUS LOCAIS DE PARTIDA</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            removeToken();
                            navigation.navigate('Login');
                        }}>
                        <View style={{flexDirection: 'row', width: '100%', alignItems: 'center', marginTop: resize(15)}}>
                            <Icon name='sign-out' size={resize(20)}/>
                            <Text style={{marginStart: resize(15), fontSize: resize(20)}}>SAIR</Text>
                        </View>
                    </TouchableOpacity>

                </View>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
    },
    content: {
        flex: 1,
        marginTop: resize(70),
        alignItems: 'center',
    },
    title: {
        fontSize: resize(25),
        fontWeight: 'bold'
    }
})

export default Perfil;