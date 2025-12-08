import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';

import "./styles/global.css";

import DrawerNavigator from './src/nav/DrawerNavigator';

export default function App()
{
    const [fontsLoaded] = useFonts({
        'NovaSquare': require('./assets/fonts/NovaSquare-Regular.ttf'),
        'RobotoMono': require('./assets/fonts/RobotoMono-VariableFont_wght.ttf')
    });

    if (!fontsLoaded) return null;
    
    return (
        <NavigationContainer>

            <DrawerNavigator />

            <StatusBar style="auto" />

            <View className='flex flex-row m-2'>

                <Text className='text-left text-gray-400 flex-1'>
                    © 2025 - Alessio Negri
                </Text>

                <Text className='text-right text-gray-400'>
                    v 1.0.0
                </Text>

            </View>

        </NavigationContainer>
    );
}