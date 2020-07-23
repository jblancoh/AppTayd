import React from "react";
import { StyleSheet, Dimensions, ImageBackground, Image, StatusBar, View } from "react-native";
import { Block, theme, Text, Button } from "galio-framework";
import Carousel from 'react-native-snap-carousel';

import { TabBarTayder, Switch } from "../components";
import { Images, nowTheme } from '../constants/';

const { width } = Dimensions.get("screen");

export default class EarningsTayder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOnline: true,
            statusText: 'En Línea',
        };
    }

    _changeStatus = (switchValue) => {
        let message = switchValue ? 'En Línea' : 'Desconectado';
        this.setState({ isOnline: !this.state.isOnline, statusText: message });
    }

    renderBlocks() {
        return (
            <View style={styles.blocksContainer}>
                <Block flex>
                    <Block row style={{ paddingTop: 10 }}>
                        <Image source={Images.ProfilePicture} style={{ borderRadius: 50, height: 60, width: 60, marginHorizontal: 25 }} />
                        <Block flex>
                            <Text style={styles.nameTitle}>Christopher</Text>
                            <Block row style={{ paddingTop: 10 }}>
                                <Text style={[styles.statusText, this.state.isOnline ? styles.statusOnline : styles.statusOffline]}>{this.state.statusText}</Text>
                                <Switch
                                    value={this.state.isOnline}
                                    style={{ transform: [{ scaleX: 1.6 }, { scaleY: 1.6 }], paddingLeft: 80, marginTop: -10 }}
                                    onValueChange={this._changeStatus}
                                />
                            </Block>
                        </Block>
                    </Block>

                    <Block style={{paddingTop: 25, paddingHorizontal: 20}}>
                        <Text style={[styles.title2, { color: nowTheme.COLORS.WHITE }]}>Haz</Text>
                        <Text style={[styles.title2, { color: nowTheme.COLORS.WHITE }]}>realizado</Text>
                        <Text style={[styles.title2, { color: nowTheme.COLORS.BASE }]}>13 servicios</Text>
                        <Text style={[styles.title2, { color: nowTheme.COLORS.WHITE }]}>hasta hoy</Text>
                    </Block>

                    <Block middle style={{ paddingVertical: 25 }}>
                        <Block style={styles.cardContainer}>
                            <Text style={styles.title}>$895.90</Text>
                            <Text style={styles.subtitle}>Ingreso acumulado</Text>
                        </Block>
                    </Block>

                    <Block style={{ paddingTop: 25, paddingHorizontal: 20 }}>
                        <Text style={styles.subtitle2}>Revisa tu historial de servicios para más detalles</Text>
                        <Text style={styles.subtitle3}>Los cortes se realizan cada lunes</Text>
                    </Block>

                </Block>
            </View>
        );
    };

    render() {
        return (
            <Block flex center style={styles.home}>
                <StatusBar barStyle="light-content" />

                {this.renderBlocks()}

                <TabBarTayder {...this.props} activeScreen="ingresos" />
            </Block>
        );
    }
}

const styles = StyleSheet.create({
    home: {
        width: width,
        backgroundColor: nowTheme.COLORS.BLACK,
    },
    nameTitle: {
        fontFamily: 'trueno-extrabold',
        fontSize: 24,
        color: nowTheme.COLORS.WHITE,
        lineHeight: 29,
    },
    statusText: {
        fontFamily: 'trueno',
        fontSize: 14,
        lineHeight: 15,
        color: '#36c550',
    },
    statusOnline: {
        color: '#36c550',
    },
    statusOffline: {
        color: '#C4C4C4',
    },
    blocksContainer: {
        width: width - theme.SIZES.BASE * 2,
        flex: 1,
        paddingVertical: theme.SIZES.BASE,
        paddingHorizontal: 2,
    },
    button: {
        width: width * 0.4,
        height: theme.SIZES.BASE * 2.5,
        shadowRadius: 0,
        shadowOpacity: 0
    },

    cardContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,

        backgroundColor: nowTheme.COLORS.WHITE,
        borderRadius: 25,
        width: '90%',
    },
    title: {
        fontFamily: 'trueno-extrabold',
        fontSize: 60,
        textAlign: 'center',
        color: nowTheme.COLORS.BASE
    },
    subtitle: {
        fontFamily: 'trueno-light',
        fontSize: 20,
        lineHeight: 33,
        textAlign: 'center',
        color: nowTheme.COLORS.BASE,
    },

    title2: {
        fontFamily: 'trueno-extrabold',
        fontSize: 50,
        lineHeight: 49,
    },
    subtitle2: {
        fontFamily: 'trueno-light',
        fontSize: 34,
        lineHeight: 35,
        marginBottom: 20,
        color: nowTheme.COLORS.WHITE,
    },
    subtitle3: {
        fontFamily: 'trueno-light',
        fontSize: 19,
        lineHeight: 33,
        textAlign: 'center',
        color: nowTheme.COLORS.WHITE,
    },
});
