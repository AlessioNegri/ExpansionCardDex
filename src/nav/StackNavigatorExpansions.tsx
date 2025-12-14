import { Image, Text, TouchableOpacity, View } from 'react-native';
import { RouteProp } from '@react-navigation/native'
import { createNativeStackNavigator, NativeStackNavigationProp } from "@react-navigation/native-stack";
import { LinearGradient } from "expo-linear-gradient";

import ScreenExpansions from "../screens/ScreenExpansions";
import ScreenExpansion from "../screens/ScreenExpansion";
import ScreenCards from '../screens/ScreenCards';

import { StackParamExpansions } from '../interfaces/route-params';

type RouteScreenExpansions  = RouteProp<StackParamExpansions, "ScreenExpansions">;
type RouteScreenExpansion   = RouteProp<StackParamExpansions, "ScreenExpansion">;
type RouteScreenCards       = RouteProp<StackParamExpansions, "ScreenCards">;

const Stack = createNativeStackNavigator<StackParamExpansions>();

export default function StackNavigatorExpansions()
{
    return (
        <Stack.Navigator initialRouteName="ScreenExpansions">
            
            <Stack.Screen
                name="ScreenExpansions"
                component={ScreenExpansions}
                options=
                {
                    ({ route } : { route : RouteScreenExpansions }) => (
                    {
                        headerShown: false
                    })
                }
            />

            <Stack.Screen
                name="ScreenExpansion"
                component={ScreenExpansion}
                options=
                {
                    ({ route, navigation }: { route: RouteScreenExpansion, navigation: NativeStackNavigationProp<StackParamExpansions, "ScreenExpansion", undefined> }) => (
                    {
                        header: () => (
                            <LinearGradient
                                colors={[route.params.data.fromColor + '50', route.params.data.toColor + '50']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                className='flex justify-center p-4'
                            >
                            <View className='flex-row justify-start items-center gap-4 px-4'>
                                <TouchableOpacity onPress={() => navigation.goBack()}>

                                    <Image
                                        source={require('../../assets/icons/solar--map-arrow-left-bold-duotone.png')}
                                        style={{ width: 32, height: 32 }}
                                        resizeMode='contain'
                                        tintColor={'#1e3a8a'}
                                    />
                                
                                </TouchableOpacity>
                                <Text className='text-blue-900 font-bold text-3xl'>{String(route.params.data.name).split(' - ')[1] ?? String(route.params.data.name)}</Text>
                            </View>
                            </LinearGradient>
                        )
                    })
                }
            />

            <Stack.Screen
                name="ScreenCards"
                component={ScreenCards}
                options=
                {
                    ({ route, navigation } : { route : RouteScreenCards, navigation: NativeStackNavigationProp<StackParamExpansions, "ScreenCards", undefined> }) => (
                    {
                        header: () => (
                            <LinearGradient
                                colors={[route.params.data.fromColor + '50', route.params.data.toColor + '50']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                className='flex justify-center p-4'
                            >
                            <View className='flex-row justify-start items-center gap-4 px-4'>
                                <TouchableOpacity onPress={() => navigation.goBack()}>

                                    <Image
                                        source={require('../../assets/icons/solar--map-arrow-left-bold-duotone.png')}
                                        style={{ width: 32, height: 32 }}
                                        resizeMode='contain'
                                        tintColor={'#1e3a8a'}
                                    />
                                
                                </TouchableOpacity>
                                <Text className='text-blue-900 font-bold text-3xl'>Carte</Text>
                            </View>
                            </LinearGradient>
                        )
                    })
                }
            />

        </Stack.Navigator>
    );
}