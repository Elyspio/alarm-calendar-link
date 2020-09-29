import {getCalendarsAsync, getEventsAsync, requestCalendarPermissionsAsync} from "expo-calendar";

export class CalendarService {

    public async getCalendars() {
        const {status} = await requestCalendarPermissionsAsync();
        if (status === 'granted') {
            return await getCalendarsAsync();
        }
        return [];
    }

    public getEvents: typeof getEventsAsync = async (calendarIds, startDate, endDate) => {
        const {status} = await requestCalendarPermissionsAsync();
        if (status === 'granted') {
            return await getEventsAsync(calendarIds, startDate, endDate);
        }
        return [];
    }

}
