import { createDrawerNavigator } from '@react-navigation/drawer';

import StackNavigatorExpansions from './StackNavigatorExpansions';
import ScreenAbout from '../screens/ScreenAbout';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator()
{
    return (
        <Drawer.Navigator initialRouteName='StackNavigatorExpansions'>
            
            <Drawer.Screen
                name='StackNavigatorExpansions'
                component={StackNavigatorExpansions}
                options=
                {
                    {
                        title: 'Espansioni'
                    }
                }
            />

            <Drawer.Screen
                name='ScreenAbout'
                component={ScreenAbout}
                options=
                {
                    {
                        title: 'Informazioni'
                    }
                }
            />

        </Drawer.Navigator>
    );
}