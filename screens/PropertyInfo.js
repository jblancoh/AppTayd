import React from 'react';
import { Image, StyleSheet, StatusBar, Dimensions, Platform, TouchableHighlight, View } from 'react-native';
import { Block, Button, Text, theme, Toast } from 'galio-framework';
import { HeaderHeight } from '../constants/utils';
import Actions from '../lib/actions';

const { height, width } = Dimensions.get('screen');
import { Images, nowTheme } from '../constants/';
import Counter from '../components/Counter';
import PropertyType from '../components/PropertyTypes';
import PropertyService from '../services/property';

export default class PropertyInfoScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userData        : null,
            isLoading       : false,

            propertyTypeValue: null,
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

    componentWillMount() {
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

    updatePropertyType = (value) => {
        this.setState({ propertyTypeValue: value });
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
        return(
            <Block flex style={styles.container}>
                <StatusBar barStyle="dark-content" />
                <Block flex style={{ backgroundColor: 'white'}}>
                    <Block space="between" style={styles.padded}>
                        <Block>
                            <Text style={[styles.title, {paddingVertical: 10}]}> Tipo de domicilio </Text>

                            <View style={[{ justifyContent: 'center', alignContent: 'center', paddingTop: 5, paddingBottom: 15 }, styles.titleBorder]}>
                                <PropertyType value={this.state.propertyTypeValue} updateValue={this.updatePropertyType} />
                            </View>

                            <Block middle style={{ width: width - theme.SIZES.BASE * 4, paddingTop: 15}}>
                                <Text style={[styles.title]}> Inmueble </Text>

                                <Text style={styles.subtitle} color={nowTheme.COLORS.SECONDARY}>
                                    Selecciona las áreas idóneas a limpiar
                                </Text>
                            </Block>

                            <Block row style={{ marginTop: theme.SIZES.BASE * 0.8}}>
                                <View style={styles.itemContainer}>
                                    <Image style={styles.icons} source={this.state.habitaciones > 0 ? Images.Icons.Habitacion : Images.Icons.Habitacion_G} />
                                    <Text style={styles.labels} color={nowTheme.COLORS.PLACEHOLDER}>Habitaciones</Text>
                                    <Counter label="habitaciones" updateValue={(value, label) => this.updatePropertyInfo(value, label)} />
                                </View>
                            </Block>

                            <Block row style={{ marginTop: theme.SIZES.BASE * 0.8}}>
                                <View style={styles.itemContainer}>
                                    <Image style={styles.icons} source={this.state.banos > 0 ? Images.Icons.Bano : Images.Icons.Bano_G} />
                                    <Text style={styles.labels} color={nowTheme.COLORS.PLACEHOLDER}>Baños</Text>
                                    <Counter label="banos" updateValue={(value, label) => this.updatePropertyInfo(value, label)} />
                                </View>
                            </Block>

                            <Block row style={{ marginTop: theme.SIZES.BASE * 0.8}}>
                                <View style={styles.itemContainer}>
                                    <Image style={styles.icons} source={this.state.sala > 0 ? Images.Icons.Sala : Images.Icons.Sala_G} />
                                    <Text style={styles.labels} color={nowTheme.COLORS.PLACEHOLDER}>Sala</Text>
                                    <Counter label="sala" updateValue={(value, label) => this.updatePropertyInfo(value, label)} />
                                </View>
                            </Block>

                            <Block row style={{ marginTop: theme.SIZES.BASE * 0.8}}>
                                <View style={styles.itemContainer}>
                                    <Image style={styles.icons} source={this.state.comedor > 0 ? Images.Icons.Comedor : Images.Icons.Comedor_G} />
                                    <Text style={styles.labels} color={nowTheme.COLORS.PLACEHOLDER}>Comedor</Text>
                                    <Counter label="comedor" updateValue={(value, label) => this.updatePropertyInfo(value, label)} />
                                </View>
                            </Block>

                            <Block row style={{ marginTop: theme.SIZES.BASE * 0.8}}>
                                <View style={styles.itemContainer}>
                                    <Image style={styles.icons} source={this.state.cocina > 0 ? Images.Icons.Cocina : Images.Icons.Cocina_G} />
                                    <Text style={styles.labels} color={nowTheme.COLORS.PLACEHOLDER}>Cocina</Text>
                                    <Counter label="cocina" updateValue={(value, label) => this.updatePropertyInfo(value, label)} />
                                </View>
                            </Block>

                            <Block row style={{ marginTop: theme.SIZES.BASE * 0.8}}>
                                <View style={styles.itemContainer}>
                                    <Image style={styles.icons} source={this.state.garage > 0 ? Images.Icons.Garage : Images.Icons.Garage_G} />
                                    <Text style={styles.labels} color={nowTheme.COLORS.PLACEHOLDER}>Garage</Text>
                                    <Counter label="garage" updateValue={(value, label) => this.updatePropertyInfo(value, label)} />
                                </View>
                            </Block>

                            <Block row style={{ marginTop: theme.SIZES.BASE * 0.8}}>
                                <View style={styles.itemContainer}>
                                    <Image style={styles.icons} source={this.state.patio > 0 ? Images.Icons.Patio : Images.Icons.Patio_G} />
                                    <Text style={styles.labels} color={nowTheme.COLORS.PLACEHOLDER}>Patio</Text>
                                    <Counter label="patio" updateValue={(value, label) => this.updatePropertyInfo(value, label)} />
                                </View>
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