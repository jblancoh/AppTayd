import React from 'react';
import { Image, StyleSheet, StatusBar, Dimensions, Platform, TouchableHighlight, View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Block, Button, Text, theme, Toast } from 'galio-framework';
import { Icon } from '../../components';
import { HeaderHeight } from '../../constants/utils';

const { height, width } = Dimensions.get('screen');
import { Images, nowTheme } from '../../constants/';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class AgendaFechaScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showDateTime    : false,
            isIphone        : Platform.OS === 'ios',
            datetime        : new Date(),
        };
    }

    onChange = (event, selectedDate) => {
        this.setState({showDateTime : false});
        if (event.type == "set") {
            this.setState({ datetime: selectedDate });
        }
    };

    _handleUploadProperty() {
        this.props.navigation.navigate("Home");
    }

    render() {
        const { showDateTime, isIphone } = this.state;
        return (
            <Block flex style={styles.container}>
                <StatusBar barStyle="light-content" />
                <Block flex>
                    <Image source={Images.AgendaFecha} style={styles.image} />
                </Block>

                <Block flex style={{ backgroundColor: 'white' }}>
                    <Block space="between" style={styles.padded}>
                        <Block>
                            <Text style={[styles.title, {paddingTop: 20}]}> Agendar cita </Text>

                            <View style={[{ justifyContent: 'center', alignContent: 'center', paddingTop: 5, paddingBottom: 15, backgroundColor: 'purple' }]}>
                                <TouchableOpacity onPress={() => this.setState({showDateTime : true})}>
                                    <Text>Seleccionar fecha</Text>
                                </TouchableOpacity>

                                {(showDateTime && !isIphone) && (
                                    <DateTimePicker
                                        value={this.state.datetime}
                                        mode="date"
                                        timeZoneOffsetInMinutes={0}
                                        display="default"
                                        onChange={() => this.onChange}
                                    />
                                )}
                            </View>

                            <Block middle style={{ width: width - theme.SIZES.BASE * 4, paddingVertical: 15 }}>
                                <Text style={[styles.subtitle, styles.titleBorder, {fontWeight: '700', paddingHorizontal: 30}]} color={nowTheme.COLORS.BASE}>
                                    Domingo, 15 de marzo de 2020, 2:00 p.m.
                                </Text>
                            </Block>

                            <Text style={[styles.title, { paddingTop: 20 }]}> Domicilio </Text>

                            <Block row style={{ width: width - theme.SIZES.BASE * 4, paddingVertical: 15, justifyContent: 'center', alignContent: 'center' }}>
                                <Text style={[styles.subtitle]} color={nowTheme.COLORS.SECONDARY}>
                                    Av. Paseo Tabasco 1234567 C.P. 20990 Esq. Av. Ruiz Cortines
                                </Text>

                                <Icon
                                    size={22}
                                    color={nowTheme.COLORS.SECONDARY}
                                    name="chevron-right"
                                    family="FontAwesome"
                                    onPress={() => this.askPermissions()}
                                />
                            </Block>

                            <Block middle style={{ width: width - theme.SIZES.BASE * 4 }}>
                                <Button
                                    round
                                    color={nowTheme.COLORS.BASE}
                                    style={styles.createButton}
                                    loading={this.state.isLoading}
                                    disabled={this.state.isLoading}
                                    onPress={() => this._handleUploadProperty()}>
                                    <Text style={{ fontFamily: 'montserrat-bold' }} size={14} color={nowTheme.COLORS.WHITE}>
                                        SIGUIENTE
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
        width       : width,
        height      : 350,
        marginTop   : 70
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
        marginTop: 20,
        marginBottom: 10
    },
});