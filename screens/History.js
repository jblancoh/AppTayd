import React from "react";
import { StyleSheet, Dimensions, ScrollView, Image, StatusBar, View } from "react-native";
import { Block, theme, Text, Button } from "galio-framework";

import { TabBar } from "../components";
import { Images, nowTheme } from '../constants/';
import { TouchableOpacity } from "react-native-gesture-handler";

const { width } = Dimensions.get("screen");

class History extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showInfo : false,
        };
    }
    renderBlocks = () => {
        return (
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.blocksContainer}>
                <Block flex>
                    <StatusBar barStyle="light-content" />
                    <Block flex row style={{ paddingTop: 30 }}>
                        <Image source={Images.ProfilePicture} style={{ borderRadius: 50, height: 60, width: 60, marginRight: 25 }} />
                        <Block flex>
                            <Text style={styles.nameTitle}>Historial de Chris</Text>
                            <Text>Revisa el historial de servicios TAYD</Text>
                        </Block>
                    </Block>

                    <Block flex style={styles.emptyContainer}>
                        <Text style={styles.redText}>Aún no cuentas con historial</Text>
                    </Block>

                    <Block flex>
                        <Block middle style={styles.cardContainer}>
                            <Block row style={{ width: width - theme.SIZES.BASE * 3, paddingVertical: 20, paddingHorizontal: 10}}>
                                <Block style={{justifyContent: 'flex-start', alignContent: 'center'}}>
                                    <Image source={require('../assets/icons/T-casa.png')} style={{ width: 65, height: 65 }} />
                                </Block>

                                <View style={{ width: 250, paddingHorizontal: 15}}>
                                    <Text style={[styles.historyTitle]}>
                                        Casa
                                    </Text>
                                    <Text style={[styles.historySubtitle, styles.divider]} color={nowTheme.COLORS.SECONDARY}>
                                        Av. Paseo Tabasco 1234567 C.P. 20990 Esq. Av. Ruiz Cortines
                                    </Text>
                                    <Block middle style={[styles.section, this.state.showInfo && styles.divider]}>
                                        <Text style={[styles.historySubtitleBold]} color={nowTheme.COLORS.SECONDARY}>
                                            Domingo, 15 de marzo de 2020, 2:00 p.m.
                                        </Text>

                                        {
                                            !this.state.showInfo && (
                                                <TouchableOpacity onPress={() => this.setState({ showInfo: true })}>
                                                    <Image source={Images.Icons.FlechaAbajo} style={{ width: 25, height: 25 }} />
                                                </TouchableOpacity>
                                            )
                                        }
                                    </Block>
                                    
                                    {
                                        this.state.showInfo && (
                                            <View>
                                                <Block style={styles.divider}>
                                                    <Text style={[styles.historySubtitle]} color={nowTheme.COLORS.SECONDARY}>
                                                        2 Habitaciones
                                                    </Text>
                                                    <Text style={[styles.historySubtitle]} color={nowTheme.COLORS.SECONDARY}>
                                                        2 Baños
                                                    </Text>
                                                    <Text style={[styles.historySubtitle]} color={nowTheme.COLORS.SECONDARY}>
                                                        1 Sala
                                                    </Text>
                                                    <Text style={[styles.historySubtitle]} color={nowTheme.COLORS.SECONDARY}>
                                                        1 Comedor
                                                    </Text>
                                                    <Text style={[styles.historySubtitle]} color={nowTheme.COLORS.SECONDARY}>
                                                        1 Cocina
                                                    </Text>
                                                </Block>
                                                <Text style={[styles.historySubtitle, styles.divider]} color={nowTheme.COLORS.SECONDARY}>
                                                    Visa 1111 2222 3333 4444 Christopher del ángel
                                                </Text>
                                                <Block style={styles.divider}>
                                                    <View style={styles.section}>
                                                        <Text style={styles.historySubtitle}>Subtotal</Text>
                                                        <Text style={styles.historySubtitle}>$250.00</Text>
                                                    </View>
                                                    <View style={[styles.section]}>
                                                        <Text style={styles.historySubtitle}>Cupón</Text>
                                                        <Text style={styles.historySubtitle}>$0.00</Text>
                                                    </View>
                                                    <View style={[styles.section]}>
                                                        <Text style={styles.historySubtitleBold}>Total</Text>
                                                        <Text style={styles.historySubtitleBold}>$250.00</Text>
                                                    </View>
                                                </Block>

                                                <Text style={styles.historySubtitleBold}>TAYDER:</Text>
                                                <Text style={styles.historySubtitle}>María de Jesús Morales Pérez</Text>

                                                <Block middle style={[styles.section, {alignItems: 'flex-end'}]}>
                                                    <Button
                                                        round
                                                        color={nowTheme.COLORS.BASE}
                                                        style={styles.button}
                                                        onPress={() => this._handleNextAction()}>
                                                        <Text style={{ fontFamily: 'trueno-semibold' }} size={14} color={nowTheme.COLORS.WHITE}>
                                                            Quejas o sugerencias
                                                        </Text>
                                                    </Button>

                                                    <TouchableOpacity style={{marginLeft: 20, marginBottom: 10}} onPress={() => this.setState({showInfo : false})}>
                                                        <Image source={Images.Icons.FlechaArriba} style={{ width: 25, height: 25 }} />
                                                    </TouchableOpacity>
                                                </Block>
                                            </View>
                                        )
                                    }
                                </View>
                            </Block>
                        </Block>
                    </Block>
                </Block>
            </ScrollView>
        );
    };

    render() {
        return (
            <Block flex center style={styles.home}>
                {this.renderBlocks()}

                <TabBar {...this.props} activeScreen="history" />
            </Block>
        );
    }
}

const styles = StyleSheet.create({
    home: {
        width: width,
        backgroundColor: nowTheme.COLORS.BACKGROUND,
    },
    nameTitle: {
        fontFamily: 'trueno-extrabold',
        fontSize: 24,
        color: nowTheme.COLORS.SECONDARY,
        lineHeight: 29,
    },
    subtitle: {
        fontFamily: 'trueno',
        fontSize: 14,
        lineHeight: 15,
        color: nowTheme.COLORS.SECONDARY,
    },
    blocksContainer: {
        width: width - theme.SIZES.BASE * 2,
        paddingVertical: theme.SIZES.BASE,
        paddingHorizontal: 2,
    },

    cardContainer: {
        backgroundColor: nowTheme.COLORS.WHITE,
        borderRadius: 25,
        shadowColor: nowTheme.COLORS.BLACK,
        shadowOffset: {
            width: 0,
            height: 4
        },
        shadowRadius: 8,
        shadowOpacity: 0.1,
        elevation: 1,
        overflow: 'hidden',
    },
    historyTitle: {
        fontFamily: 'trueno-extrabold',
        color: nowTheme.COLORS.SECONDARY,
        fontSize: 24,
        textAlign: 'left',
    },
    historySubtitle: {
        fontFamily: 'trueno',
        fontSize: 14,
        color: nowTheme.COLORS.SECONDARY,
        textAlign: 'left',
    },
    historySubtitleBold: {
        fontFamily: 'trueno-extrabold',
        color: nowTheme.COLORS.SECONDARY,
        fontSize: 14,
        textAlign: 'left',
    },
    section: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    emptyContainer: {
        backgroundColor: nowTheme.COLORS.WHITE,
        borderRadius: 25,
        shadowColor: nowTheme.COLORS.BLACK,
        shadowOffset: {
            width: 0,
            height: 8
        },
        shadowRadius: 8,
        shadowOpacity: 0.8,
        elevation: 3,

        marginTop: 30,
        marginBottom: 30,
    },
    redText: {
        fontFamily: 'trueno',
        fontSize: 14,
        fontWeight: '500',
        lineHeight: 15,
        color: nowTheme.COLORS.BASE,

        paddingVertical: 10,
        textAlign: 'center',
    },

    divider: {
        borderBottomColor: nowTheme.COLORS.SECONDARY,
        borderBottomWidth: 1,
        paddingBottom: 15,
        marginBottom: 15,
    },
    button: {
        width: width * 0.5,
        height: theme.SIZES.BASE * 2,
        marginTop: 10,
        marginBottom: 10,
    }
});

export default History;
