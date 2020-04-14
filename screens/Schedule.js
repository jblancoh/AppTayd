import React from "react";
import { StyleSheet, Dimensions, ScrollView, Image, StatusBar, View } from "react-native";
import { Block, theme, Text, Button } from "galio-framework";

import { CardFullImage, TabBar } from "../components";
import { Images, nowTheme } from '../constants/';
import { TouchableOpacity } from "react-native-gesture-handler";

const { width, height } = Dimensions.get("screen");

class Schedule extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showMore    : false,
            showInfo    : false,
        }
    }
    renderBlocks = () => {
        return (
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.blocksContainer}>
                <Block flex>
                    <StatusBar barStyle="light-content" />
                    <Block flex row style={{ paddingTop: 30 }}>
                        <Image source={Images.ProfilePicture} style={{ borderRadius: 50, height: 60, width: 60, marginRight: 25 }} />
                        <Block flex>
                            <Text style={styles.nameTitle}>Agenda de Chris</Text>
                            <Text style={styles.subtitle}>Revisa tus citas programadas</Text>
                        </Block>
                    </Block>

                    {
                        !this.state.showMore ? (
                            <Block>
                                <TouchableOpacity onPress={() => this.setState({showMore : true})}>
                                    <CardFullImage image={Images.Agendar} imageStyle={{ height: height * 0.62, width: '100%' }} />
                                </TouchableOpacity>

                                <Block flex style={{paddingVertical: 20, paddingHorizontal: 45}}>
                                    <Text style={[styles.footerTitle, { textAlign: 'center',}]}>Comienza la experiencia TAYD agendando una cita</Text>
                                </Block>
                            </Block>
                        ) : (
                            <Block flex style={{marginTop: 20}}>
                                <Block middle style={styles.cardContainer}>
                                    <Block row style={{ width: width - theme.SIZES.BASE * 3, paddingVertical: 20, paddingHorizontal: 10 }}>
                                        <Block style={{ justifyContent: 'flex-start', alignContent: 'center' }}>
                                            <Image source={Images.Icons.Calendario} style={{ width: 65, height: 65 }} />
                                        </Block>

                                        <View style={{ width: 250, paddingHorizontal: 15 }}>
                                            <Text style={[styles.scheduleTitle]}>
                                                Próxima cita...
                                            </Text>
                                            <Block middle style={[styles.section, this.state.showInfo && styles.divider]}>
                                                <Text style={[styles.scheduleSubtitle]} color={nowTheme.COLORS.SECONDARY}>
                                                    Domingo, 15 de marzo de 2020, 2:00 p.m.
                                                </Text>

                                                {
                                                    !this.state.showInfo && (
                                                        <TouchableOpacity onPress={() => this.setState({ showInfo: true })}>
                                                            <Image source={Images.Icons.FlechaAbajo} style={{ width: 25, height: 25 }} />
                                                        </TouchableOpacity>
                                                    )
                                                }
                                            </Block>

                                            {
                                                this.state.showInfo && (
                                                    <View>
                                                        <Block style={styles.divider}>
                                                            <Text style={[styles.scheduleSubtitleBold]} color={nowTheme.COLORS.SECONDARY}>
                                                                Recuerda  estar al pendiente de la llegada de nuestro TAYDER a tu domicilio
                                                                y no olvides revisar y calificar al final de las actividades de limpieza de nuestro servicio

                                                                Recuerda que solicitaste nuestros insumos, así que no te preocupes en absoluto y solo disfruta
                                                                cómodamente de TAYD.
                                                            </Text>
                                                        </Block>

                                                        <Text style={styles.scheduleSubtitleBold}>Estatus:</Text>

                                                        <Block middle style={[styles.section, { alignItems: 'flex-end' }]}>
                                                            <Text style={styles.scheduleSubtitleBoldRed}>PENDIENTE</Text>

                                                            <TouchableOpacity style={{marginLeft: 20}} onPress={() => this.setState({ showInfo: false })}>
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
                    }
                </Block>
            </ScrollView>
        );
    };

    render() {
        return (
            <Block flex center style={styles.home}>
                {this.renderBlocks()}

                {
                    this.state.showMore && (
                        <Block middle flex style={{ justifyContent: 'flex-end', paddingBottom: 20 }}>
                            <Button
                                round
                                color={nowTheme.COLORS.BACKGROUND}
                                style={styles.button}
                                onPress={() => this.props.navigation.navigate('AgendaFecha')}>
                                <Text style={{ fontFamily: 'trueno-semibold', color: nowTheme.COLORS.BASE, }} size={14}>
                                    AGENDAR UNA CITA  +
                                </Text>
                            </Button>
                        </Block>
                    )
                }
                <TabBar {...this.props} activeScreen="agenda" />
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
    footerTitle: {
        fontFamily: 'trueno',
        fontSize: 16,
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
    scheduleTitle: {
        fontFamily: 'trueno-extrabold',
        color: nowTheme.COLORS.SECONDARY,
        fontSize: 24,
        textAlign: 'left',
    },
    scheduleSubtitle: {
        fontFamily: 'trueno',
        fontSize: 14,
        color: nowTheme.COLORS.SECONDARY,
        textAlign: 'left',
    },
    scheduleSubtitleBold: {
        fontFamily: 'trueno-extrabold',
        color: nowTheme.COLORS.SECONDARY,
        fontSize: 14,
        textAlign: 'left',
    },
    scheduleSubtitleBoldRed: {
        fontFamily: 'trueno-extrabold',
        color: nowTheme.COLORS.BASE,
        fontSize: 18,
        textAlign: 'left',
        width: width * 0.5,
    },

    section: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    divider: {
        borderBottomColor: nowTheme.COLORS.SECONDARY,
        borderBottomWidth: 1,
        paddingBottom: 15,
        marginBottom: 15,
    },
    button: {
        width: width * 0.7,
        height: theme.SIZES.BASE * 2.5,
        marginTop: 10,
        marginBottom: 10,

        shadowRadius: 0,
        shadowOpacity: 0,

        borderColor: nowTheme.COLORS.BASE,
        borderWidth: 1,
    },
});

export default Schedule;
