import React, { useState } from 'react';
import { 
    View,
    StyleSheet,
    ScrollView,
} from 'react-native';
import { Header } from 'react-native-elements';
import { CardPartidaDetalhe } from '../../components'

import { hp, resize, wp } from '../../utils/dimensions';
import colors from '../../styles/colors';

import AsyncStorage from '@react-native-async-storage/async-storage';

const Partida = ({ navigation, route }) => {

    const { partida, isVisitante } = route.params;
    console.log('isvisitante')
    console.log(isVisitante)

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
                centerComponent={{text: 'PARTIDA', 
                style: {color: colors.secundary}}}
            />
            <ScrollView style={styles.container} contentContainerStyle={{paddingBottom: resize(100)}} >
                <CardPartidaDetalhe partida={partida} isVisitante={isVisitante} />
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})

export default Partida;