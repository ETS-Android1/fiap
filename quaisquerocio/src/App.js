import React, { useState, useEffect } from 'react';
import { 
    Text, 
    StyleSheet
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Register from './screens/Register';
import Partidas from './screens/Partidas';
import Partida from './screens/Partida';
import Perfil from './screens/Perfil';
import Login from './screens/Login';
import Filter from './components/Filter';
import Splash from './screens/Splash';
import PesquisarPartida from './screens/PesquisarPartida';
import Locais from './screens/Locais';

const Stack = createNativeStackNavigator();

const App = () => {

    const [userToken, setUserToken] = useState();

    return (
        <SafeAreaProvider style={styles.container}>
            <NavigationContainer>
                <Stack.Navigator
                    initialRouteName={userToken == null ? "Login" : "Partidas"}
                    screenOptions={{
                        headerShown: false
                    }}
                >   
                    <Stack.Screen name="Login" component={Login} /> 
                    <Stack.Screen name="Register" component={Register} />
                    <Stack.Screen name="Partidas" component={Partidas} />
                    <Stack.Screen name="Partida" component={Partida} />
                    <Stack.Screen name="Perfil" component={Perfil} />
                    <Stack.Screen name="Filter" component={Filter} />
                    <Stack.Screen name="PesquisarPartida" component={PesquisarPartida} />
                    <Stack.Screen name="Locais" component={Locais} />
                </Stack.Navigator>
            </NavigationContainer>
        </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
    }
});

export default App;