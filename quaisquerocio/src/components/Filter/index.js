import React, { useState } from 'react';
import { 
    StyleSheet,
    View,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import { Input, Text, Header, Button } from 'react-native-elements';

import { InputDate } from '../../components';



import { wp, hp, resize } from '../../utils/dimensions';
import colors from '../../styles/colors';


const range = {
    dateInitial: new Date('2019-06-01'),
    dateEnding: new Date('2030-06-01')
}

const Filter = ({ isHeader = true, setFilter = () => {}, onSubmit = () => {}, clear = () => {}}) => {

    const [dateRange, setDateRange] = useState(range);

    const [init, setInit] = useState('');
    const [end, setEnd] = useState('');

    return (
        <View style={{flex:1, backgroundColor: 'white'}}>
            {isHeader && 
                <Header 
                    backgroundColor={colors.primary} 
                    centerComponent={{text: 'FILTRO', 
                    style: {color: colors.secundary}}}
                />
            }
            <View style={styles.container} >
                <InputDate 
                    label="De"
                    date={dateRange.dateInitial}
                    setDate={(date) => setDateRange({...dateRange, dateInitial: date})}
                    setValue={(value) => {
                        console.log(value)
                        setInit(value);
                        setFilter({
                            init: value,
                            end: end
                        });
                    }}
                    value={init}
                />
                 <InputDate 
                    label="Até"
                    date={dateRange.dateEnding}
                    setDate={(date) => setDateRange({...dateRange, dateEnding: date})}
                    setValue={(value) => {
                        setEnd(value);
                        setFilter({
                            init: init,
                            end: value
                        });
                    }}
                    value={end}
                />
                <View style={{flexDirection: 'row', width: '100%', justifyContent: 'center'}}>
                    <Button
                        containerStyle={{width: resize(100)}}
                        title="Limpar"
                        type="clear"
                        onPress={() => {
                            setInit('');
                            setEnd('');
                            setFilter({
                                init: '',
                                end: ''
                            });
                            clear();
                        }}
                        
                    />
                    <Button
                        containerStyle={{width: resize(100)}}
                        title="Filtrar"
                        type="clear"
                        onPress={onSubmit}
                    />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        paddingTop: resize(20)
    },
});

export default Filter;