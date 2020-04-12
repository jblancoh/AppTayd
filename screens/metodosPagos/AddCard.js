import React from 'react';
import { Image, StyleSheet, StatusBar, Dimensions, Platform, View, } from 'react-native';
import { Block, Button, Text, theme, Toast } from 'galio-framework';
import { Icon, Input } from '../../components';
import { HeaderHeight } from '../../constants/utils';

const { height, width } = Dimensions.get('screen');
import { Images, nowTheme } from '../../constants/';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class MetodoPagoAddCardScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            isIphone: Platform.OS === 'ios',
            name: '',
            lastName: '',
            cardNumber: '',
            cardDate: '',
            cardCVV: '',
            
        };
    }

    _validateForm() {
        let response = true;

        if(this.state.name.trim() == "")
            response = false

        if (this.state.lastName.trim() == "")
            response = false

        if (this.state.cardNumber.trim() == "")
            response = false

        if (this.state.cardDate.trim() == "")
            response = false

        if (this.state.cardCVV.trim() == "")
            response = false

        return response;
    }

    _handleNextAction() {
        this.props.navigation.navigate("AgendaInsumos");
    }

    render() {
        const {isIphone, name, lastName, cardCVV, cardDate, cardNumber } = this.state;
        return (
            <Block flex style={styles.container}>
                <StatusBar barStyle="light-content" />
                <Block style={{height: 220}}>
                    <Image source={Images.MetodoPagoAddCard} style={styles.image} />
                </Block>

                <Block flex style={{ backgroundColor: 'white' }}>
                    <Block space="between" style={styles.padded}>
                        <Block>
                            <Block width={width * 0.8} style={{paddingTop: 15}}>
                                <Text style={[styles.subtitle]}>Propietario de la tarjeta</Text>
                                <Input
                                    placeholder="Nombre"
                                    placeholderTextColor={nowTheme.COLORS.PLACEHOLDER}
                                    color={nowTheme.COLORS.BASE}
                                    style={[styles.inputs, name != '' ? styles.inputEnabled : styles.inputDisabled]}
                                    iconContent={null}
                                    onChangeText={(text) => this.setState({ name: text })}
                                />
                            </Block>

                            <Block width={width * 0.8}>
                                <Input
                                    placeholder="Apellidos"
                                    placeholderTextColor={nowTheme.COLORS.PLACEHOLDER}
                                    color={nowTheme.COLORS.BASE}
                                    style={[styles.inputs, lastName != '' ? styles.inputEnabled : styles.inputDisabled]}
                                    iconContent={null}
                                    onChangeText={(text) => this.setState({ lastName: text })}
                                />
                            </Block>

                            <Block width={width * 0.8} style={{ paddingTop: 15 }}>
                                <Text style={[styles.subtitle]}>Número de tarjeta</Text>
                                <Input
                                    placeholder="1111 2222 3333 4444"
                                    placeholderTextColor={nowTheme.COLORS.PLACEHOLDER}
                                    color={nowTheme.COLORS.BASE}
                                    type="number-pad"
                                    style={[styles.inputs, cardNumber != '' ? styles.inputEnabled : styles.inputDisabled]}
                                    iconContent={
                                        <Image style={{marginRight: 25, width: 35, height: 22}} source={this.state.cardNumber != '' ? Images.Icons.TarjetaBancaria : Images.Icons.TarjetaBancariaGris} />
                                    }
                                    onChangeText={(text) => this.setState({ cardNumber: text })}
                                />
                            </Block>

                            <Block width={width * 0.8} style={{ paddingTop: 15, flexDirection: 'row' }}>
                                <Block width={width * 0.4} style={{paddingRight: 15}}>
                                    <Text style={[styles.subtitle]}>Fecha de vto.</Text>
                                    <Input
                                        placeholder="11/22"
                                        placeholderTextColor={nowTheme.COLORS.PLACEHOLDER}
                                        color={nowTheme.COLORS.BASE}
                                        type="number-pad"
                                        style={[styles.inputs, cardDate != '' ? styles.inputEnabled : styles.inputDisabled]}
                                        iconContent={
                                            <Image style={{ marginRight: 25, width: 35, height: 22 }} source={this.state.cardDate != '' ? Images.Icons.TarjetaBancariaFecha : Images.Icons.TarjetaBancariaFechaGris} />
                                        }
                                        onChangeText={(text) => this.setState({ cardDate: text })}
                                    />
                                </Block>

                                <Block width={width * 0.4} style={{paddingLeft: 15}}>
                                    <Text style={[styles.subtitle]}>CVV</Text>
                                    <Input
                                        placeholder="000"
                                        placeholderTextColor={nowTheme.COLORS.PLACEHOLDER}
                                        color={nowTheme.COLORS.BASE}
                                        type="number-pad"
                                        style={[styles.inputs, cardCVV != '' ? styles.inputEnabled : styles.inputDisabled]}
                                        iconContent={
                                            <Image style={{ marginRight: 25, width: 35, height: 22 }} source={this.state.cardCVV != '' ? Images.Icons.TarjetaBancariaCCV : Images.Icons.TarjetaBancariaCCVGris} />
                                        }
                                        onChangeText={(text) => this.setState({ cardCVV: text })}
                                    />
                                </Block>
                            </Block>
                        </Block>
                        
                        <Block middle style={{width: width - theme.SIZES.BASE * 4, justifyContent: 'flex-end'}}>
                            <Button
                                round
                                color={this._validateForm() ? nowTheme.COLORS.BASE : nowTheme.COLORS.WHITE}
                                style={[styles.createButton, this._validateForm() ? styles.ButtonEnabled : styles.ButtonDisabled]}
                                onPress={() => this._handleNextAction()}>
                                <Text style={{ fontFamily: 'trueno-semibold' }} size={14} color={this._validateForm() ? nowTheme.COLORS.WHITE : nowTheme.COLORS.SECONDARY}>
                                    GUARDAR
                                </Text>
                            </Button>
                        </Block>
                    </Block>
                </Block>
            </Block>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: Platform.OS === 'android' ? - 0 : 0,
    },
    padded: {
        paddingHorizontal: theme.SIZES.BASE * 2,
        paddingTop: 30,
        bottom: Platform.OS === 'android' ? theme.SIZES.BASE * 2 : theme.SIZES.BASE * 3,
    },

    image: {
        width: width,
        height: 670,
    },
    title: {
        fontFamily: 'trueno-extrabold',
        paddingHorizontal: 20,
        fontSize: 30,
        fontWeight: '700',
        textAlign: 'center',
    },
    subtitle: {
        fontFamily: 'trueno',
        textAlign: 'left',
        fontSize: 12,
    },

    inputIcons: {
        marginRight: 25,
        width: 25,
        height: 25,
    },
    inputs: {
        borderWidth: 1,
        borderRadius: 21.5,
        justifyContent: 'center',
        alignContent: 'center'
    },
    inputEnabled: {
        borderColor: nowTheme.COLORS.BASE,
    },
    inputDisabled: {
        borderColor: '#C0C0C0',
    },

    createButton: {
        width: width * 0.5,
        marginTop: 30,
        marginBottom: 10
    },

    ButtonEnabled: {
        borderColor: nowTheme.COLORS.BASE
    },
    ButtonDisabled: {
        borderColor: nowTheme.COLORS.SECONDARY,
        borderWidth: 1,
    }
});