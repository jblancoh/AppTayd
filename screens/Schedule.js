import React from "react";
import { StyleSheet, Dimensions, ScrollView, Image, View, Alert } from "react-native";
import { Block, theme, Text, Button } from "galio-framework";
import { TouchableOpacity } from "react-native-gesture-handler";
import Pusher from 'pusher-js/react-native';
import { CardFullImage, TabBar, ServiceComponent, Icon } from "../components";
import { Images, nowTheme } from '../constants/';
import { iPhoneX } from "../constants/utils";
import Actions from "../lib/actions";
import env from '../lib/enviroment';
import ServicesService from "../services/service";
import _ from 'lodash';

const { width, height } = Dimensions.get("screen");
const smallScreen = height < 812 ? true : false;

class Schedule extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showMore: false,
            showInfo: false,
            userData: null,
            weekDay: ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
            months: ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"],
            services: [],
            loading: false,
            currentService: null,
            isCancelled: false
        }
    }
    async componentDidMount() {
        const { navigation } = this.props;

        await Actions.extractUserData().then((result) => {
            if (result != null) {
                this.setState({ userData: result.user });
                this._getServices();
            }
        });

        var pusher = new Pusher(env.PUSHER_KEY, {
            cluster: env.PUSHER_CLUSTER
        });

        this.channel = await pusher.subscribe('notifications' + this.state.userData.id);
        this.channel.bind('service-status', (data) => {
            this._getServices()
        });

        this.focusListener = await navigation.addListener('focus', () => {
            this._getServices();
        });
        this.setState({
            currentService: this.state.services
        })
    }

    componentWillUnmount() {
        if (typeof this.channel === 'function') {
            this.channel()
        }
        if (typeof this.focusListener === 'function') {
            this.focusListener()
        }
        this.setState({
            currentService: null
        })
    }

    async _getServices() {
        this.setState({
            loading: true
        })
        await ServicesService.listScheduled(this.state.userData.id)
            .then(response => {
                this.setState({
                    services: response,
                    showMore: response.length > 0 ? true : false,
                    loading: false
                })
                if (response.length > 0) {
                    this.setState({
                        currentService: response[0]
                    })
                }
                if (response.length === 0 && !_.isEmpty(this.state.currentService) && !this.state.isCancelled) {
                    this.props.navigation.navigate("RateService", {
                        service: this.state.currentService
                    })
                    this.setState({
                        currentService: null,
                        isCancelled: false
                    })
                } else {
                    this.setState({
                        isCancelled: false
                    })
                }
            })
            .catch(error => {
                Alert.alert("No se encontraron servicios vinculados a este usuario.");
            })
    }

    _cancelCurrentService = () => {
        this.setState({
            isCancelled: true
        })
    }

    renderBlocks = () => {
        return (
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.blocksContainer}>
                <Block flex>
                    <Block flex row style={{ paddingTop: iPhoneX() ? 30 : 10 }}>
                        <Icon
                            name={'align-left-22x'}
                            family="NowExtra"
                            size={16}
                            onPress={() => this.props.navigation.openDrawer()}
                            color={nowTheme.COLORS.ICON}
                            style={{ fontWeight: '700', marginRight: 15, paddingTop: 5 }}
                        />
                        <Block flex>
                            <Text style={styles.nameTitle}>Agenda</Text>
                            <Text style={styles.subtitle}>Revisa tus citas programadas</Text>
                        </Block>
                    </Block>

                    {
                        !this.state.showMore ? (
                            <Block>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('AgendaFecha')}>
                                    <CardFullImage image={Images.Agendar} imageStyle={{ height: smallScreen ? height * 0.7 : height * 0.62, width: '100%' }} />
                                </TouchableOpacity>

                                <Block flex style={{ paddingVertical: 20, paddingHorizontal: 45 }}>
                                    <Text style={[styles.footerTitle, { textAlign: 'center', }]}>Comienza la experiencia TAYD agendando una cita</Text>
                                </Block>
                            </Block>
                        ) : (
                            <View style={{ height: height * (smallScreen ? 0.70 : 0.68) }}>
                                <ScrollView>
                                    {this.state.services.map((item) => {
                                        return (
                                            <ServiceComponent
                                                key={item.id}
                                                item={item}
                                                onClose={() => this._getServices()}
                                                {...this.props}
                                                isLoadingService={this.state.loading}
                                                cancelCurrentService={this._cancelCurrentService}
                                            />
                                        )
                                    })}
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
