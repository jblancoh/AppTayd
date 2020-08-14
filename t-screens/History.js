import React from "react";
import { StyleSheet, Dimensions, ScrollView, Image, StatusBar, View } from "react-native";
import { Block, theme, Text } from "galio-framework";
import { TouchableOpacity } from "react-native-gesture-handler";

import Actions from '../lib/actions';
import { TabBarTayder, Switch } from "../components";
import { Images, nowTheme } from '../constants/';
import ServicesService from "../services/service";

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

            weekDay         : ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
            months          : ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"],
            services        : [],
        };
    }

    async componentDidMount() {
        const { navigation } = this.props;

        await Actions.extractUserData().then((result) => {
          if (result != null) {
            this.setState({userData: result.user, tayderName: result.user.info.name});
            this._getServices();
          }
        });

        this.focusListener = await navigation.addListener('didFocus', () => {
            this._getServices();
        });
    }

    componentWillUnmount() {
        this.focusListener.remove();
    }

    async _getServices() {
        await ServicesService.listTayderHistory(this.state.userData.id)
            .then(response => {
                this.setState({services : response})
            })
            .catch(error => {
                console.error(error);
                Alert.alert("No se encontraron servicios vinculados a este usuario.");
            })
    }

    formatDateTime = (item) => {
        let arrItem = item.dt_request.split(" ");
        let arrDate = arrItem[0].split("-");
        let arrTime = arrItem[1].split(":");

        let datetime    = new Date(Number(arrDate[0]), Number(arrDate[1]) - 1, Number(arrDate[2]), Number(arrTime[0]), Number(arrTime[1]));
        let week        = this.state.weekDay[datetime.getDay()];
        let month       = this.state.months[datetime.getMonth()];
        let type        = "a.m.";
        let minutes     = datetime.getMinutes() < 10 ? `0${datetime.getMinutes()}` : datetime.getMinutes();
        let hour        = datetime.getHours();

        if(hour >= 12) {
            if(hour > 12) hour    -= 12;
            type    = "p.m.";
        }

        return `${week}, ${datetime.getDate()} de ${month} de ${datetime.getFullYear()}, ${hour}:${minutes} ${type}`;
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

                    {
                        this.state.services.length == 0 && (
                            <Block flex style={styles.emptyContainer}>
                                <Text style={styles.redText}>Aún no cuentas con historial</Text>
                            </Block>
                        )
                    }

                    <View style={{height: height * 0.72}}>
                        <ScrollView>
                        {
                            this.state.services.map((item) => {
                                return (
                                    <Block flex key={item.id} style={{marginTop: 20}}>
                                        <Block middle style={styles.cardContainer}>
                                            <Block row style={{ width: width - theme.SIZES.BASE * 3, paddingVertical: 20, paddingHorizontal: 10 }}>
                                                <Block style={{ justifyContent: 'flex-start', alignContent: 'center' }}>
                                                    <Image source={require('../assets/icons/T-Calendar.png')} style={{ width: 65, height: 65 }} />
                                                </Block>

                                                <View style={{ width: 250, paddingHorizontal: 15 }}>
                                                    <Text style={[styles.historyTitle]}>Servicio concluido</Text>
                                                    <Text style={[styles.historySubtitleLight]} color={nowTheme.COLORS.SECONDARY}>
                                                        { this.formatDateTime(item) }
                                                    </Text>
                                                    <Block middle style={[styles.section, this.state.showInfo && styles.divider, {marginTop: 15}]}>
                                                        <Text style={[styles.historySubtitleRedBold]}>
                                                            ${parseFloat(item.service_cost).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')} <Text style={[styles.historySubtitleRedBold, {fontSize: 16}]}>Ganancia</Text>
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

                                                                <Text style={[styles.historyConsumables, styles.divider]}>
                                                                    {item.has_consumables ? 'Se llevaron insumos.' : 'No se llevaron insumos.'}
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
                                )
                            })
                        }
                        </ScrollView>
                    </View>

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
        fontSize: 16,
        lineHeight: 19,
        color: nowTheme.COLORS.SECONDARY,
        textAlign: 'left',
    },
    historySubtitleLight: {
        fontFamily: 'trueno-light',
        fontSize: 16,
        lineHeight: 17,
        color: nowTheme.COLORS.SECONDARY,
        textAlign: 'left',
    },
    historyConsumables: {
        fontFamily: 'trueno-semibold',
        fontSize: 18,
        color: nowTheme.COLORS.BASE,
        textAlign: 'left',
    },
    historySubtitleBold: {
        fontFamily: 'trueno-semibold',
        color: nowTheme.COLORS.SECONDARY,
        fontSize: 18,
        lineHeight: 22,
        textAlign: 'left',
    },
    historySubtitleRedBold: {
        fontFamily: 'trueno-extrabold',
        color: nowTheme.COLORS.BASE,
        fontSize: 22,
        lineHeight: 22,
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
