import { RouteProp } from '@react-navigation/native'
import { createNativeStackNavigator } from "@react-navigation/native-stack";

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
                    ({ route } : { route : RouteScreenExpansion }) => (
                    {
                        title: String(route.params.data.name).split(' - ')[1] ?? String(route.params.data.name),
                    })
                }
            />

            <Stack.Screen
                name="ScreenCards"
                component={ScreenCards}
                options=
                {
                    ({ route } : { route : RouteScreenCards }) => (
                    {
                        title: 'Carte',
                    })
                }
            />

        </Stack.Navigator>
    );
}