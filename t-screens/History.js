import React from "react";
import { StyleSheet, Dimensions, ScrollView, Image, StatusBar, View } from "react-native";
import { Block, theme, Text } from "galio-framework";
import { TouchableOpacity } from "react-native-gesture-handler";

import Actions from '../lib/actions';
import { TabBarTayder, Switch } from "../components";
import { Images, nowTheme } from '../constants/';

const { height, width } = Dimensions.get("screen");
const smallScreen = height < 812 ? true : false;

class HistoryTayder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userData: null,
            tayderName: '',
            showInfo: false,
            isOnline: true,
            statusText: 'En Línea',
        };
    }

    async componentDidMount() {
        await Actions.extractUserData().then((result) => {
          if (result != null) {
            this.setState({userData: result.user, tayderName: result.user.info.name});
          }
        });
    }

    _changeStatus = (switchValue) => {
        let message = switchValue ? 'En Línea' : 'Desconectado';
        this.setState({ isOnline: !this.state.isOnline, statusText: message });
    }

    renderBlocks = () => {
        return (
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.blocksContainer}>
                <Block flex>
                    <StatusBar barStyle="light-content" />
                    <Block row style={{ paddingTop: 10 }}>
                        <Image source={Images.ProfilePicture} style={{ borderRadius: 25, height: 60, width: 60, marginHorizontal: 25 }} />
                        <Block flex>
                            <Text style={styles.nameTitle}>{this.state.tayderName}</Text>
                            <Block row style={{paddingTop: 10, justifyContent: "space-between"}}>
                                <Text style={[styles.statusText, this.state.isOnline ? styles.statusOnline : styles.statusOffline]}>{this.state.statusText}</Text>
                                <Switch
                                    value={this.state.isOnline}
                                    style={{marginRight: 20, marginTop: -10}}
                                    onValueChange={this._changeStatus}
                                />
                            </Block>
                        </Block>
                    </Block>

                    <Block flex style={styles.emptyContainer}>
                        <Text style={styles.redText}>Aún no cuentas con historial</Text>
                    </Block>

                    <Block flex>
                        <Block middle style={styles.cardContainer}>
                            <Block row style={{ width: width - theme.SIZES.BASE * 3, paddingVertical: 20, paddingHorizontal: 10 }}>
                                <Block style={{ justifyContent: 'flex-start', alignContent: 'center' }}>
                                    <Image source={require('../assets/icons/T-Calendar.png')} style={{ width: 65, height: 65 }} />
                                </Block>

                                <View style={{ width: 250, paddingHorizontal: 15 }}>
                                    <Text style={[styles.historyTitle]}>Servicio concluido</Text>
                                    <Text style={[styles.historySubtitle]} color={nowTheme.COLORS.SECONDARY}>
                                        Domingo, 15 de marzo de 2020, 2:00 p.m.
                                    </Text>
                                    <Block middle style={[styles.section, this.state.showInfo && styles.divider]}>
                                        <Text style={[styles.historySubtitleBold]} color={nowTheme.COLORS.BASE}>
                                            $105.90 Ganancia
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
                                                    <Text style={styles.historySubtitleBold}>Comentarios:</Text>
                                                    <Text style={styles.historySubtitle}>Muy buen servicio, pero algo lento, ojalá pudieran organizar los horarios de servicio, saludos.</Text>
                                                </Block>
                                                <Text style={[styles.historySubtitle, styles.divider]} color={nowTheme.COLORS.BASE}>
                                                    Se llevaron insumos.
                                                </Text>


                                                <Block middle style={[styles.section, { alignItems: 'flex-end' }]}>
                                                    <View>
                                                        <Text style={styles.historySubtitleBold}>Tiempo de limpieza:</Text>
                                                        <Text style={styles.historySubtitle}>1 hora con 30 minutos.</Text>
                                                    </View>
                                                    <TouchableOpacity style={{ marginLeft: 20, marginBottom: 10 }} onPress={() => this.setState({ showInfo: false })}>
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

                <TabBarTayder {...this.props} activeScreen="history" />
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
        fontSize: smallScreen ? 21 : 24,
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

export default HistoryTayder;
