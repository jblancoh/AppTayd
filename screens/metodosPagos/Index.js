import React from "react";
import {
    Image,
    StyleSheet,
    StatusBar,
    Dimensions,
    Text, View
} from "react-native";
import { Block, Button, theme } from "galio-framework";

const { height, width } = Dimensions.get("screen");

import nowTheme from "../../constants/Theme";
import Images from "../../constants/Images";

class MetodoPagoIndexScreen extends React.Component {
    render() {
        const { navigation } = this.props;

        return (
            <Block flex style={styles.container}>
                <StatusBar barStyle="light-content" />
                <Block flex space="between" style={styles.padded}>
                    <Block middle style={styles.cardContainer}>
                        <View style={{ width: width - theme.SIZES.BASE * 4, flexDirection: 'row', justifyContent: 'flex-end', paddingTop: 10, paddingRight: 10 }}>
                            <Image source={require('../../assets/icons/success.png')} style={{ width: 25, height: 25 }} />
                        </View>

                        <Block row style={{ width: width - theme.SIZES.BASE * 4, paddingBottom: 10, paddingHorizontal: 15, alignItems: 'center' }}>
                            <View style={{ paddingHorizontal: 25 }}>
                                <Image source={require('../../assets/icons/T-TarjetaBancaria.png')} style={{ width: 60, height: 35 }} />
                            </View>

                            <View style={{ width: 170, marginTop: -15 }}>
                                <Text style={[styles.subtitle]} color={nowTheme.COLORS.SECONDARY}>
                                    Visa 111 222 333 444 Christopher del ángel
                                </Text>
                            </View>
                        </Block>
                    </Block>

                    <Block middle flex style={{ justifyContent: 'flex-end' }}>
                        <Button
                            round
                            color={nowTheme.COLORS.WHITE}
                            style={styles.button}
                            onPress={() => navigation.navigate('MetodoPagoAddCard')}>
                            <Text style={{ fontFamily: 'trueno-semibold', color: nowTheme.COLORS.BASE, }} size={14}>
                                AGREGAR MÉTODO  +
                            </Text>
                        </Button>
                    </Block>
                </Block>
            </Block>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        backgroundColor: '#F7F7F7'
    },
    cardContainer: {
        backgroundColor: nowTheme.COLORS.WHITE,
        paddingBottom: 15,
        borderRadius: 25,
        shadowColor: nowTheme.COLORS.BLACK,
        shadowOffset: {
            width: 0,
            height: 4
        },
        shadowRadius: 8,
        shadowOpacity: 0.1,
        elevation: 4,
        overflow: 'hidden',
    },
    padded: {
        paddingHorizontal: theme.SIZES.BASE * 2,
        bottom: theme.SIZES.BASE,
    },
    title: {
        fontFamily: 'trueno-extrabold',
        color: nowTheme.COLORS.SECONDARY,
        fontSize: 24,
        textAlign: 'left',
    },
    subtitle: {
        fontFamily: 'trueno-light',
        fontSize: 16,
        color: nowTheme.COLORS.SECONDARY,
        textAlign: 'left',
    },
    button: {
        width: width * 0.5,
        height: theme.SIZES.BASE * 2.5,
        marginTop: 10,
        marginBottom: 10,

        shadowRadius: 0,
        shadowOpacity: 0,

        borderColor: nowTheme.COLORS.BASE,
        borderWidth: 1,
    },
});

export default MetodoPagoIndexScreen;
