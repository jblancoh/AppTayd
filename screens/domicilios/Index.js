import React from "react";
import {
    Image,
    StyleSheet,
    StatusBar,
    Dimensions,
    Text, View, Alert
} from "react-native";
import { Block, Button, theme } from "galio-framework";

const { height, width } = Dimensions.get("screen");

import nowTheme from "../../constants/Theme";
import Images from "../../constants/Images";
import Actions from "../../lib/actions";
import PropertyService from "../../services/property";

class DomicilioIndexScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userData: null,
            properties : []
        }
    }

    componentWillMount() {
        Actions.extractUserData().then((result) => {
            if (result != null) {
                this.setState({userData : result.user});
                this._getProperties();
            }
        });
    }

    async _getProperties() {
        await PropertyService.getUserProperties(this.state.userData.id)
            .then(response => {
                this.setState({properties : response})
            })
            .catch(error => {
                console.error(error);
                Alert.alert("No se encontraron domicilios vinculados a este usuario.");
            })
    }

    render() {
        const { navigation } = this.props;

        return (
            <Block flex style={styles.container}>
                <StatusBar barStyle="light-content" />
                <Block flex space="between" style={styles.padded}>
                    {
                        this.state.properties.map((item) => {
                            return (
                                <Block middle style={styles.cardContainer} key={item.id}>
                                    <View style={{ width: width - theme.SIZES.BASE * 4, flexDirection: 'row', justifyContent: 'flex-end', paddingTop: 10, paddingRight: 10 }}>
                                        {item.is_predetermined == true && (<Image source={require('../../assets/icons/success.png')} style={{ width: 25, height: 25 }} />)}
                                    </View>

                                    <Block row style={[{ width: width - theme.SIZES.BASE * 4, paddingBottom: 10, paddingHorizontal: 15, alignItems: 'center' }, !item.is_predetermined && {paddingTop: 25}]}>
                                        <View style={{ paddingHorizontal: 25 }}>
                                            {item.property_type_id == 1 && (<Image source={Images.Icons.Casa} style={styles.imageProperty} />) }
                                            {item.property_type_id == 2 && (<Image source={Images.Icons.Departamento} style={styles.imageProperty} />)}
                                            {item.property_type_id == 3 && (<Image source={Images.Icons.Oficina} style={styles.imageProperty} />)}
                                        </View>

                                        <View style={{ width: 150, marginTop: -15 }}>
                                            <Text style={[styles.title]}>
                                                {item.property_type.name}
                                            </Text>
                                            <Text style={[styles.subtitle]} color={nowTheme.COLORS.SECONDARY}>
                                                {item.name}
                                            </Text>
                                        </View>
                                    </Block>
                                </Block>
                            )
                        })
                    }

                    <Block middle flex style={{justifyContent: 'flex-end'}}>
                        <Button
                            round
                            color={nowTheme.COLORS.WHITE}
                            style={styles.button}
                            onPress={() => navigation.navigate('Home')}>
                            <Text style={{ fontFamily: 'trueno-semibold', color: nowTheme.COLORS.BASE, }} size={14}>
                                AGREGAR DOMICILIO  +
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

        marginBottom: 20,
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
        fontFamily: 'trueno',
        fontSize: 14,
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
    imageProperty: {
        width: 65,
        height: 65
    }
});

export default DomicilioIndexScreen;
