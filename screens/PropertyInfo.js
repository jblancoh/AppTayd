import React from 'react';
import { Image, StyleSheet, StatusBar, Dimensions, Platform, ScrollView, View } from 'react-native';
import { Block, Button, Text, theme, Toast } from 'galio-framework';
import { HeaderHeight } from '../constants/utils';
import Actions from '../lib/actions';

const { height, width } = Dimensions.get('screen');
import { nowTheme } from '../constants/';
import PropertyCounter from '../components/PropertyCounter';
import PropertyType from '../components/PropertyTypes';
import PropertyService from '../services/property';

export default class PropertyInfoScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userData        : null,
            isLoading       : false,

            propertyTypeValue: null,
            propertyItems   : [],
            habitaciones    : 0,
            banos           : 0,
            sala            : 0,
            comedor         : 0,
            cocina          : 0,
            garage          : 0,
            patio           : 0,

            address         : this.props.navigation.state.params.address,
            location        : this.props.navigation.state.params.location,
        };
    }

    componentDidMount() {
        Actions.extractUserData().then((result) => {
            if (result != null) {
                this.setState({userData: result.user});
            }
        });
    }

    updatePropertyInfo = (value, label) => {
        switch(label) {
            case "habitaciones":
                this.setState({habitaciones : value});
                break;

            case "banos":
                this.setState({ banos: value });
                break;

            case "sala":
                this.setState({ sala: value });
                break;

            case "comedor":
                this.setState({ comedor: value });
                break;

            case "cocina":
                this.setState({ cocina: value });
                break;

            case "garage":
                this.setState({ garage: value });
                break;

            case "patio":
                this.setState({ patio: value });
                break;
        }
    }

    updatePropertyType = (value, arrPrices) => {
        console.log(arrPrices);
        this.setState({ propertyTypeValue: value, propertyItems: arrPrices });
    }

    async _handleUploadProperty() {
        this.setState({ isLoading: true });

        let params = {
            user_id             : this.state.userData.id,
            name                : this.state.address,
            latitude            : this.state.location.latitude.toString(),
            altitude            : this.state.location.longitude.toString(),
            is_predetermined    : true,
            rooms_qty           : this.state.habitaciones,
            bathrooms_qty       : this.state.banos,
            living_room_qty     : this.state.habitaciones,
            dinning_room_qty    : this.state.comedor,
            kitchen_qty         : this.state.cocina,
            garage_qty          : this.state.garage,
            backyard_qty        : this.state.patio,
            floors_qty          : 1,
            property_type_id    : this.state.propertyTypeValue
        };

        await PropertyService.store(params)
            .then(async (response) => {
                this.setState({ isLoading: false });
                this.props.navigation.navigate('Home')
            })
            .catch(error => {
                this.setState({ isLoading: false });
                Alert.alert('Upps!', 'Correo o contraseña incorrectas.');
            });
    }

    render() {
        let {propertyTypeValue, propertyItems, isLoading} = this.state;
        return (
            <Block flex style={styles.container}>
                <StatusBar barStyle="dark-content" />
                <Block flex style={{ backgroundColor: 'green'}}>
                    <ScrollView contentContainerStyle={{flex: 1}}>
                        <Block space="between" style={styles.padded}>
                            <Block style={{backgroundColor: 'red'}}>
                                <Text style={[styles.title, {paddingVertical: 10}]}> Tipo de domicilio </Text>

                                <View style={[{ justifyContent: 'center', alignContent: 'center', paddingTop: 5, paddingBottom: 15 }, styles.titleBorder]}>
                                    <PropertyType value={propertyTypeValue} updateValue={this.updatePropertyType} />
                                </View>

                                <Block middle style={{ width: width - theme.SIZES.BASE * 4, paddingTop: 15}}>
                                    <Text style={[styles.title]}> Inmueble </Text>

                                    <Text style={styles.subtitle} color={nowTheme.COLORS.SECONDARY}>
                                        Selecciona las áreas idóneas a limpiar
                                    </Text>
                                </Block>

                                <View style={{flex: 1, backgroundColor: 'pink'}}>
                                    {
                                        propertyItems.map((value) => {
                                            return <PropertyCounter id={value.id} label={value.key} price={value.price} />
                                        })
                                    }
                                </View>

                                <Block middle style={{ width: width - theme.SIZES.BASE * 4 }}>
                                    <Button
                                        round
                                        color={nowTheme.COLORS.BASE}
                                        style={styles.createButton}
                                        loading={isLoading}
                                        disabled={isLoading}
                                        onPress={() => this._handleUploadProperty()}>
                                        <Text style={{ fontFamily: 'montserrat-bold' }} size={14} color={nowTheme.COLORS.WHITE}>
                                            SIGUIENTE
                                        </Text>
                                    </Button>
                                </Block>
                            </Block>
                        </Block>
                    </ScrollView>
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
        zIndex: 3,
        position: 'absolute',
        bottom: Platform.OS === 'android' ? theme.SIZES.BASE * 2 : theme.SIZES.BASE * 3,
    },

    image: {
        width: 480,
        height: 280,
        bottom: 10
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