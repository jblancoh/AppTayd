import React from "react";
import {
    StyleSheet,
    StatusBar,
    Dimensions,
    Text,
    View,
    Image,
    ScrollView,
    TouchableOpacity
} from "react-native";
import { Block, Button, theme } from "galio-framework";
import nowTheme from "../constants/Theme";
import Images from "../constants/Images";
import MapView from 'react-native-maps';

const { height, width } = Dimensions.get("screen");
const smallScreen = height < 812 ? true : false;

class ServiceInfoTayder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            service         : this.props.navigation.state.params.service,
            propertyDist    : "",
            weekDay         : ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
            months          : ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"],
        }
    }

    async componentDidMount() {
        console.log("SERVICIO", this.state.service);
        this._getPropertyDistribution();
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

        return `${week} ${datetime.getDate()} de ${month} del ${datetime.getFullYear()}, ${hour}:${minutes} ${type}`;
    }

    _getPropertyDistribution() {
        let strDistribution = "";

        this.state.service.distribution.map(item => {
            strDistribution += `${item.quantity} ${item.name} \n`;
        });

        this.setState({propertyDist: strDistribution});
    }

    render() {
        const { propertyDist, service } = this.state;

        return (
            <Block flex style={styles.container}>
                <StatusBar barStyle="light-content" />
                {
                    service != null ? (
                        <MapView
                            style={styles.mapStyle}
                            pitchEnabled={true}
                            rotateEnabled={true}
                            scrollEnabled={true}
                            zoomEnabled={true}
                            initialRegion={{
                                latitude: parseFloat(service.property_latitude),
                                longitude: parseFloat(service.property_altitude),
                                latitudeDelta: 0.01,
                                longitudeDelta: 0.01
                            }}
                        >
                        <MapView.Marker
                            key={0}
                            draggable={false}
                            coordinate={{
                                latitude: parseFloat(service.property_latitude),
                                longitude: parseFloat(service.property_altitude),
                            }}
                            title={'Mi ubicación'}
                            description={'Esta ubicación será registrada en tayd'}
                        />
                        </MapView>
                    ) : (
                        <View style={{bottom: height * 0.6, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFF'}}>
                            <Text style={{fontFamily: 'trueno-semibold', color: nowTheme.COLORS.SECONDARY, fontSize: 24}}>Cargando...</Text>
                        </View>
                    )
                }

                <Block flex space="between" style={styles.padded}>
                    <Block style={styles.cardContainer}>
                        <View style={{height: smallScreen ? height * 0.7 : height * 0.62}}>
                            <ScrollView>
                                <View style={[styles.section]}>
                                    <Image source={Images.Icons.Calendario} style={[{ width: 60, height: 60, marginTop: 20 }]} />
                                    <Block style={[styles.sectionItem, styles.sectionBorder, {width: 280}]}>
                                        <Text style={[styles.textExtraBold]}>Cita aceptada</Text>
                                        <Text style={[styles.textNormal]}>
                                            <Text style={styles.textBold}>{service.request_user_name} </Text>
                                            agendó una cita contigo para el {this.formatDateTime(service)}
                                        </Text>
                                    </Block>
                                </View>

                                <View style={[styles.section]}>
                                    <Image source={Images.Icons.Ubicacion2} style={[{ width: 45, height: 63, marginTop: 20 }]} />
                                    <Block style={[styles.sectionItem, styles.sectionBorder, {width: 280, marginLeft: 30}]}>
                                        <Text style={[styles.textRedBold]}>Dirección:</Text>
                                        <Text style={[styles.textNormal]}>{service.property_name}</Text>
                                    </Block>
                                </View>

                                <View style={[styles.section]}>
                                    <Image source={Images.Icons.Casa} style={[{ width: 60, height: 60, marginTop: 20 }]} />
                                    <Block style={[styles.sectionItem, styles.sectionBorder, {width: 280}]}>
                                        <Text style={[styles.textRedBold]}>Inmuebles: {service.property_type_name}</Text>
                                        <Text style={[styles.textNormal]}>{propertyDist}</Text>
                                    </Block>
                                </View>

                                <View style={[styles.section, {marginTop: 20}]}>
                                    <Block style={{width: 60}} />
                                    <Block style={[styles.sectionItem, {width: 300}]}>
                                        <Text style={[styles.textBold]}>Se solicitaron insumos.</Text>
                                    </Block>
                                </View>

                                <Block middle style={{paddingTop: 25}}>
                                    <Button
                                        round
                                        color={nowTheme.COLORS.BASE}
                                        style={styles.button}
                                        onPress={() => {}}>
                                        <Text style={{ fontFamily: 'trueno-semibold', color: nowTheme.COLORS.WHITE, }} size={14}>
                                            ENTENDIDO
                                        </Text>
                                    </Button>
                                </Block>
                            </ScrollView>
                        </View>
                    </Block>
                </Block>
            </Block>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.COLORS.BLACK
    },
    cardContainer: {
        height: height < 812 ? height * 0.7 : height * 0.7,
    },
    mapStyle: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: height * 0.6,
    },
    padded: {
        top: smallScreen ? 150 : 390,
        justifyContent: 'center',
        alignSelf: 'center',
        paddingHorizontal: theme.SIZES.BASE * 1.3,
        position: 'absolute',
        bottom: theme.SIZES.BASE,
        zIndex: 2,
        width: width,
    },
    textExtraBold: {
        fontFamily: 'trueno-extrabold',
        fontSize: 26,
        lineHeight: 29,
        color: nowTheme.COLORS.WHITE,

        marginBottom: 10,
    },
    textBold: {
        fontFamily: 'trueno-semibold',
        fontSize: 16,
        lineHeight: 17,
        color: nowTheme.COLORS.WHITE,
    },
    textRedBold: {
        fontFamily: 'trueno-semibold',
        fontSize: 16,
        lineHeight: 17,
        color: nowTheme.COLORS.BASE,
    },
    textNormal: {
        fontFamily: 'trueno',
        fontSize: 16,
        lineHeight: 19,
        color: nowTheme.COLORS.WHITE,
    },

    section: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    sectionItem: {
        marginLeft: 15
    },
    sectionBorder: {
        borderBottomWidth: 1,
        borderBottomColor: '#B5B5B5',
        paddingVertical: 20,
    },
    button: {
        width: width * 0.4,
        height: theme.SIZES.BASE * 2.5,
        shadowRadius: 0,
        shadowOpacity: 0
    },
});

export default ServiceInfoTayder;
