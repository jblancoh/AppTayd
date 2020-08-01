import React from "react";
import {
    ImageBackground,
    StyleSheet,
    StatusBar,
    Dimensions,
    Text,
    View,
    Image,
    Modal
} from "react-native";
import { Block, Button, theme } from "galio-framework";
import { Icon } from '../../components';
import nowTheme from "../../constants/Theme";
import Images from "../../constants/Images";
import PaymentMethodService from "../../services/paymentMethod";

const { height, width } = Dimensions.get("screen");

class AgendaCheckoutScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError        : false,
            errorTitle      : '',
            errorMessage    : '',
            userData        : this.props.navigation.state.params.userData,
            propertyInfo    : this.props.navigation.state.params.propertyInfo,
            datetime        : this.props.navigation.state.params.datetime,
            hasSupplies     : this.props.navigation.state.params.hasSupplies,
            sourceInfo      : null,
            weekDay         : ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
            months          : ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"],
        }
    }

    componentDidMount() {

    }

    _getSourceInfo() {
        PaymentMethodService.getPredeterminedSource(this.state.userData.id)
            .then(response => {
                this.setState({sourceInfo: response});
            })
            .catch(error => {
                console.error(error);
            });
    }

    _datetimeFormat() {
        const {day, month, year, hour, minutes} = this.state.datetime;
        let _week    = this.state.weekDay[day];
        let _month   = this.state.months[month];

        let type    = "a.m.";
        let _minutes = minutes < 10 ? `0${minutes}` : minutes;

        if(hour >= 12) {
            if(hour > 12) hour -= 12;
            type    = "p.m.";
        }

        return `${_week}, ${day} de ${_month} de ${year}, ${hour}:${_minutes} ${type}`;
    }

    render() {
        const { navigation }    = this.props;
        const { propertyInfo, sourceInfo }  = this.state;

        return (
            <Block flex style={styles.container}>
                <StatusBar barStyle="light-content" />
                <Block flex center>
                    <ImageBackground source={Images.AgendaCheckout} style={{ height, width, zIndex: 1 }} />
                </Block>

                <Block flex space="between" style={styles.padded}>
                    <Block style={styles.cardContainer}>
                        <View style={[styles.sectionBorder, styles.section]}>
                            <Image source={Images.TaydLogoLarge} style={{width: 120, height: 25}} />
                            <Text style={styles.textCancel}>Cancelar</Text>
                        </View>

                        <View style={[styles.sectionBorder, styles.section]}>
                            <Image source={Images.Icons.TarjetaBancaria} style={[styles.sectionItem, { width: 50, height: 34 }]} />
                            <Text style={[styles.sectionItem, styles.textNormal, {width: 190}]}>
                                {sourceInfo != null && `${sourceInfo.brand}\n${sourceInfo.number}\n${sourceInfo.name}`}
                            </Text>
                            <Icon
                                size={22}
                                color={nowTheme.COLORS.BASE}
                                name="chevron-right"
                                family="FontAwesome"
                                onPress={() => {}}
                            />
                        </View>

                        <View style={[styles.sectionBorder, styles.section]}>
                            <Text style={[styles.sectionItem, styles.textBold]}>Contacto</Text>
                            <Text style={[styles.sectionItem, styles.textNormal, { width: 190 }]}>Ejemplo@hotmail.com (044) 99 32 12 34 56</Text>
                            <Icon
                                size={22}
                                color={nowTheme.COLORS.BASE}
                                name="chevron-right"
                                family="FontAwesome"
                                onPress={() => { }}
                            />
                        </View>

                        <View style={[styles.sectionBorder, styles.section]}>
                            <Text style={[styles.sectionItem, styles.textBold]}>Dirección</Text>
                            <Text style={[styles.sectionItem, styles.textNormal, { width: 190 }]}>{ propertyInfo.name}</Text>
                            <Icon
                                size={22}
                                color={nowTheme.COLORS.BASE}
                                name="chevron-right"
                                family="FontAwesome"
                                onPress={() => { }}
                            />
                        </View>

                        <View style={[styles.sectionBorder, styles.section]}>
                            <Text style={[styles.sectionItem, styles.textBold]}>Día y Hora</Text>
                            <Text style={[styles.sectionItem, styles.textNormal, { width: 190 }]}>{ this._datetimeFormat() }</Text>
                            <Icon
                                size={22}
                                color={nowTheme.COLORS.BASE}
                                name="chevron-right"
                                family="FontAwesome"
                                onPress={() => { }}
                            />
                        </View>

                        <View style={[styles.sectionBorder, styles.section]}>
                            <Text style={[styles.sectionItem, styles.textBold]}>Inmuebles</Text>
                            <Text style={[styles.sectionItem, styles.textNormal, { width: 190 }]}>
                                2 Habitaciones{"\n"}
                                2 Baños{"\n"}
                                1 Sala{"\n"}
                                1 Cocina{"\n"}
                                1 Comedor
                            </Text>
                        </View>

                        <View style={[styles.section, {paddingTop: 15}]}>
                            <Text style={[styles.sectionItem, styles.textBold]}> </Text>
                            <Text style={[styles.sectionItem, styles.textNormal]}>Subtotal</Text>
                            <Text style={[styles.sectionItem, styles.textNormal,]}>$250.00</Text>
                        </View>
                        <View style={[styles.section]}>
                            <Text style={[styles.sectionItem, styles.textBold]}> </Text>
                            <Text style={[styles.sectionItem, styles.textNormal]}>Cupón</Text>
                            <Text style={[styles.sectionItem, styles.textNormal,]}>$0.00</Text>
                        </View>
                        <View style={[styles.section]}>
                            <Text style={[styles.sectionItem, styles.textBold]}> </Text>
                            <Text style={[styles.sectionItem, styles.textBold]}>Total</Text>
                            <Text style={[styles.sectionItem, styles.textBold,]}>$250.00</Text>
                        </View>

                        <Block middle style={{paddingTop: 25}}>
                            <Button
                                round
                                color={nowTheme.COLORS.BASE}
                                style={styles.button}
                                onPress={() => this.setState({hasError: true, errorTitle: 'Método de pago rechazado', errorMessage: 'Intenta con otra tarjeta'})}>
                                <Text style={{ fontFamily: 'trueno-semibold', color: nowTheme.COLORS.WHITE, }} size={14}>
                                    AGENDAR
                                </Text>
                            </Button>
                        </Block>
                    </Block>
                </Block>

                <Modal
                    animationType="fade"
                    transparent
                    visible={this.state.hasError}
                    presentationStyle="overFullScreen">
                    <View style={{ flex: 1, height: height, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end', flexDirection: 'column', }}>
                        <View style={{ backgroundColor: 'white', padding: 25, paddingBottom: 30, }}>
                            <View style={{justifyContent: 'center', alignItems: 'center', paddingBottom: 25}}>
                                <Image source={require('../../assets/icons/warning.png')} style={{height: 70, width: 70}} />
                                <Text style={styles.errorTitle}>{this.state.errorTitle}</Text>
                                <Text style={styles.textNormal}>{this.state.errorMessage}</Text>
                            </View>
                            <View style={{ alignItems: 'center' }}>
                                <Button
                                    round
                                    color={nowTheme.COLORS.BASE}
                                    style={styles.button}
                                    onPress={() => {
                                        this.setState({hasError: false});
                                        this.props.navigation.navigate("AgendaSuccess");
                                    }}>
                                    <Text style={{ fontFamily: 'trueno-semibold', color: nowTheme.COLORS.WHITE, }} size={14}>
                                        ENTENDIDO
                                    </Text>
                                </Button>
                            </View>
                        </View>
                    </View>
                </Modal>
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
    padded: {
        top: 285,
        justifyContent: 'center',
        alignSelf: 'center',
        paddingHorizontal: theme.SIZES.BASE * 1.3,
        position: 'absolute',
        bottom: theme.SIZES.BASE,
        zIndex: 2,
        width: width,
    },
    title: {
        fontFamily: 'trueno-extrabold',
        color: nowTheme.COLORS.SECONDARY,
        fontSize: 32,
        textAlign: 'center',
    },
    textCancel: {
        fontFamily: 'trueno',
        fontSize: 14,
        color: nowTheme.COLORS.BASE,
    },
    textBold: {
        fontFamily: 'trueno',
        fontSize: 14,
        fontWeight: 'bold',
        color: nowTheme.COLORS.SECONDARY,
        textAlign: 'center',
    },
    textNormal: {
        fontFamily: 'trueno',
        fontSize: 14,
        color: nowTheme.COLORS.SECONDARY,
    },
    errorTitle: {
        fontFamily: 'trueno-extrabold',
        fontSize: 22,
        fontWeight: 'bold',
        color: nowTheme.COLORS.SECONDARY,
        textAlign: 'center',
    },
    section: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    sectionItem: {
        paddingLeft: 15
    },
    sectionBorder: {
        borderBottomWidth: 1,
        borderBottomColor: '#E3E3E3',
        paddingVertical: 10,
    },
    button: {
        width: width * 0.4,
        height: theme.SIZES.BASE * 2.5,
        shadowRadius: 0,
        shadowOpacity: 0
    },
});

export default AgendaCheckoutScreen;
