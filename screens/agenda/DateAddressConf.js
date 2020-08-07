import React from 'react';
import { Image, StyleSheet, Dimensions, Platform, View, DatePickerAndroid, DatePickerIOS, TimePickerAndroid, ScrollView, Modal } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Block, Button, Text, theme } from 'galio-framework';
import { Images, nowTheme } from '../../constants/';
import { HeaderHeight } from '../../constants/utils';
import PropertyService from "../../services/property";
import Actions from "../../lib/actions";

const { height, width } = Dimensions.get('screen');
const smallScreen = height < 812 ? true : false;

export default class AgendaFechaScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showDateTime    : false,
            isIphone        : Platform.OS === 'ios',
            date            : new Date(),
            time            : new Date(),
            userData        : null,
            propertyInfo    : null,
            weekDay         : ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
            months          : ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"],
        };
    }

    async componentDidMount() {
        const { navigation } = this.props;

        await  Actions.extractUserData().then((result) => {
             if(result != null) {
                 this.setState({userData : result.user});
                 this._getPropertyInfo();
             }
        });

        this.focusListener = await navigation.addListener('didFocus', () => {
            this._getPropertyInfo();
        });
    }

    componentWillUnmount() {
        this.focusListener.remove();
    }

    _getPropertyInfo() {
        PropertyService.getPredeterminedProperty(this.state.userData.id)
            .then(response => {
                this.setState({propertyInfo: response});
            })
            .catch(error => {
                console.error(error);
            });
    }

    _handleNextAction() {
        this.props.navigation.navigate("AgendaInsumos", {
            userData        : this.state.userData,
            propertyInfo    : this.state.propertyInfo,
            datetime        : {
                weekDay     : this.state.date.getDay(),
                day         : this.state.date.getDate(),
                month       : this.state.date.getMonth(),
                year        : this.state.date.getFullYear(),
                hour        : this.state.time.getHours(),
                minutes     : this.state.time.getMinutes()
            }
        });
    }

    _openDatePicker = async() => {
        if(this.state.isIphone) {
            this.setState({showDateTime: true});
        } else {
            try {
                const { action, year, month, day } = await DatePickerAndroid.open({
                    date: this.state.date,
                });
                if (action !== DatePickerAndroid.dismissedAction) {
                    this.setState({date : new Date(year, month, day)});
                }
            } catch ({ code, message }) {
                console.warn('Cannot open date picker', message);
            }
        }
    }

    _dateFormat() {
        let date    = this.state.date;
        let week    = this.state.weekDay[date.getDay()];
        let month   = this.state.months[date.getMonth()];

        return `${week} ${date.getDate()}/${month}/${date.getFullYear()}`;
    }

    _timeFormat() {
        let time    = this.state.time;
        let type    = "a.m.";
        let minutes = time.getMinutes() < 10 ? `0${time.getMinutes()}` : time.getMinutes();
        let hour    = time.getHours();

        if(hour >= 12) {
            if(hour > 12) hour    -= 12;
            type    = "p.m.";
        }

        return `${hour}:${minutes} ${type}`;
    }

    _openTimePicker = async () => {
        if(this.state.isIphone) {
            this.setState({showDateTime: true});
        } else {
            try {
                const { action, hour, minute } = await TimePickerAndroid.open({
                    hour    : this.state.time.getHours(),
                    minute  : this.state.time.getMinutes(),
                    is24Hour: false
                });
                if (action !== DatePickerAndroid.dismissedAction) {
                    this.setState({ time: new Date(2020, 4, 4, hour, minute) });
                }
            } catch ({ code, message }) {
                console.warn('Cannot open date picker', message);
            }
        }
    }

    propertyTypeImage(id) {
        switch(id) {
            case 1: return (<Image source={Images.Icons.Casa} style={{ width: 50, height: 50 }} />)
            case 2: return (<Image source={Images.Icons.Departamento} style={{ width: 50, height: 50 }} />)
            case 3: return (<Image source={Images.Icons.Oficina} style={{ width: 50, height: 50 }} />)
        }
    }

    setDateTime = (newDate) => {
        this.setState({ date: newDate, time: newDate });
    }

    render() {
        const { showDateTime, isIphone, propertyInfo } = this.state;
        return (
            <Block flex style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Block flex>
                        <Image source={Images.AgendaFecha} style={styles.image} />
                    </Block>

                    <Block flex style={{ backgroundColor: 'white' }}>
                        <Block space="between" style={styles.padded}>
                            <Text style={[styles.title, {paddingTop: smallScreen ? 50 : 30}]}> Programa tu cita </Text>
                            <Text style={[styles.subtitle, {paddingVertical: 10}]}> Selecciona el día y hora del servicio </Text>

                            <View style={[styles.titleBorder, { flexDirection: 'row', justifyContent: 'space-between'}]}>
                                <Text style={styles.subtitle}>Agendar día</Text>
                                <TouchableOpacity onPress={() => this._openDatePicker()}>
                                    <Text style={styles.datetimeText}>{this._dateFormat()}</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={[styles.titleBorder, { flexDirection: 'row', justifyContent: 'space-between', paddingTop: 15}]}>
                                <Text style={styles.subtitle}>Selecciona hora</Text>
                                <TouchableOpacity onPress={() => this._openTimePicker()}>
                                    <Text style={styles.datetimeText}>{this._timeFormat()}</Text>
                                </TouchableOpacity>
                            </View>

                            <Text style={[styles.title, { paddingTop: 20 }]}> Domicilio </Text>
                            <Text style={[styles.subtitle, { paddingTop: 10 }]}>Confirma el domicilio a limpiar</Text>

                            <Block row style={{ width: width - theme.SIZES.BASE * 4, paddingVertical: 15, paddingHorizontal: 25, justifyContent: 'center', alignItems: 'center' }}>
                                { propertyInfo != null && this.propertyTypeImage(propertyInfo.property_type_id) }

                                <Text style={[styles.subtitle, {paddingHorizontal: 15}]} color={nowTheme.COLORS.SECONDARY}>
                                    {propertyInfo != null && propertyInfo.name}
                                </Text>
                            </Block>

                            <Block middle style={{ width: width - theme.SIZES.BASE * 4 }}>
                                <Button
                                    round
                                    color={nowTheme.COLORS.BASE}
                                    style={styles.createButton}
                                    onPress={() => this._handleNextAction()}>
                                    <Text style={{ fontFamily: 'trueno-semibold' }} size={14} color={nowTheme.COLORS.WHITE}>
                                        SIGUIENTE
                                    </Text>
                                </Button>
                            </Block>
                        </Block>
                    </Block>
                </ScrollView>

                <Modal
                    animationType="slide"
                    transparent
                    visible={showDateTime && isIphone}
                    presentationStyle="overFullScreen">
                    <View style={{ flex: 1, height: height, backgroundColor: 'rgba(0,0,0,.2)', justifyContent: 'flex-end', flexDirection: 'column',}}>
                        <View style={{ backgroundColor: 'white', padding: 15, paddingBottom: 30,}}>
                            <View>
                                <DatePickerIOS date={this.state.date} onDateChange={this.setDateTime} />
                            </View>
                            <Block middle style={{alignItems: 'center' }}>
                                <Button
                                    round
                                    color={nowTheme.COLORS.BASE}
                                    style={styles.createButton}
                                    onPress={() => this.setState({ showDateTime: false })}>
                                    <Text style={{ fontFamily: 'trueno-semibold' }} size={14} color={nowTheme.COLORS.WHITE}>ENTENDIDO</Text>
                                </Button>
                            </Block>
                        </View>
                    </View>
                </Modal>
            </Block>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: Platform.OS === 'android' ? - HeaderHeight : - HeaderHeight,
    },
    padded: {
        paddingHorizontal: theme.SIZES.BASE * 2,
        bottom: Platform.OS === 'android' ? theme.SIZES.BASE * 2 : theme.SIZES.BASE * 3,
    },

    image: {
        width       : width,
        height      : 350,
        marginTop   : smallScreen ? 30 : 70,
    },
    title: {
        fontFamily: 'trueno-extrabold',
        paddingHorizontal: 20,
        fontSize: 30,
        fontWeight: '700',
        textAlign: 'center',
    },
    titleBorder: {
        borderBottomWidth: 1,
        borderBottomColor: '#E3E3E3'
    },
    subtitle: {
        fontFamily: 'trueno',
        textAlign: 'center',
        fontSize: 16,
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
    icons: {
        marginRight: 20,
        width: 25,
        height: 25,
    },
    labels: {
        fontFamily: 'trueno-semibold',
        fontSize: 16,
        width: 150,
        marginRight: 20,
    },

    buttonModalConfirmStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        width: width * 0.5,
        marginHorizontal: 30,
        height: 41
    },
    buttonTextStyle: {
        backgroundColor: nowTheme.COLORS.BASE,
        fontFamily: 'trueno-semibold',
        fontStyle: 'normal',
        fontSize: 12,
        lineHeight: 15,
        color: '#FFF',
    },
    createButton: {
        width: width * 0.5,
        marginTop: 10,
        marginBottom: 10
    },
});