import {DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationDefaultTheme,} from '@react-navigation/native';
import {DarkTheme as PaperDarkTheme, DefaultTheme as PaperDefaultTheme,} from 'react-native-paper';


let primary = "#58f87b";
export let secondary = "#efab22"
let background = "#000";
export const transparent = "#00000000"
export const colors = {
    dark: {
        primary: primary,
        accent: primary,
        background: background,
        tint: primary,
        inactiveTintColor: "#AAA",
        surface: background
    },
    light: {
        primary: "#0FF",
        accent: "#0FF",
        background: "rgba(0,0,0,0)",
        tint: "#0FF",
        inactiveTintColor: "#AAA"
    }
}


export const CombinedDefaultTheme: ReactNativePaper.Theme = {
    ...PaperDefaultTheme,
    ...NavigationDefaultTheme,
    colors: {
        ...PaperDefaultTheme.colors,
        ...NavigationDefaultTheme.colors,
        ...colors.light,
    },
    dark: false,
};
export const CombinedDarkTheme: ReactNativePaper.Theme = {
    ...PaperDarkTheme,
    ...NavigationDarkTheme,
    mode: "exact",
    roundness: 4,
    colors: {
        ...PaperDarkTheme.colors,
        ...NavigationDarkTheme.colors,
        ...colors.dark,
    },
    dark: true
};
