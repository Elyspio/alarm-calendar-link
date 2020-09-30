import React, {Component} from 'react';
import {connect, ConnectedProps} from "react-redux";
import {Dispatch} from "redux";
import {Button, Surface, Text} from "react-native-paper";
import {ScrollView, StyleSheet} from "react-native";
import {height} from "../../constants/Layout";
import {secondary} from "../../constants/Colors";
import {RootState} from "../../../store/reducer";

const mapStateToProps = (state: RootState) => ({store: state})

const mapDispatchToProps = (dispatch: Dispatch) => ({})

const connector = connect(mapStateToProps, mapDispatchToProps);
type ReduxTypes = ConnectedProps<typeof connector>;


type State = {
    current: any,
    parent: string[]
}

class StoreExplorer extends Component<ReduxTypes, State> {

    state: State = {
        parent: [],
        current: {}
    }

    componentDidMount() {
        this.setState({
            current: this.props.store,
        })
    }

    render() {

        const keys = Object.keys(this.state.current || {});

        return (
            <Surface style={style.main}>
                <Surface>
                    <Text style={style.title}>{this.state.parent.length > 0 ? this.state.parent.join("/") : "/"}</Text>
                </Surface>

                <Surface style={style.keysContainer}>
                    <Button onPress={this.back} color={secondary}>Back</Button>
                    <ScrollView horizontal={true} style={style.keys}>
                        {keys.map(k =>
                            <Button onPress={() => this.explore(k)}>{k}</Button>
                        )}
                    </ScrollView>
                </Surface>



                <ScrollView style={style.json} >
                    <Text>{JSON.stringify(this.state.current, undefined, 4)}</Text>
                </ScrollView>
            </Surface>
        );
    }

    private explore = (e: string) => {

        this.setState((prev) => {
            prev.parent.push(e)
            return ({
                ...prev,
                parent: prev.parent,
                current: prev.current[e]
            });
        })
    };

    private back = () => {
        let current = this.props.store;

        this.setState((prev) => {
            prev.parent.pop();
            prev.parent.forEach(k => {
                // @ts-ignore
                current = current[k];
            })
            return ({
                ...prev,
                parent: prev.parent,
                current
            });
        })
    }
}

const style = StyleSheet.create({
    title: {
        fontWeight: "bold",
        fontSize: 20,
        margin: 20
    },
    main: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center"
    },
    json: {
        maxHeight: height - height * 0.25,
        overflow: "hidden",
    },
    keys: {
        marginBottom: 20
    },
    keysContainer: {
        display: "flex",
        flexDirection: "row"
    }
})

export default connector(StoreExplorer);
