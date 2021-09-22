import React, { useState, useEffect } from 'react';
import { 
    View,
    StyleSheet,
    ScrollView,
    Text,
    RefreshControl,
    TouchableOpacity,
    FlatList
} from 'react-native';
import { Header } from 'react-native-elements';

import { Filter } from '../../components'

import { hp, resize, wp } from '../../utils/dimensions';
import colors from '../../styles/colors';
import {
    CardPartida
} from '../../components';

import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../utils/api';

const PesquisarPartida = ({ navigation }) => {

    const [filter, setFilter] = useState({init: '', end: ''});
    const [partidas, setPartidas] = useState([]);
    const [refreshing, setRefreshing] = useState(true);

    useEffect(() => {

        getPartidas();
        
    }, []);



    const renderPartida = ({ item }) => {
        return (
            <TouchableOpacity 
                key={item.id}
                onPress={ () => navigation.navigate('Partida', { partida: item, isVisitante:true }) } 
            >
                <CardPartida partida={item} />
            </TouchableOpacity>
        )
    }

    const getPartidas = async () => {
        setPartidas([])
        try {
            const userToken = await AsyncStorage.getItem('userToken');
            if (userToken) {
                let config = {
                    headers: {
                        Authorization: `Bearer ${userToken}`,
                    },
                    params: {
                        end: filter.end,
                        init: filter.init
                    }
                }
                setRefreshing(true);
                api.get('partida/lista/mandantes', config)
                    .then((response) => {
                        console.log('certo')
                        const partidas = response.data.data
                        setPartidas(partidas);
                        setRefreshing(false);
                    }).catch((err) => {
                        console.log('erro')
                        console.log(err)
                        setRefreshing(false);
                    });  

            }  

        } catch(err) {
            console.log("erro ao pegar token")
          console.log(err)
        }
    }

    const onSubimitFilter = () => {
        console.log(filter);
        getPartidas();
    }

    const clearFilter = () => {

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
                centerComponent={{text: 'PESQUISAR PARTIDA', 
                style: {color: colors.secundary}}}
            />
            <View style={{flex: 1}}>
                <View style={{height: hp(250)}}>
                    <Filter isHeader={false} setFilter={setFilter} onSubmit={onSubimitFilter} clear={clearFilter}/>
                </View>
                <View style={{flex: 1}}>
                    <FlatList 
                        data={partidas}
                        renderItem={renderPartida}
                        keyExtractor={item => `${item.id}`}
                        contentContainerStyle={{paddingBottom: 10}}
                        refreshing={refreshing}
                        onRefresh={() => onSubimitFilter()}
                    />
                </View>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})

export default PesquisarPartida;