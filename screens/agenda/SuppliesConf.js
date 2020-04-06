import React from 'react';
import { Image, StyleSheet, StatusBar, Dimensions, Platform, View, DatePickerAndroid, DatePickerIOS, TimePickerAndroid } from 'react-native';
import { Block, Button, Text, theme, Toast } from 'galio-framework';
import { Icon } from '../../components';
import { HeaderHeight } from '../../constants/utils';

const { height, width } = Dimensions.get('screen');
import { Images, nowTheme } from '../../constants/';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class AgendaInsumosScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isSelected: false,
        };
    }

    _handleSelection() {
        this.setState({isSelected : true});
    }

    _handleNextAction() {
        this.props.navigation.navigate("AgendaCheckout");
    }

    render() {
        const { isSelected } = this.state;
        return (
            <Block flex style={styles.container}>
                <StatusBar barStyle="light-content" />
                <Block>
                    <Image source={Images.AgendaInsumos} style={styles.image} />
                </Block>

                <Block flex style={{backgroundColor: 'white'}}>
                    <Block space="between" style={styles.padded}>
                        <Block>
                            <Text style={[styles.title, { paddingTop: 50 }]}>¿Cuentas con los insumos necesarios?</Text>
                            <Text style={[styles.subtitle, { paddingVertical: 10 }]}>En TAYD ofrecemos los materiales básicos para limpiar tu domicilio de manera profunda con un costo extra de $50.00</Text>

                            <Block middle style={{ width: width - theme.SIZES.BASE * 4 }}>
                                {
                                    isSelected ? (
                                        <Button
                                            round
                                            color={'#F4F4F4'}
                                            style={styles.addedButton}>
                                            <Text style={{ fontFamily: 'trueno-semibold' }} size={14} color={'#DDDDDD'}>
                                                INSUMOS AGREGADOS
                                            </Text>
                                        </Button>
                                    ) : (
                                        <Button
                                            round
                                            color={nowTheme.COLORS.WHITE}
                                            style={styles.addButton}
                                            onPress={() => this._handleSelection()}>
                                            <Text style={{ fontFamily: 'trueno-semibold' }} size={14} color={nowTheme.COLORS.BASE}>
                                                AGREGAR INSUMOS +
                                            </Text>
                                        </Button>
                                    )
                                }
                            </Block>

                            <Text style={[styles.subtitle2, { paddingVertical: 10 }]}>Los insumos solo se llevan para realizar la limpieza.</Text>

                            <Block middle style={{ width: width - theme.SIZES.BASE * 4 }}>
                                <Button
                                    round
                                    color={nowTheme.COLORS.BASE}
                                    style={styles.createButton}
                                    onPress={() => this._handleNextAction()}>
                                    <Text style={{ fontFamily: 'trueno-semibold' }} size={14} color={nowTheme.COLORS.WHITE}>
                                        {isSelected ? 'SIGUIENTE' : 'OMITIR'}
                                    </Text>
                                </Button>
                            </Block>
                        </Block>
                    </Block>
                </Block>
            </Block>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: Platform.OS === 'android' ? - HeaderHeight : 0,
    },
    padded: {
        paddingHorizontal: theme.SIZES.BASE * 2,
        bottom: Platform.OS === 'android' ? theme.SIZES.BASE * 2 : theme.SIZES.BASE * 3,
    },

    image: {
        width: width,
        height: 450,
        marginTop: 50
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
        textAlign: 'center',
        fontSize: 16,
        paddingBottom: 15,
    },
    subtitle2: {
        fontFamily: 'trueno',
        textAlign: 'center',
        fontSize: 12,
        paddingBottom: 15,
    },
    datetimeText: {
        fontFamily: 'trueno-extrabold',
        paddingHorizontal: 20,
        fontSize: 16,
        fontWeight: '700',
        color: nowTheme.COLORS.BASE
    },
    itemContainer: {
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'baseline'
    },
    addButton: {
        width: width * 0.5,
        marginTop: 10,
        marginBottom: 10,

        shadowRadius: 0,
        shadowOpacity: 0,

        borderColor: nowTheme.COLORS.BASE,
        borderWidth: 1,
    },
    addedButton: {
        width: width * 0.5,
        marginTop: 10,
        marginBottom: 10
    },

    createButton: {
        width: width * 0.5,
        marginTop: 10,
        marginBottom: 10
    },
});