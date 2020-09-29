import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import useCachedResources from './src/ui/hooks/useCachedResources';
import RootNavigator from './src/ui/navigation';
import {Provider} from "react-redux";
import {store} from "./src/store/store";


export default function App() {
    const isLoadingComplete = useCachedResources();

    if (!isLoadingComplete) {
        return null;
    } else {
        return (
            <Provider store={store}>
                <SafeAreaProvider>
                    <RootNavigator/>
                    <StatusBar hidden={true}/>
                </SafeAreaProvider>
            </Provider>
        );
    }
}
