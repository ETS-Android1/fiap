import React from 'react';
import {
    StyleSheet, 
    View,
} from 'react-native';

import {
    Text,
} from 'react-native-elements';


const Splash = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text>Loading</Text>
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
  },
});

export default Splash;
