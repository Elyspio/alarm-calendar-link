import * as React from 'react';
import {connect, ConnectedProps} from "react-redux";
import {Dispatch} from "redux";

import {Surface, Text} from "react-native-paper"
import {RootState} from "../../../store/reducer";
import {Dimensions, SectionList, StyleSheet} from "react-native";
import {Event} from "expo-calendar"
import dayjs from "dayjs"
import {clone} from "lodash/clone"

const mapStateToProps = (state: RootState) => {

    const data: { title: string, data: Event[] }[] = state.calendar.calendars
        .filter(c => c.events.length > 0)
        .map(data => ({
                title: data.core.name as string,
                data: [...data.events].sort((a, b) => a.endDate < b.endDate ? -1 : 1)
            })
        )


    return {
        data
    };
}

const mapDispatchToProps = (dispatch: Dispatch) => ({})


const connector = connect(mapStateToProps, mapDispatchToProps);
type ReduxTypes = ConnectedProps<typeof connector>;


function EventItem(props: Event) {
    return <Surface style={eventItemStyle.surface}>
        <Text>{props.title}</Text>
        <Text style={eventItemStyle.margin}>Date {dayjs(props.startDate).format("DD/MM/YYYY")}</Text>
        <Text style={eventItemStyle.margin}>{dayjs(props.startDate).format("HH:mm")} to {dayjs(props.endDate).format("HH:mm")}</Text>
    </Surface>
}

const eventItemStyle = StyleSheet.create({
    surface: {
        display: "flex",
        flexDirection: "column",
        paddingTop: 10
    },
    margin: {
        paddingLeft: 20
    },
    header: {
        fontWeight: "bold"
    }
})

function EventList(props: ReduxTypes) {

    return <Surface style={styles.surface}>
        <SectionList
            sections={props.data}
            keyExtractor={(item, index) => item.title + index}
            renderSectionHeader={({ section: { title } }) => <Text style={eventItemStyle.header}>{title}</Text>}
            renderItem={({item: event}) => <EventItem {...event} />}/>
    </Surface>
}

export default connector(EventList);
const styles = StyleSheet.create({
    surface: {
        elevation: 4,
        width: Dimensions.get("window").width - 30,
        maxHeight: Dimensions.get("window").height - 100
    },
});
