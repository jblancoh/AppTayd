import React from 'react';
import { StyleSheet, StatusBar, Dimensions, Platform, ScrollView, View, AsyncStorage } from 'react-native';
import { Block, Button, Text, theme, Toast } from 'galio-framework';
import { HeaderHeight } from '../constants/utils';
import Actions from '../lib/actions';
import { nowTheme } from '../constants/';
import PropertyCounter from '../components/PropertyCounter';
import PropertyType from '../components/PropertyTypes';
import PropertyService from '../services/property';

const { height, width } = Dimensions.get('screen');

export default class PropertyInfoScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userData        : null,
            isLoading       : false,

            propertyTypeValue: null,
            propertyItems   : [],
            propertyData    : [],

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

    updatePropertyInfo = (quantity, data) => {
        let propertyData = this.state.propertyData;
        if(propertyData.length < 1 && quantity > 0) {
            propertyData.push({
                id                      : 0,
                property_type_price_id  : data.id,
                quantity                : quantity
            });

            this.setState({propertyData: propertyData});
        } else if(propertyData.findIndex(item => item.property_type_price_id == data.id) == -1 && quantity > 0) {
            propertyData.push({
                id                      : 0,
                property_type_price_id  : data.id,
                quantity                : quantity
            });

            this.setState({propertyData: propertyData});
        } else if(quantity == 0) {
            let index = propertyData.map(element => element.property_type_price_id).indexOf(data.id);
            propertyData.splice(index, 1);
            this.setState({propertyData: propertyData});
        } else {
            let index = propertyData.map(element => element.property_type_price_id).indexOf(data.id);

            let item = {
                id                      : 0,
                property_type_price_id  : data.id,
                quantity                : quantity
            };

            propertyData.splice(index, 1, item);
            this.setState({propertyData: propertyData});
        }
    }

    updatePropertyType = (value, arrPrices) => {
        this.setState({ propertyTypeValue: value, propertyItems: arrPrices, propertyData: [] });
    }

    async _handleUploadProperty() {
        if(this.state.propertyData.length > 0) {
            this.setState({ isLoading: true });
    
            let params = {
                user_id             : this.state.userData.id,
                name                : this.state.address,
                latitude            : this.state.location.latitude.toString(),
                altitude            : this.state.location.longitude.toString(),
                is_predetermined    : true,
                property_type_id    : this.state.propertyTypeValue,
                distribution        : this.state.propertyData,
                first_login         : true,
            };
    
            await PropertyService.store(params)
                .then(async(response) => {
                    await AsyncStorage.removeItem('user');
                    await AsyncStorage.setItem('user', JSON.stringify(response.user));

                    this.setState({ isLoading: false, propertyTypeValue: null, propertyItems: [], propertyData: [] });
                    this.props.navigation.navigate('Home')
                })
                .catch(error => {
                    this.setState({ isLoading: false });
                    Alert.alert('Upps!', 'No se pudo registrar tu inmueble, vuelve a intentarlo.');
                });
        } else {
            Alert.alert('Upps!', 'Necesitas tener al menos un elemento en tu inmueble.');
        }
    }

    render() {
        let {propertyTypeValue, propertyItems, isLoading} = this.state;
        return (
            <Block flex style={styles.container}>
                <StatusBar barStyle="dark-content" />
                <Block flex>
                        <Block space="between" style={styles.padded}>
                            <Block>
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

                                <View style={{height: height * 0.45}}>
                                    <ScrollView>
                                    {
                                        propertyItems.map((value) => {
                                            return <PropertyCounter key={value.id} id={value.id} label={value.name} price={value.price} value={value.key} getValues={(quantity, data) => this.updatePropertyInfo(quantity, data)} />
                                        })
                                    }
                                    </ScrollView>
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