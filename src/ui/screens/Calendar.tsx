import * as React from 'react';
import {StyleSheet} from 'react-native';
import {addCalendar, watchCalendar} from "../../store/calendar/actions";
import {Services} from "../../service";
import {connect, ConnectedProps} from "react-redux";
import {Dispatch} from "redux";
import {RootState} from "../../store/reducer";
import ListCalendar from "../components/calendar/CalendarList"
import {Calendar as ICalendar} from "expo-calendar";
import {Surface} from "react-native-paper";

const mapStateToProps = (state: RootState) => ({
    calendars: state.calendar.calendars
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
    addCalendar: async () => dispatch(addCalendar(await Services.calendar.getCalendars())),
    watchCalendar: async (calendarId: ICalendar["id"], state: boolean) => dispatch(watchCalendar({id: calendarId, status: state}))
})

const connector = connect(mapStateToProps, mapDispatchToProps);
type ReduxTypes = ConnectedProps<typeof connector>;


export class Calendar extends React.Component<ReduxTypes, {}> {


    async componentDidMount() {
        await this.props.addCalendar();
    }


    render() {
        return (
            <Surface style={styles.container}>
                <Surface style={styles.container}>
                    <ListCalendar/>
                </Surface>
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

export default connector(Calendar);
