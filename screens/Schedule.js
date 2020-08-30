import React from "react";
import { StyleSheet, Dimensions, ScrollView, Image, View } from "react-native";
import { Block, theme, Text, Button } from "galio-framework";
import { TouchableOpacity } from "react-native-gesture-handler";

import { CardFullImage, TabBar, ServiceComponent } from "../components";
import { Images, nowTheme } from '../constants/';
import Actions from "../lib/actions";
import ServicesService from "../services/service";

const { width, height } = Dimensions.get("screen");
const smallScreen = height < 812 ? true : false;

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

    renderBlocks = () => {
        let {userData} = this.state;

        return (
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.blocksContainer}>
                <Block flex>
                    <Block flex row style={{ paddingTop: 10 }}>
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
                                    <CardFullImage image={Images.Agendar} imageStyle={{ height: smallScreen ? height * 0.7 : height * 0.62, width: '100%' }} />
                                </TouchableOpacity>

                                <Block flex style={{paddingVertical: 20, paddingHorizontal: 45}}>
                                    <Text style={[styles.footerTitle, { textAlign: 'center',}]}>Comienza la experiencia TAYD agendando una cita</Text>
                                </Block>
                            </Block>
                        ) : (
                            <View style={{height: height * 0.68}}>
                                <ScrollView>
                                    { this.state.services.map((item) => <ServiceComponent item={item} onClose={() => this._getServices()} {...this.props} /> )}
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
