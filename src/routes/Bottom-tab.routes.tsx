import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {MaterialCommunityIcons} from '@expo/vector-icons';


import { HomeScreen } from '../screens/HomeScreen';
import { PerfilScreen } from '../screens/PerfilScreen';
import { MapaScreen } from '../screens/MapaScreen';

const {Navigator, Screen} = createBottomTabNavigator()

export function BottomTabsRotues(){

    
    return(
        <Navigator
            screenOptions={{
                    tabBarActiveTintColor: '#40B530',
                    tabBarInactiveTintColor:'#7c36cf',
                    tabBarStyle: { 
                      backgroundColor: '#DAC4FF',
                      borderTopWidth: 1,
                      borderTopColor: '#cdced7',
                      height: 60,
                      paddingTop: 5,
                    },
                    tabBarLabelStyle: {
                      fontSize: 16,
                      fontWeight: '600',
                      paddingBottom: 10,
                    }
                  }}
        >
            <Screen
                name='home'
                component={HomeScreen}
                options={{
                    headerShown: false,
                    tabBarIcon:({color,size})=>(
                        <MaterialCommunityIcons
                            name='home'
                            color={color}
                            size={size}
                        />
                    )
                }}
            />

            <Screen
                name='mapa'
                component={MapaScreen}
                options={{
                    headerShown: false,
                    tabBarIcon:({color,size})=>(
                        <MaterialCommunityIcons
                            name='map-outline'
                            color={color}
                            size={size}
                        />
                    )
                }}
            />

            <Screen
                name='Perfil'
                component={PerfilScreen}
                options={{
                    headerShown: false,
                    tabBarIcon:({color,size})=>(
                        <MaterialCommunityIcons
                            name='account'
                            color={color}
                            size={size}
                        />
                    )
                }}
            />

        </Navigator>
    )
}