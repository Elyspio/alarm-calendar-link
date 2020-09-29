import * as React from 'react';
import {connect, ConnectedProps} from "react-redux";
import {Dispatch} from "redux";

import {List, Surface, Switch, useTheme} from "react-native-paper"
import {Calendar as ICalendar} from "expo-calendar";
import {RootState} from "../../../store/reducer";
import {getEvents, watchCalendar} from "../../../store/calendar/actions";
import {Dimensions, StyleSheet} from "react-native";

const mapStateToProps = (state: RootState) => ({
    calendars: state.calendar.calendars
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
    async watchCalendar(calendarId: ICalendar["id"], state: boolean) {
        const now = new Date()
        const after  = new Date().setFullYear(now.getFullYear() + 1)
        if (state) {
            // @ts-ignore
            await dispatch(getEvents({id: calendarId, from: now, to: after}));
        }

        return dispatch(watchCalendar({id: calendarId, status: state}));
    }
})


const connector = connect(mapStateToProps, mapDispatchToProps);
type ReduxTypes = ConnectedProps<typeof connector>;


function CalendarList(props: ReduxTypes) {
    const {colors} = useTheme();
    console.log(colors.primary, props.watchCalendar);
    const ss = (c: ReduxTypes["calendars"][number]) =>
        <Switch color={colors.primary} value={c.watch} onValueChange={state => props.watchCalendar(c.core.id, state)}/>

    return <Surface style={styles.surface}>
        <List.Section title={"Calendar list"}>
            {props.calendars.map(c => <List.Item key={c.core.id} title={c.core.name} right={() => ss(c)}/>)}
        </List.Section>
    </Surface>
}

export default connector(CalendarList);
const styles = StyleSheet.create({
    surface: {
        elevation: 4,
        width: Dimensions.get("window").width - 30
    },
});
