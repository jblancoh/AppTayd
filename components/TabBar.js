import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image,
    Dimensions
} from 'react-native';
import { Images, nowTheme } from '../constants';

const { width } = Dimensions.get("screen");

export default class TabBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            screen: this.props.activeScreen
        }
    }

    render() {
        return (
            <View style={[styles.tabBar, styles.tabBarLight]}>
                <TouchableOpacity style={styles.tabItem} onPress={() => this.props.navigation.navigate("Home")}>
                    <Image source={this.state.screen == 'home' ? Images.Icons.Inicio : Images.Icons.Inicio_G} style={{ width: 22, height: 22 }} />
                    <Text style={[styles.tabTitle, this.state.screen == 'home' ? styles.titleActive : styles.titleInactive]}>Inicio</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.tabItem} onPress={() => this.props.navigation.navigate("History")}>
                    <Image source={this.state.screen == 'history' ? Images.Icons.Historial : Images.Icons.Historial_G} style={{ width: 22, height: 22 }} />
                    <Text style={[styles.tabTitle, this.state.screen == 'history' ? styles.titleActive : styles.titleInactive]}>Historial</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.tabItem} onPress={() => this.props.navigation.navigate("Schedule")}>
                    <Image source={this.state.screen == 'agenda' ? Images.Icons.Agenda : Images.Icons.Agenda_G} style={{ width: 22, height: 22 }} />
                    <Text style={[styles.tabTitle, this.state.screen == 'agenda' ? styles.titleActive : styles.titleInactive]}>Agenda</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.tabItem} onPress={() => { }}>
                    <Image source={this.state.screen == 'ayuda' ? Images.Icons.Ayuda : Images.Icons.Ayuda_G} style={{ width: 22, height: 22 }} />
                    <Text style={[styles.tabTitle, this.state.screen == 'ayuda' ? styles.titleActive : styles.titleInactive]}>Ayuda</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    tabBar: {
        width: width,
        height: 50,
        borderTopWidth: 0.5,
        borderColor: '#EEEEEE',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    tabBarLight: {
        backgroundColor: '#EFEFEF',
    },
    tabItem: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    tabTitle: {
        fontSize: 11,
    },
    titleInactive: {
        color: '#999999',
    },
    titleActive: {
        color: nowTheme.COLORS.BASE,
    },
});