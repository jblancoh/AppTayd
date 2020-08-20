import React from 'react';
import { StyleSheet, Dimensions, Image, View } from "react-native";
import { Block, Text, theme } from 'galio-framework';
import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";

import { Images, nowTheme } from '../constants/';
import Actions from '../lib/actions';

const { height, width } = Dimensions.get("screen");
const smallScreen = height < 812 ? true : false;

export default class ServiceCardSliderTayder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showInfo: false,

            weekDay         : ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
            months          : ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"],
            items            : this.props.services,
        };
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

    render() {
        let {items} = this.state;
        return (
            <ScrollView horizontal={true}>
                {
                    items.length > 0 ?
                        items.map(item => {
                            return (
                                <Block style={styles.cardContainer}>
                                    <Image source={Images.Icons.Agenda} style={{paddingTop: 60, marginBottom: 40, width: 140, height: 140}} />
        
                                    <Text style={styles.serviceTitle}>Cita agendada para hoy a las 12:00 p.m.</Text>
                                    <Text style={styles.serviceSubtitle}>Fracc. Estrellas de Buenavista M100 L100 Calle vía Láctea C.P. 12345</Text>
                                    <Text style={stryles.serviceSubtitleRed}>Insumos solicitados</Text>

                                    <Block middle style={{ marginTop: 15 }}>
                                        <Button
                                            round
                                            color={nowTheme.COLORS.PLACEHOLDER}
                                            style={styles.button}
                                            onPress={() => this.setState({showAlert: false})}>
                                            <Text style={{ fontFamily: 'trueno-semibold', color: nowTheme.COLORS.WHITE, }} size={14}>
                                                DETALLES
                                            </Text>
                                        </Button>

                                        <Button
                                            round
                                            color={nowTheme.COLORS.BASE}
                                            style={[styles.button, {marginTop: 15, marginBottom: 25}]}
                                            onPress={() => {}}>
                                            <Text style={{ fontFamily: 'trueno-semibold', color: nowTheme.COLORS.WHITE, }} size={14}>
                                                EMPEZAR
                                            </Text>
                                        </Button>
                                </Block>
                                </Block>
                            )
                        })
                     : (
                        <Block style={styles.cardContainer}>
                            <Image source={Images.Icons.Agenda} style={{paddingTop: 60, marginBottom: 40, width: 140, height: 140}} />

                            <Text style={styles.titleNoItems}>Aún no cuentas con citas agendadas</Text>
                            <Text style={styles.subtitleNoItems}>No olvides estar en línea para poder recibir solicitudes</Text>
                        </Block>
                    )
                }
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    cardContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
    
        backgroundColor: nowTheme.COLORS.WHITE,
        borderRadius: 25,
        width: '90%',
        height: smallScreen ? 480 : 600,
    },
    serviceTitle: {
        fontFamily: 'trueno-extrabold',
        color: nowTheme.COLORS.GREY5,
        fontSize: 31,
        lineHeight: 32,
        textAlign: 'center',
        paddingVertical: 20,
    },
    serviceSubtitle: {
        fontFamily: 'trueno',
        fontSize: 16,
        color: nowTheme.COLORS.GREY5,
        textAlign: 'center',
    },
    serviceSubtitleRed: {
        fontFamily: 'trueno',
        fontSize: 16,
        color: nowTheme.COLORS.BASE,
        textAlign: 'center',
    },
    titleNoItems: {
        fontFamily: 'trueno',
        fontSize: 35,
        lineHeight: 33,
        textAlign: 'center',
        color: nowTheme.COLORS.BASE
    },
    subtitleNoItems: {
        fontFamily: 'trueno-light',
        fontSize: 14,
        lineHeight: 16,
        textAlign: 'center',
        color: nowTheme.COLORS.SECONDARY,

        paddingTop: 20,
    },
});