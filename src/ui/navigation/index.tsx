import {NavigationContainer} from '@react-navigation/native';
import * as React from 'react';

import NotFoundScreen from '../screens/NotFoundScreen';
import BottomTabNavigator from './BottomTabNavigator';
import {Provider as PaperProvider} from "react-native-paper";
import {createStackNavigator} from "@react-navigation/stack";
import useColorScheme from "../hooks/useColorScheme";
import {CombinedDarkTheme, CombinedDefaultTheme} from "../constants/Colors";

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal

const Stack = createStackNavigator();

export default function RootNavigator() {
    const colorScheme = useColorScheme();

    return (
        // Context is wired into the local state of our main component, so that its values could be propagated throughout the entire application
        <PaperProvider theme={colorScheme === "dark" ? CombinedDarkTheme : CombinedDefaultTheme}>
            <NavigationContainer theme={colorScheme === "dark" ? CombinedDarkTheme : CombinedDefaultTheme}>
                <Stack.Navigator initialRouteName="Alarm Calendar Link">
                    <Stack.Screen name="Alarm Calendar Link" component={BottomTabNavigator}/>
                    <Stack.Screen name="NotFound" component={NotFoundScreen} options={{title: 'Oops!'}}/>
                </Stack.Navigator>
            </NavigationContainer>
        </PaperProvider>
    );
}
