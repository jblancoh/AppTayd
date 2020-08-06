import React from "react";
import { StyleSheet, Dimensions, ScrollView, Image, StatusBar, View } from "react-native";
import { Block, theme, Text, Button } from "galio-framework";

import { TabBar } from "../components";
import { Images, nowTheme } from '../constants/';
import { TouchableOpacity } from "react-native-gesture-handler";

import Actions from "../lib/actions";
import ServicesService from "../services/service";

const { width, height } = Dimensions.get("screen");
const smallScreen = height < 812 ? true : false;

class History extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showInfo    : false,
            services    : [],
            userData    : null,
            weekDay     : ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
            months      : ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"],
        };
    }

    async componentDidMount() {
        const { navigation } = this.props;

        await  Actions.extractUserData().then((result) => {
             if(result != null) {
                 this.setState({userData : result.user});
                 this._getServices();
             }
        });

        this.focusListener = await navigation.addListener('didFocus', () => {
            this._getServices();
        });
    }

    componentWillUnmount() {
        this.focusListener.remove();
    }

    async _getServices() {
        await ServicesService.listHistory(this.state.userData.id)
            .then(response => {
                this.setState({services : response})
            })
            .catch(error => {
                console.error(error);
                Alert.alert("No se encontraron servicios vinculados a este usuario.");
            })
    }

    propertyTypeImage(id) {
        switch(id) {
            case 1: return (<Image source={Images.Icons.Casa} style={{ width: 65, height: 65 }} />)
            case 2: return (<Image source={Images.Icons.Departamento} style={{ width: 65, height: 65 }} />)
            case 3: return (<Image source={Images.Icons.Oficina} style={{ width: 65, height: 65 }} />)
        }
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

    _getPropertyDistribution(item) {
        let strDistribution = "";

        item.distribution.map(item => {
            strDistribution += `${item.quantity} ${item.name} \n`;
        });

        return strDistribution;
    }

    renderBlocks = () => {
        return (
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.blocksContainer}>
                <Block flex>
                    <Block flex row style={{ paddingTop: 10 }}>
                        <Image source={Images.ProfilePicture} style={{ borderRadius: 50, height: 60, width: 60, marginRight: 25 }} />
                        <Block flex>
                            <Text style={styles.nameTitle}>Historial de Chris</Text>
                            <Text>Revisa el historial de servicios TAYD</Text>
                        </Block>
                    </Block>

                    {
                        this.state.services.length == 0 && (
                            <Block flex style={styles.emptyContainer}>
                                <Text style={styles.redText}>Aún no cuentas con historial</Text>
                            </Block>
                        )
                    }

                    <View style={{height: smallScreen ? height * 0.8 : height * 0.73}}>
                        <ScrollView>
                            {
                                this.state.services.map((item) => {
                                    return (
                                        <Block key={item.id} flex style={{marginTop: 20}}>
                                            <Block middle style={styles.cardContainer}>
                                                <Block row style={{ width: width - theme.SIZES.BASE * 3, paddingVertical: 20, paddingHorizontal: 10}}>
                                                    <Block style={{justifyContent: 'flex-start', alignContent: 'center'}}>
                                                        {this.propertyTypeImage(item.property_type_id)}
                                                    </Block>

                                                    <View style={{ width: 250, paddingHorizontal: 15}}>
                                                        <Text style={[styles.historyTitle]}>{item.property_type_name}</Text>
                                                        <Text style={[styles.historySubtitle, styles.divider]} color={nowTheme.COLORS.SECONDARY}>
                                                            {item.property_name}
                                                        </Text>
                                                        <Block middle style={[styles.section, {width: '93%'}, this.state.showInfo && styles.divider]}>
                                                            <Text style={[styles.historySubtitleBold]} color={nowTheme.COLORS.SECONDARY}>
                                                                { this.formatDateTime(item) }
                                                            </Text>

                                                            {
                                                                !this.state.showInfo && (
                                                                    <TouchableOpacity onPress={() => this.setState({ showInfo: true })}>
                                                                        <Image source={Images.Icons.FlechaAbajo} style={{ width: 25, height: 25, marginLeft: 10 }} />
                                                                    </TouchableOpacity>
                                                                )
                                                            }
                                                        </Block>
                                                        
                                                        {
                                                            this.state.showInfo && (
                                                                <View>
                                                                    <Block style={styles.divider}>
                                                                        <Text style={[styles.historySubtitle]} color={nowTheme.COLORS.SECONDARY}>
                                                                            { this._getPropertyDistribution(item) }
                                                                        </Text>
                                                                    </Block>
                                                                    <Text style={[styles.historySubtitle, styles.divider]} color={nowTheme.COLORS.SECONDARY}>
                                                                        {`${item.stripe_source_brand}\n${item.stripe_source_number}\n${item.stripe_source_name}`}
                                                                    </Text>
                                                                    <Block style={styles.divider}>
                                                                        <View style={styles.section}>
                                                                            <Text style={styles.historySubtitle}>Subtotal</Text>
                                                                            <Text style={styles.historySubtitle}>${parseFloat(item.total - item.discount).toFixed(2)}</Text>
                                                                        </View>
                                                                        <View style={[styles.section]}>
                                                                            <Text style={styles.historySubtitle}>Cupón</Text>
                                                                            <Text style={styles.historySubtitle}>${item.discount}</Text>
                                                                        </View>
                                                                        <View style={[styles.section]}>
                                                                            <Text style={styles.historySubtitleBold}>Total</Text>
                                                                            <Text style={styles.historySubtitleBold}>${parseFloat(item.total).toFixed(2)}</Text>
                                                                        </View>
                                                                    </Block>

                                                                    <Text style={styles.historySubtitleBold}>TAYDER:</Text>
                                                                    <Text style={styles.historySubtitle}>{item.provider_user_name}</Text>

                                                                    <Block middle style={[styles.section, {alignItems: 'flex-end'}]}>
                                                                        <Button
                                                                            round
                                                                            color={nowTheme.COLORS.BASE}
                                                                            style={styles.button}
                                                                            onPress={() => this._handleNextAction()}>
                                                                            <Text style={{ fontFamily: 'trueno-semibold' }} size={14} color={nowTheme.COLORS.WHITE}>
                                                                                Quejas o sugerencias
                                                                            </Text>
                                                                        </Button>

                                                                        <TouchableOpacity style={{marginLeft: 20, marginBottom: 10}} onPress={() => this.setState({showInfo : false})}>
                                                                            <Image source={Images.Icons.FlechaArriba} style={{ width: 25, height: 25 }} />
                                                                        </TouchableOpacity>
                                                                    </Block>
                                                                </View>
                                                            )
                                                        }
                                                    </View>
                                                </Block>
                                            </Block>
                                        </Block>
                                    )
                                })
                            }
                        </ScrollView>
                    </View>

                </Block>
            </ScrollView>
        );
    };

    render() {
        return (
            <Block flex center style={styles.home}>
                {this.renderBlocks()}

                <TabBar {...this.props} activeScreen="history" />
            </Block>
        );
    }
}

const styles = StyleSheet.create({
    home: {
        width: width,
        backgroundColor: nowTheme.COLORS.BACKGROUND,
    },
    nameTitle: {
        fontFamily: 'trueno-extrabold',
        fontSize: 24,
        color: nowTheme.COLORS.SECONDARY,
        lineHeight: 29,
    },
    subtitle: {
        fontFamily: 'trueno',
        fontSize: 14,
        lineHeight: 15,
        color: nowTheme.COLORS.SECONDARY,
    },
    blocksContainer: {
        width: width - theme.SIZES.BASE * 2,
        paddingVertical: theme.SIZES.BASE,
        paddingHorizontal: 2,
    },

    cardContainer: {
        backgroundColor: nowTheme.COLORS.WHITE,
        borderRadius: 25,
        shadowColor: nowTheme.COLORS.BLACK,
        shadowOffset: {
            width: 0,
            height: 4
        },
        shadowRadius: 8,
        shadowOpacity: 0.1,
        elevation: 1,
        overflow: 'hidden',
    },
    historyTitle: {
        fontFamily: 'trueno-extrabold',
        color: nowTheme.COLORS.SECONDARY,
        fontSize: 24,
        textAlign: 'left',
    },
    historySubtitle: {
        fontFamily: 'trueno-light',
        fontSize: 16,
        color: nowTheme.COLORS.SECONDARY,
        textAlign: 'left',
    },
    historySubtitleBold: {
        fontFamily: 'trueno-semibold',
        color: nowTheme.COLORS.SECONDARY,
        fontSize: 14,
        textAlign: 'left',
    },
    section: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    emptyContainer: {
        backgroundColor: nowTheme.COLORS.WHITE,
        borderRadius: 25,
        shadowColor: nowTheme.COLORS.BLACK,
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowRadius: 3,
        shadowOpacity: 0.2,
        elevation: 3,

        marginTop: 30,
        marginBottom: 30,
    },
    redText: {
        fontFamily: 'trueno',
        fontSize: 14,
        fontWeight: '500',
        lineHeight: 15,
        color: nowTheme.COLORS.BASE,

        paddingVertical: 10,
        textAlign: 'center',
    },

    divider: {
        borderBottomColor: '#E3E3E3',
        borderBottomWidth: 1,
        paddingBottom: 15,
        marginBottom: 15,
    },
    button: {
        width: width * 0.5,
        height: theme.SIZES.BASE * 2,
        marginTop: 10,
        marginBottom: 10,
    }
});

export default History;
