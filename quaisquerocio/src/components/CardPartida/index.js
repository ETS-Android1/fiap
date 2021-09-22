import React from 'react';
import { 
    View,
    Text,
    StyleSheet
} from 'react-native';

import { Card, Avatar } from 'react-native-elements'

import { wp, hp, resize } from '../../utils/dimensions'
import moment from 'moment';

const CardPartida = ({ partida }) => {

    return (
        <Card containerStyle={{borderRadius: resize(7)}}>
            <View style={styles.container}>
                <View style={styles.content}>
                    <Avatar 
                        rounded
                        size="large"
                        source={{
                            uri: partida.mandante?.escudoByteArray ? `data:${partida.mandante?.tipoByteArray};base64,` + partida.mandante?.escudoByteArray : null,
                        }}
                    />
                    <Text numberOfLines={3} style={styles.contentTeam}>{partida.mandante?.nome}</Text>
                </View>
                <View style={styles.scoreContent}>
                    <Text numberOfLines={2}>{partida.localPartida?.nome}</Text>
                    <View style={styles.score}>
                        <Text style={styles.scoreResult}>{partida.placarEquipeMandante}</Text>
                        <Text style={styles.scoreX}>x</Text>
                        <Text style={styles.scoreResult}>{partida.placarEquipeVisitante}</Text>
                    </View>
                    <Text style={{fontSize: resize(12)}}>{moment(partida.dataPartida).format("DD/MM/YYYY HH:mm")}</Text>
                    <Text>{partida.status}</Text>
                </View>
                <View style={styles.content}>
                    <Avatar 
                        rounded
                        size="large"
                        source={{
                            uri: partida.visitante?.escudoByteArray ? `data:${partida.visitante?.tipoByteArray};base64,` + partida.visitante?.escudoByteArray : null,
                        }}
                    />
                    <Text numberOfLines={3}  style={styles.contentTeam}>{partida.visitante?.nome}</Text>
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
    }
})

export default CardPartida;