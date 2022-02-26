import React from 'react';
import { Image, StyleSheet, Dimensions, Platform, View, ScrollView, Modal, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Block, Button, Text, theme } from 'galio-framework';
import moment from 'moment';

import { Images, nowTheme } from '../../constants';
import { HeaderHeight, iPhoneX } from '../../constants/utils';
import Actions from "../../lib/actions";

const { height, width } = Dimensions.get('screen');
const smallScreen = height < 812 ? true : false;

export default class VehicleDateTimeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showDate: false,
            showTime: false,
            showDateTime: false,
            isIphone: Platform.OS === 'ios',
            date: new Date(),
            time: new Date(),
            weekDay: ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"],
            months: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
        };
    }

    async componentDidMount() {
        this.state.date.setHours(this.state.date.getHours() + 2);
        this.state.time.setHours(this.state.time.getHours() + 2, this.state.time.getMinutes() + 1)
        this.setState({
            date: this.state.date,
            time: this.state.time
        });
        this.focusListener = await this.props.navigation.addListener('focus', () => {
            this.state.date.setHours(this.state.date.getHours() + 2);
            this.state.time.setHours(this.state.time.getHours() + 2, this.state.time.getMinutes() + 1)
            this.setState({
                date: this.state.date,
                time: this.state.time
            });
        });
        this.blurListener = await this.props.navigation.addListener('blur', () => {
            this.setState({
                date: new Date(),
                time: new Date(),
            });
        });
    }

    componentWillUnmount() {
        this.focusListener()
        this.blurListener()

    }

    _validateDateTime() {
        let { date, time } = this.state;
        let _month = date.getMonth() <= 8 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
        let _day = date.getDate() <= 9 ? `0${date.getDate()}` : date.getDate();
        let _minutes = time.getMinutes() <= 9 ? `0${time.getMinutes()}` : time.getMinutes();
        let _hours = time.getHours() <= 9 ? `0${time.getHours()}` : time.getHours();

        let scheduleStr = `${date.getFullYear()}-${_month}-${_day} ${_hours}:${_minutes}:00`;
        let scheduleDT = moment(scheduleStr.replace(' ', 'T'));
        let nowDT = moment();
        let diffDT = scheduleDT.diff(nowDT, 'hours');

        if (diffDT >= 2)
            return true;
        else
            return false;
    }

    _handleNextAction() {
        if (this._validateDateTime()) {
            this.props.navigation.navigate("VehiculoSeleccion", {
                datetime: {
                    weekDay: this.state.date.getDay(),
                    day: this.state.date.getDate(),
                    month: this.state.date.getMonth(),
                    year: this.state.date.getFullYear(),
                    hour: this.state.time.getHours(),
                    minutes: this.state.time.getMinutes()
                }
            });
        } else {
            Alert.alert("Servicio", "El mínimo de tiempo para solicitar un servicio es de dos horas antes para garantizar el traslado.")
        }
    }

    _dateFormat() {
        let date = this.state.date;
        let week = this.state.weekDay[date.getDay()];
        let month = this.state.months[date.getMonth()];

        return `${week} ${date.getDate()}/${month}/${date.getFullYear()}`;
    }

    _timeFormat() {
        let time = this.state.time;
        let type = "a.m.";
        let minutes = time.getMinutes() < 10 ? `0${time.getMinutes()}` : time.getMinutes();
        let hour = time.getHours();

        if (hour >= 12) {
            if (hour > 12) hour -= 12;
            type = "p.m.";
        }
        return `${hour}:${minutes} ${type}`;
    }

    setDateTime = (event, selectedDate) => {
        this.setState({ date: selectedDate, time: selectedDate });
    }

    _showDateTimeComponent = (type) => {
        if (this.state.isIphone)
            this.setState({ showDateTime: true });
        else if (type == "date")
            this.setState({ showDate: true });
        else if (type == "time")
            this.setState({ showTime: true });
    }

    onChangeDate = (event, selectedDate) => {
        const currentDate = selectedDate || this.state.date;
        this.setState({ showDate: false, date: currentDate, time: currentDate })
    };

    onChangeTime = (event, selectedDate) => {
        const currentDate = selectedDate || this.state.time;
        this.setState({ showTime: false, date: currentDate, time: currentDate })
    };

    render() {
        const { showDateTime, showDate, showTime, isIphone, date, time } = this.state;
        return (
            <Block safe flex>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Block flex={1}>
                        <Image source={Images.AgendaFecha2} style={styles.image} />
                    </Block>

                    <Block flex={2} style={{ backgroundColor: 'white' }}>
                        <Block flex={1} space="between" style={styles.padded}>
                            <Text style={[styles.title, { paddingTop: smallScreen ? 50 : 30 }, { marginTop: iPhoneX && 30 }]}> Programa tu cita </Text>
                            <Text style={[styles.subtitle, { paddingVertical: 10 }]}> Selecciona el día y hora del servicio </Text>

                            <View style={[styles.titleBorder, { flexDirection: 'row', justifyContent: 'space-between' }]}>
                                <Text style={styles.subtitle}>Agendar día</Text>
                                <TouchableOpacity onPress={() => this._showDateTimeComponent("date")}>
                                    <Text style={styles.datetimeText}>{this._dateFormat()}</Text>
                                </TouchableOpacity>
                                {
                                    (showDate && !isIphone) && (
                                        <DateTimePicker
                                            value={date}
                                            mode="date"
                                            display="default"
                                            onChange={this.onChangeDate}
                                        />
                                    )
                                }
                            </View>

                            <View style={[styles.titleBorder, { flexDirection: 'row', justifyContent: 'space-between', paddingTop: 15 }]}>
                                <Text style={styles.subtitle}>Selecciona hora</Text>
                                <TouchableOpacity onPress={() => this._showDateTimeComponent("time")}>
                                    <Text style={styles.datetimeText}>{this._timeFormat()}</Text>
                                </TouchableOpacity>
                                {
                                    (showTime && !isIphone) && (
                                        <DateTimePicker
                                            value={time}
                                            mode="time"
                                            display="default"
                                            onChange={this.onChangeTime}
                                        />
                                    )
                                }
                            </View>

                            <Block middle style={{ width: width - theme.SIZES.BASE * 4, marginTop: 25 }}>
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
                    <View style={{ flex: 1, height: height, backgroundColor: 'rgba(0,0,0,.2)', justifyContent: 'flex-end', flexDirection: 'column', }}>
                        <View style={{ backgroundColor: 'white', padding: 15, paddingBottom: 30, }}>
                            <View>
                                <DateTimePicker
                                    value={date}
                                    mode="datetime"
                                    display="default"
                                    onChange={this.onChangeDate}
                                />
                            </View>
                            <Block middle style={{ alignItems: 'center' }}>
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
    padded: {
        paddingHorizontal: theme.SIZES.BASE * 2,
    },
    image: {
        width: width,
        height: height / 3,
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

    createButton: {
        width: width * 0.5,
        marginTop: 10,
        marginBottom: 10,

        shadowRadius: 0,
        shadowOpacity: 0,
    },
});