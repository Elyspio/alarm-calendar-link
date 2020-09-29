import * as React from 'react';
import {StyleSheet} from 'react-native';

import {Surface} from 'react-native-paper';
import EventList from "../components/calendar/EventList";


export default class Events extends React.Component {


    async componentDidMount() {

    }

    render() {
        return (
            <Surface style={styles.container}>
                <EventList/>
            </Surface>
        );
    }
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
