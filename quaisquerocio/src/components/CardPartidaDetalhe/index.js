import React, { useState } from 'react';
import { 
    View,
    Text,
    StyleSheet
} from 'react-native';

import { Card, Avatar, Button, Input } from 'react-native-elements'

import { wp, hp, resize } from '../../utils/dimensions'
import colors from '../../styles/colors';
import moment, { parseTwoDigitYear } from 'moment';

import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../utils/api';

const CardPartidaDetalhe = ({ partida, isVisitante = false }) => {


    const [load, setLoad] = useState(false);
    const [partidaAtual, setPartidaAtual] = useState(partida);
    const [placarMandante, setPlancarMandante] = useState();
    const [placarVisitante, setPlancarVisitante] = useState();


    const enviarConvite = async () => {
        console.log(partida.id)
        try {
            const userToken = await AsyncStorage.getItem('userToken');
            if (userToken) {
                let config = {
                    headers: {
                        Authorization: `Bearer ${userToken}`,
                    }
                }
                setLoad(true);
                api.put("partida/" + partida.id + "/marcar", {}, config)
                    .then((response) => {
                        console.log('certo')
                        console.log(response.data.data)
                        setPartidaAtual(response.data.data);
                        setLoad(false);
                    }).catch((err) => {
                        console.log('erro')
                        console.log(err)
                        setLoad(false);
                    });  

            }  

        } catch(err) {
            console.log("erro ao pegar token")
          console.log(err)
        }
    }

    const cancelarConvite = async () => {
        console.log(partida.id)
        try {
            const userToken = await AsyncStorage.getItem('userToken');
            if (userToken) {
                let config = {
                    headers: {
                        Authorization: `Bearer ${userToken}`,
                    }
                }
                setLoad(true);
                api.put("partida/" + partida.id + "/marcar/cancelar", {}, config)
                    .then((response) => {
                        console.log('certo')
                        console.log(response.data.data)
                        setPartidaAtual(response.data.data);
                        setLoad(false);
                    }).catch((err) => {
                        console.log('erro')
                        console.log(err)
                        setLoad(false);
                    });  

            }  

        } catch(err) {
            console.log("erro ao pegar token")
          console.log(err)
        }
    }

    const confirmarConvite = async () => {
        console.log(partida.id)
        try {
            const userToken = await AsyncStorage.getItem('userToken');
            if (userToken) {
                let config = {
                    headers: {
                        Authorization: `Bearer ${userToken}`,
                    }
                }
                setLoad(true);
                api.put("partida/" + partida.id + "/confirmar", {}, config)
                    .then((response) => {
                        console.log('certo')
                        console.log(response.data.data)
                        setPartidaAtual(response.data.data);
                        setLoad(false);
                    }).catch((err) => {
                        console.log('erro')
                        console.log(err)
                        setLoad(false);
                    });  

            }  

        } catch(err) {
            console.log("erro ao pegar token")
          console.log(err)
        }   
    }

    const placar = async () => {
        console.log(partida.id)
        try {
            const userToken = await AsyncStorage.getItem('userToken');
            if (userToken) {
                let config = {
                    headers: {
                        Authorization: `Bearer ${userToken}`,
                    }
                }
                setLoad(true);
                api.put("partida/" + partida.id + "/placar", {mandante: placarMandante, visitante: placarVisitante}, config)
                    .then((response) => {
                        console.log('certo')
                        console.log(response.data.data)
                        setPartidaAtual(response.data.data);
                        setLoad(false);
                    }).catch((err) => {
                        console.log('erro')
                        console.log(err)
                        setLoad(false);
                    });  

            }  

        } catch(err) {
            console.log("erro ao pegar token")
          console.log(err)
        }
    }

    const cancelar = async () => {
        console.log(partida.id)
        try {
            const userToken = await AsyncStorage.getItem('userToken');
            if (userToken) {
                let config = {
                    headers: {
                        Authorization: `Bearer ${userToken}`,
                    }
                }
                setLoad(true);
                api.put("partida/" + partida.id + "/cancelar", {}, config)
                    .then((response) => {
                        console.log('certo')
                        console.log(response.data.data)
                        setPartidaAtual(response.data.data);
                        setLoad(false);
                    }).catch((err) => {
                        console.log('erro')
                        console.log(err)
                        setLoad(false);
                    });  

            }  

        } catch(err) {
            console.log("erro ao pegar token")
          console.log(err)
        }
    }

    const confirmarPlacar = async () => {
        console.log(partida.id)
        try {
            const userToken = await AsyncStorage.getItem('userToken');
            if (userToken) {
                let config = {
                    headers: {
                        Authorization: `Bearer ${userToken}`,
                    }
                }
                setLoad(true);
                api.put("partida/" + partida.id + "/placar/confirmar", {}, config)
                    .then((response) => {
                        console.log('certo')
                        console.log(response.data.data)
                        setPartidaAtual(response.data.data);
                        setLoad(false);
                    }).catch((err) => {
                        console.log('erro')
                        console.log(err)
                        setLoad(false);
                    });  

            }  

        } catch(err) {
            console.log("erro ao pegar token")
          console.log(err)
        }
    }


    return (
        <Card containerStyle={{borderRadius: resize(7)}}>
            <View style={styles.container}>
                <View style={styles.content}>
                    <Avatar 
                        rounded
                        size="large"
                        source={{
                            uri: partidaAtual.mandante?.escudoByteArray ? `data:${partidaAtual.mandante?.tipoByteArray};base64,` + partidaAtual.mandante?.escudoByteArray : null
                        }}
                    />
                    <Text numberOfLines={3} style={styles.contentTeam}>{partidaAtual.mandante.nome}</Text>
                </View>
                <View style={styles.scoreContent}>
                    <View style={styles.score}>
                        <Text style={styles.scoreResult}>{partidaAtual.placarEquipeMandante}</Text>
                        <Text style={styles.scoreX}>x</Text>
                        <Text style={styles.scoreResult}>{partidaAtual.placarEquipeVisitante}</Text>
                    </View>
                </View>
                <View style={styles.content}>
                    <Avatar 
                        rounded
                        size="large"
                        source={{
                            uri: partidaAtual.visitante?.escudoByteArray ? `data:${partidaAtual.visitante?.tipoByteArray};base64,` + partidaAtual.visitante?.escudoByteArray : null,
                        }}
                    />
                    <Text numberOfLines={3}  style={styles.contentTeam}>{partidaAtual.visitante?.nome}</Text>
                </View>
            </View>
            <View style={styles.detailContainer}>
                <View style={styles.detailItem}>
                    <Text style={{fontWeight: 'bold'}}>Data: </Text>
                    <Text>{moment(partidaAtual.dataPartida).format("DD/MM/YYYY HH:mm")}</Text>
                </View>
                <View style={styles.detailItem}>
                    <Text style={{fontWeight: 'bold'}}>Local: </Text>
                    <Text>{partidaAtual.localPartida.nome}</Text>
                </View>
                <View style={styles.detailItem}>
                    <Text style={{fontWeight: 'bold'}}>Endereço: </Text>
                    <Text numberOfLines={3}>{partidaAtual.localPartida.rua} {partidaAtual.localPartida.numero} {partidaAtual.localPartida.complemento} {partidaAtual.localPartida.bairro} {partidaAtual.localPartida.cep} {partidaAtual.localPartida.cidade} {partidaAtual.localPartida.estado}</Text>
                </View>
               
                <View style={styles.detailItem}>
                    <Text style={{fontWeight: 'bold'}}>Responsável: </Text>
                    <Text numberOfLines={2}>{partidaAtual.mandante.responsavel}</Text>
                </View>
                <View style={styles.detailItem}>
                    <Text style={{fontWeight: 'bold'}}>Telefone: </Text>
                    <Text>{partidaAtual.mandante.telefone}</Text>
                </View>
                <View style={styles.detailItem}>
                    <Text style={{fontWeight: 'bold'}}>Status: </Text>
                    <Text>{partidaAtual.status}</Text>
                </View>
                <View style={{alignItems: 'center', paddingTop: resize(50)}}>

                    {isVisitante && partidaAtual.status === 'CRIADA' &&
                        <Button
                            title="ENVIAR CONVITE"
                            containerStyle={{width: '70%'}}
                            buttonStyle={{backgroundColor: colors.primary}}
                            titleStyle={{color: colors.secundary}}
                            onPress={enviarConvite}
                            disabled={load}
                        />
                    }
                    {isVisitante && partidaAtual.status === 'AGUARDANDO_CONFIRMACAO' &&
                        <Button
                            title="CANCELAR CONVITE"
                            containerStyle={{width: '70%'}}
                            buttonStyle={{backgroundColor: colors.primary}}
                            titleStyle={{color: colors.secundary}}
                            onPress={cancelarConvite}
                            disabled={load}
                            
                        />
                    }
                    {isVisitante && partidaAtual.status === 'REALIZADA' &&
                        <Button
                            title="CONFIRMAR PLACAR"
                            containerStyle={{width: '70%'}}
                            buttonStyle={{backgroundColor: colors.primary}}
                            titleStyle={{color: colors.secundary}}
                            onPress={confirmarPlacar}
                            disabled={load}
                        />
                    }


                    {!isVisitante && partidaAtual.status === 'CRIADA' &&
                        <Button
                            title="CANCELAR"
                            containerStyle={{width: '70%'}}
                            buttonStyle={{backgroundColor: colors.primary}}
                            titleStyle={{color: colors.secundary}}
                            onPress={cancelar}
                            disabled={load}
                        />
                    }
                    {!isVisitante && partidaAtual.status === 'AGUARDANDO_CONFIRMACAO' &&
                       <>
                            <Button
                                title="CONFIRMAR"
                                containerStyle={{width: '70%'}}
                                buttonStyle={{backgroundColor: colors.primary}}
                                titleStyle={{color: colors.secundary}}
                                onPress={confirmarConvite}
                                disabled={load}
                            />
                            <View style={{paddingTop: resize(30)}}>

                                <Button
                                    title="CANCELAR CONVITE"
                                    containerStyle={{width: '70%'}}
                                    buttonStyle={{backgroundColor: colors.primary}}
                                    titleStyle={{color: colors.secundary}}
                                    onPress={cancelarConvite}
                                    disabled={load}
                                />
                            </View>

                        </>
                    }

                    {!isVisitante && (partidaAtual.status === 'CONFIRMADA' || partidaAtual.status === 'REALIZADA')  &&
                       <>
                            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: wp(100)}}>
                                <Input 
                                    keyboardType='numeric'
                                    label='Mandante'
                                    inputContainerStyle={{borderBottomColor: colors.secundary}}
                                    labelStyle={{color: colors.primary}}
                                    onChangeText={(value) => setPlancarMandante(value)} />
                                <Text>X</Text>
                                <Input 
                                    keyboardType='numeric'
                                    label='Visitante'
                                    inputContainerStyle={{borderBottomColor: colors.secundary}}
                                    labelStyle={{color: colors.primary}}
                                    onChangeText={(value) => setPlancarVisitante(value)} />
                            </View>
                            <Button
                                title="ADCIONAR PLACAR"
                                containerStyle={{width: '70%'}}
                                buttonStyle={{backgroundColor: colors.primary}}
                                titleStyle={{color: colors.secundary}}
                                onPress={placar}
                                disabled={load}
                            />
                        </>
                    }

                </View>
            </View>
        </Card>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        height: hp(100),
    },
    content: {
        flex: 1,
        alignItems: 'center',
    },
    contentTeam: {
        width: '90%',
        textAlignVertical: "center",
        textAlign: "center",
        fontSize: resize(15)
    },
    scoreContent: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
    }, 
    score: {
        flexDirection: 'row'
    },
    scoreResult: {
        fontSize: resize(40)
    },
    scoreX: {
        fontSize: resize(40)
    },
    detailContainer: {
        flex: 1,
        marginLeft: resize(10),
        marginTop: resize(30)
    },
    detailItem: {
        flexDirection: 'row',
        width: '80%',
        paddingTop: resize(5)
    }
})

export default CardPartidaDetalhe;