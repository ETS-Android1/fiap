import React, { useState } from 'react';
import { 
    StyleSheet,
    View,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import { Input, Text, Overlay, Button } from 'react-native-elements';
import DatePicker from 'react-native-date-picker'
import moment from 'moment'

import { wp, hp, resize } from '../../utils/dimensions';
import colors from '../../styles/colors';

const InputDate = ({value= '', setValue = () => {}, date = new Date(), setDate = () => {},  label = "Data"}) => {

    const [open, setOpen] = useState(false);

    return (
        <>
            <TouchableOpacity 
                style={{width: '100%', paddingTop: resize(10)}}
                onPress={() => setOpen(true)}>
                <Input 
                    disabled={true}
                    label={label}
                    inputContainerStyle={{borderBottomColor: colors.secundary}}
                    labelStyle={{color: colors.primary}}
                    value={value}
                />
            </TouchableOpacity>
            <Overlay 
                isVisible={open} 
                onBackdropPress={() => setOpen(!open)}
                overlayStyle={styles.modal}>
                <View style={{flex: 1, justifyContent: 'space-between', padding: resize(5)}}>
                    <Text style={{fontSize: resize(22), paddingLeft: resize(10)}}>{label}</Text>
                    <DatePicker
                        mode={'date'}
                        date={date} 
                        onDateChange={(newDate) => {
                            setDate(newDate);
                            setValue(moment(newDate).format('DD/MM/YYYY'));
                        }} 
                    />
                    <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                        <Button
                            title="Fechar"
                            type="clear"
                            onPress={() => {
                                setOpen(false);
                            }}
                        />
                    </View>
                </View>

            </Overlay>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        paddingTop: resize(20)
    },
    modal: {
        width: '90%',
        height: hp(250),
        alignItems: 'center',
    }
});

export default InputDate;