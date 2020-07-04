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

export default class TabBarTayder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            screen: this.props.activeScreen
        }
    }

    render() {
        return (
            <View style={[styles.tabBar, styles.tabBarColor]}>
                <TouchableOpacity style={styles.tabItem} onPress={() => this.props.navigation.navigate("HomeTayder")}>
                    <Image source={this.state.screen == 'home' ? Images.Icons.Inicio : Images.Icons.Inicio_G} style={{ width: 22, height: 22 }} />
                    <Text style={[styles.tabTitle, this.state.screen == 'home' ? styles.titleActive : styles.titleInactive]}>Inicio</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.tabItem} onPress={() => this.props.navigation.navigate("Earnings")}>
                    <Image source={this.state.screen == 'agenda' ? Images.Icons.Agenda : Images.Icons.Agenda_G} style={{ width: 22, height: 22 }} />
                    <Text style={[styles.tabTitle, this.state.screen == 'ingresos' ? styles.titleActive : styles.titleInactive]}>Ingresos</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.tabItem} onPress={() => this.props.navigation.navigate("HistoryTayder")}>
                    <Image source={this.state.screen == 'history' ? Images.Icons.Historial : Images.Icons.Historial_G} style={{ width: 22, height: 22 }} />
                    <Text style={[styles.tabTitle, this.state.screen == 'history' ? styles.titleActive : styles.titleInactive]}>Historial</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.tabItem} onPress={() => this.props.navigation.navigate("SoporteTayder")}>
                    <Image source={this.state.screen == 'soporte' ? Images.Icons.Ayuda : Images.Icons.Ayuda_G} style={{ width: 22, height: 22 }} />
                    <Text style={[styles.tabTitle, this.state.screen == 'soporte' ? styles.titleActive : styles.titleInactive]}>Ayuda</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    tabBar: {
        width: width,
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    tabBarColor: {
        backgroundColor: '#232323',
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