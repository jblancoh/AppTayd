import React from "react";
import { StyleSheet, Dimensions, ScrollView, Image, View } from "react-native";
import { Block, theme, Text, Button } from "galio-framework";
import { TouchableOpacity } from "react-native-gesture-handler";

import { CardFullImage, TabBar } from "../components";
import { Images, nowTheme } from '../constants/';
import Actions from "../lib/actions";
import ServicesService from "../services/service";

const { width, height } = Dimensions.get("screen");

class Schedule extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showMore        : false,
            showInfo        : false,
            userData        : null,
            weekDay         : ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
            months          : ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"],
            services        : [],
        }
    }

    async componentDidMount() {
        const { navigation } = this.props;

        await  Actions.extractUserData().then((result) => {
             if(result != null) {
                 this.setState({userData : result.user});
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
        await ServicesService.listScheduled(this.state.userData.id)
            .then(response => {
                this.setState({services : response, showMore: response.length > 0 ? true : false})
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

    renderBlocks = () => {
        let {userData} = this.state;

        return (
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.blocksContainer}>
                <Block flex>
                    <Block flex row style={{ paddingTop: 30 }}>
                        <Image source={Images.ProfilePicture} style={{ borderRadius: 50, height: 60, width: 60, marginRight: 25 }} />
                        <Block flex>
                            <Text style={styles.nameTitle}>Agenda de {userData != null && userData.info ? userData.info.name : ''}</Text>
                            <Text style={styles.subtitle}>Revisa tus citas programadas</Text>
                        </Block>
                    </Block>

                    {
                        !this.state.showMore ? (
                            <Block>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('AgendaFecha')}>
                                    <CardFullImage image={Images.Agendar} imageStyle={{ height: height * 0.62, width: '100%' }} />
                                </TouchableOpacity>

                                <Block flex style={{paddingVertical: 20, paddingHorizontal: 45}}>
                                    <Text style={[styles.footerTitle, { textAlign: 'center',}]}>Comienza la experiencia TAYD agendando una cita</Text>
                                </Block>
                            </Block>
                        ) : (
                            <View style={{height: height * 0.68}}>
                                <ScrollView>
                                    {
                                        this.state.services.map((item) => {
                                            return (
                                                <Block key={item.id} flex style={{marginTop: 20}}>
                                                    <Block middle style={styles.cardContainer}>
                                                        <Block row style={{ width: width - theme.SIZES.BASE * 3, paddingVertical: 20, paddingHorizontal: 10 }}>
                                                            <Block style={{ justifyContent: 'flex-start', alignContent: 'center' }}>
                                                                <Image source={Images.Icons.Calendario} style={{ width: 65, height: 65 }} />
                                                            </Block>

                                                            <View style={{ width: 250, paddingHorizontal: 15 }}>
                                                                <Text style={[styles.scheduleTitle]}>
                                                                    Próxima cita...
                                                                </Text>
                                                                <Block middle style={[styles.section, this.state.showInfo && styles.divider]}>
                                                                    <Text style={[styles.scheduleSubtitle]} color={nowTheme.COLORS.SECONDARY}>{ this.formatDateTime(item) }</Text>

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
                                                                                <Text style={[styles.scheduleSubtitleBold]} color={nowTheme.COLORS.SECONDARY}>
                                                                                    Recuerda  estar al pendiente de la llegada de nuestro TAYDER a tu domicilio
                                                                                    y no olvides revisar y calificar al final de las actividades de limpieza de nuestro servicio

                                                                                    Recuerda que solicitaste nuestros insumos, así que no te preocupes en absoluto y solo disfruta
                                                                                    cómodamente de TAYD.
                                                                                </Text>
                                                                            </Block>

                                                                            <Text style={styles.scheduleSubtitleBold}>Estatus:</Text>

                                                                            <Block middle style={[styles.section, { alignItems: 'flex-end' }]}>
                                                                                <Text style={styles.scheduleSubtitleBoldRed}>{item.service_status_name.toUpperCase()}</Text>

                                                                                <TouchableOpacity style={{marginLeft: 20}} onPress={() => this.setState({ showInfo: false })}>
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
                        )
                    }
                </Block>
            </ScrollView>
        );
    };

    render() {
        return (
            <Block flex center style={styles.home}>
                {this.renderBlocks()}

                {
                    this.state.showMore && (
                        <Block middle flex style={{ justifyContent: 'flex-end', paddingBottom: 20 }}>
                            <Button
                                round
                                color={nowTheme.COLORS.BACKGROUND}
                                style={styles.button}
                                onPress={() => this.props.navigation.navigate('AgendaFecha')}>
                                <Text style={{ fontFamily: 'trueno-semibold', color: nowTheme.COLORS.BASE, }} size={14}>
                                    AGENDAR UNA CITA  +
                                </Text>
                            </Button>
                        </Block>
                    )
                }
                <TabBar {...this.props} activeScreen="agenda" />
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
    footerTitle: {
        fontFamily: 'trueno',
        fontSize: 16,
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
    scheduleTitle: {
        fontFamily: 'trueno-extrabold',
        color: nowTheme.COLORS.SECONDARY,
        fontSize: 24,
        textAlign: 'left',
    },
    scheduleSubtitle: {
        fontFamily: 'trueno',
        fontSize: 14,
        color: nowTheme.COLORS.SECONDARY,
        textAlign: 'left',
    },
    scheduleSubtitleBold: {
        fontFamily: 'trueno-extrabold',
        color: nowTheme.COLORS.SECONDARY,
        fontSize: 14,
        textAlign: 'left',
    },
    scheduleSubtitleBoldRed: {
        fontFamily: 'trueno-extrabold',
        color: nowTheme.COLORS.BASE,
        fontSize: 18,
        textAlign: 'left',
        width: width * 0.5,
    },

    section: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    divider: {
        borderBottomColor: nowTheme.COLORS.SECONDARY,
        borderBottomWidth: 1,
        paddingBottom: 15,
        marginBottom: 15,
    },
    button: {
        width: width * 0.7,
        height: theme.SIZES.BASE * 2.5,
        marginTop: 10,
        marginBottom: 10,

        shadowRadius: 0,
        shadowOpacity: 0,

        borderColor: nowTheme.COLORS.BASE,
        borderWidth: 1,
    },
});

export default Schedule;
