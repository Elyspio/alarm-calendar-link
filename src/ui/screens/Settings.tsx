import * as React from 'react';
import {StyleSheet} from 'react-native';

import {Surface, Text} from 'react-native-paper';

export default function Settings() {
    return (
        <Surface style={styles.container}>
            <Text style={styles.title}>Settings</Text>
        </Surface>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
});
