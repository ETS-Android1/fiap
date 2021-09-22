import React, { useState, useEffect } from 'react';
import { 
    View,
    StyleSheet,
    ScrollView,
    Text as ReactText,
    TouchableOpacity,
    RefreshControl
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Header, Overlay, Text, Input, Button } from 'react-native-elements';
import { FloatingAction } from "react-native-floating-action";
import Icon from 'react-native-vector-icons/FontAwesome';
import DatePicker from 'react-native-date-picker'
import moment from 'moment';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import AsyncStorage from '@react-native-async-storage/async-storage';


import {
    CardPartida
} from '../../components';
import { hp, resize, wp } from '../../utils/dimensions';
import colors from '../../styles/colors';
import api from '../../utils/api';

const Tab = createMaterialTopTabNavigator();



const Partidas = ({ navigation }) => {
    
    const [refreshing, setRefreshing] = useState(false);
    const [equipe, setEquipe] = useState();
    const renderPartidas = (partidas) => {
        return (
            <ScrollView 
                style={styles.container} 
                contentContainerStyle={{paddingBottom: resize(100)}} 
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={getPartidas}
                    />
                }
                >
                {partidas && partidas.map(partida => {
                    return (
                        <TouchableOpacity 
                            key={partida.id}
                            onPress={ () => navigation.navigate('Partida', { partida, isVisitante: (equipe.id === partida.visitante?.id) }) } 
                        >
                            <CardPartida partida={partida}/>
                        </TouchableOpacity>
                    )
                })}
            </ScrollView>
        )
    }

    const getPartidas = async () => {
        try {
            setRefreshing(true);
            const userToken = await AsyncStorage.getItem('userToken');
            setUserToken(userToken);
            if (userToken) {
                let config = {
                    headers: {
                        Authorization: `Bearer ${userToken}`,
                    }
                }
                
                api.get('partida/lista', config)
                    .then((response) => {
                        console.log('certo')
                        const partidas = response.data.data;
                        setProximas(partidas.proximas);
                        setRealizadas(partidas.realizadas);
                        setRefreshing(false)
                    }).catch((err) => {
                        console.log('erro')
                        console.log(err)
                        setRefreshing(false)
                    });
                


                api.get('local', config)
                    .then((response) => {
                        console.log('local')
                        const locais = response.data.data;
                        setLocais(locais);
                    }).catch((err) => {
                        console.log('erro')
                        console.log(err)
                    });

                api.get('perfil', config)
                    .then((response) => {
                        console.log('local')
                        const equipe = response.data.data;
                        setEquipe(equipe);
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


        getPartidas();
        
    }, []);

    const [isOpen, setIsOpen] = useState(false);
    const [isOverlayOpen, setIsOverlayOpen] = useState(false);
    const [selectedLocal, setSelectedLocal] = useState();
    const [date, setDate] = useState(new Date());
    const [openDateModal, setOpenDateModal] = useState(false);
    const [tabIndex, setTabIndex] = useState(0);
    const [proximas, setProximas] = useState([]);
    const [realizadas, setRealizadas] = useState([]);
    const [locais, setLocais] = useState([]);
    const [userToken, setUserToken] = useState();
    const [disabled, setDisabled] = useState(false);

    const toggleOverlay  = () => {
        setIsOverlayOpen(!isOverlayOpen);
    };

    const ListaProximas = () => {
        return renderPartidas(proximas);
    }
    
    const ListaRealizadas= () => {
        return renderPartidas(realizadas);
    }

    return (
         
        <View style={{flex:1}}>
            <Header 
                backgroundColor={colors.primary} 
                centerComponent={{text: 'PARTIDAS', 
                style: {color: colors.secundary}}}
            />
            <Tab.Navigator
                screenOptions={{
                    tabBarIndicatorStyle: {backgroundColor: colors.secundary}
                }}
                initialRouteName="Proximas"
            >
                <Tab.Screen name="Realizadas" component={ListaRealizadas} options={{ tabBarLabel: 'Realizadas' }}/>
                <Tab.Screen name="Proximas" component={ListaProximas} options={{ tabBarLabel: 'Próximas' }}/>
            </Tab.Navigator>
           
            <FloatingAction
                color={colors.secundary}
                floatingIcon={!isOpen ? 
                    <Icon name="plus" size={resize(20)} color={'white'} /> : 
                    <Icon name="times" size={resize(20)} color={'white'}/> 
                }
                actions={[
                    {
                        text: "Procurar Partida",
                        icon: <Icon name="filter" size={resize(20)} color={'white'}/>,
                        name: "bt_filter",
                        position: 1,
                        color: colors.secundary
                    },
                    {
                        text: "Criar Partida",
                        icon: <Icon name="edit" size={resize(20)} color={'white'}/>,
                        name: "bt_new_match",
                        position: 1,
                        color: colors.secundary
                    },
                    {
                        text: "Perfil",
                        icon: <Icon name="user" size={resize(20)} color={'white'} />,
                        name: "bt_perfil",
                        position: 2,
                        color: colors.secundary
                    }
                ]}
                onPressItem={buttonName => {
                    console.log(`selected button: ${buttonName}`);
                    if (buttonName === 'bt_new_match') {
                        setIsOverlayOpen(true);
                    } else if (buttonName === 'bt_filter') {
                        navigation.navigate('PesquisarPartida');
                    } else {
                        navigation.navigate('Perfil');
                    }
                }}
                onOpen={() => setIsOpen(true)}
                onClose={() => setIsOpen(false)}
            />
            <Overlay 
                isVisible={isOverlayOpen} 
                onBackdropPress={toggleOverlay}
                overlayStyle={styles.modal}>
                <Text h4>CRIAR PARTIDA</Text>
                <View style={{flex: 1, width: '100%', alignItems: 'center', justifyContent: 'space-between', paddingVertical: resize(17)}}>
                    <View style={{ width: '95%', borderBottomWidth: 1, overflow: "hidden", padding: 0, backgroundColor: "#FFF", borderBottomColor: colors.secundary }}>
                        <Text style={{fontWeight: 'bold', fontSize: resize(19), paddingLeft: wp(2)}}>Local</Text>
                        <Picker
                            style={{width: '100%'}}
                            selectedValue={selectedLocal}
                            onValueChange={(itemValue, itemIndex) =>
                                setSelectedLocal(itemValue)
                            }>
                            <Picker.Item label="Selecione" value={null} />
                            {locais && locais.map(local => {
                                return <Picker.Item label={local.nome} value={local.id} key={local.id} />
                            })}
                        </Picker>
                    </View>
                    <TouchableOpacity 
                        style={{width: '100%', paddingTop: resize(10)}}
                        onPress={() => setOpenDateModal(true)}>
                        <Input 
                            disabled={true}
                            label='Data da Partida'
                            inputContainerStyle={{borderBottomColor: colors.secundary}}
                            labelStyle={{color: colors.primary}}
                            value={moment(date).format('DD/MM/YYYY HH:mm')}
                        />
                    </TouchableOpacity>
                    <Button
                        title="CRIAR"
                        containerStyle={{width: '55%'}}
                        buttonStyle={{backgroundColor: colors.primary}}
                        titleStyle={{color: colors.secundary}}
                        disabled={disabled}
                        onPress={() => {
                            console.log(date);
                            console.log(selectedLocal);
                            
                            if (!selectedLocal) {
                                console.warn("Selecione um local!");
                            } else {
                                setDisabled(true);
                                const json = {
                                    dataPartida: date,
                                    localPartida: selectedLocal
                                }

                                let config = {
                                    headers: {
                                        Authorization: `Bearer ${userToken}`,
                                    }
                                }

                                api.post(`partida`, json, config)
                                    .then((response) => {
                                        console.log('cadastrou');
                                        setDisabled(false);
                                        setDate(new Date());
                                        setSelectedLocal(undefined);
                                        toggleOverlay();
                                        getPartidas();
                                    }).catch((err) => {
                                        console.warn(err)
                                        setDisabled(false);
                                    });

                            }

                        }}
                    />
                </View>
            </Overlay>
            <DatePicker
                modal
                open={openDateModal}
                date={date}
                onConfirm={(date) => {
                    setOpenDateModal(false)
                    setDate(date)
                }}
                onCancel={() => {
                    setOpenDateModal(false)
                }}
                title="Data e Hora da Partida"
                confirmText={'Confirmar'}
                cancelText={"Cancelar"}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    actionButtonIcon: {
        fontSize: 20,
        color: 'white'
    },
    modal: {
        width: '90%',
        height: hp(250),
        alignItems: 'center',
    }
})

export default Partidas;