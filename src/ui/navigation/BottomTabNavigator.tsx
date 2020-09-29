import "react-native-gesture-handler"
import {Ionicons} from '@expo/vector-icons';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import * as React from 'react';

import useColorScheme from '../hooks/useColorScheme';
import Calendar from '../screens/Calendar';
import Settings from '../screens/Settings';
import {colors} from "../constants/Colors";
import Events from "../screens/Events";
import Debug from "../screens/Debug";

const BottomTab = createMaterialTopTabNavigator();

export default function BottomTabNavigator() {
    const colorScheme = useColorScheme();
    return (
        <BottomTab.Navigator
            initialRouteName="Calendar"
            tabBarPosition={"bottom"}
            style={{backgroundColor: colors[colorScheme].background}}
            tabBarOptions={{activeTintColor: colors[colorScheme].tint, inactiveTintColor: colors[colorScheme].inactiveTintColor,}}
        >
            <BottomTab.Screen
                name="Calendar"
                component={CalendarNavigator}
                options={{
                    tabBarIcon: ({color}) => <TabBarIcon name="ios-code" color={color}/>,
                }}
            />
            <BottomTab.Screen
                name="Events"
                component={EventsNavigator}
                options={{
                    tabBarIcon: ({color}) => <TabBarIcon name="ios-code" color={color}/>,
                }}
            />

            <BottomTab.Screen
                name="Settings"
                component={SettingsNavigator}
                options={{
                    tabBarIcon: ({color}) => <TabBarIcon name="ios-code" color={color}/>,
                }}
            />

            {__DEV__ && <BottomTab.Screen
				name="Debug"
				component={DebugNavigator}
				options={{
                    tabBarIcon: ({color}) => <TabBarIcon name="ios-code" color={color}/>,
                }}
			/>}
        </BottomTab.Navigator>
    );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: string; color: string }) {
    return <Ionicons size={25} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabOneStack = createStackNavigator();

function CalendarNavigator() {
    return (
        <TabOneStack.Navigator>
            <TabOneStack.Screen
                name="Calendar"
                component={Calendar}
                options={{headerTitle: 'Calendar'}}
            />
        </TabOneStack.Navigator>
    );
}

const TabTwoStack = createStackNavigator();

function SettingsNavigator() {
    return (
        <TabTwoStack.Navigator>
            <TabTwoStack.Screen
                name="Settings"
                component={Settings}
                options={{headerTitle: 'Settings'}}
            />
        </TabTwoStack.Navigator>
    );
}


function EventsNavigator() {
    return (
        <TabTwoStack.Navigator>
            <TabTwoStack.Screen
                name="Events"
                component={Events}
                options={{headerTitle: 'Events'}}
            />
        </TabTwoStack.Navigator>
    );
}


function DebugNavigator() {
    return (
        <TabTwoStack.Navigator>
            <TabTwoStack.Screen
                name="Debug"
                component={Debug}
                options={{headerTitle: 'Debug'}}
            />
        </TabTwoStack.Navigator>
    );
}
