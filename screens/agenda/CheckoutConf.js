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

const { height, width } = Dimensions.get("screen");

class AgendaCheckoutScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError    : false,
            errorTitle  : '',
            errorMessage: '',
        }
    }
    render() {
        const { navigation } = this.props;

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
                            <Text style={[styles.sectionItem, styles.textNormal, {width: 190}]}>Visa 111 222 333 444 Christopher del ángel</Text>
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
                            <Text style={[styles.sectionItem, styles.textNormal, { width: 190 }]}>Av. Paseo Tabasco 1234567 C.P. 20990 esq. Av. Ruiz cortines</Text>
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
                            <Text style={[styles.sectionItem, styles.textNormal, { width: 190 }]}>Domingo, 15 de marzo de 2020, 2:00 p.m.</Text>
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
