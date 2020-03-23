import React from 'react';
import { Image, StyleSheet, StatusBar, Dimensions, Platform, TouchableHighlight, View } from 'react-native';
import { Block, Button, Text, theme, Toast } from 'galio-framework';
import { HeaderHeight } from '../constants/utils';

const { height, width } = Dimensions.get('screen');
import { Images, nowTheme } from '../constants/';
import Counter from '../components/Counter';

export default class PropertyInfoScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading       : false,
            habitaciones    : 0,
            banos           : 0,
            sala            : 0,
            comedor         : 0,
            cocina          : 0,
            garage          : 0,
            patio           : 0,

            address         : this.props.navigation.state.params.address,
            location        : this.props.navigation.state.params.location
        };
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

    _handleUploadProperty() {
        this.props.navigation.navigate("Home");
    }

    render() {
        return(
            <Block flex style={styles.container}>
                <StatusBar barStyle="dark-content" />
                <Block flex style={{ backgroundColor: 'white'}}>
                    <Block space="between" style={styles.padded}>
                        <Block>
                            <Block row style={{ justifyContent: 'center' }}>
                                <Image source={require('../assets/imgs/project5.jpg')} style={styles.image} />
                            </Block>

                            <Block middle style={{ width: width - theme.SIZES.BASE * 4}}>
                                <Text style={[styles.title]} color="#333333" size={32}>
                                    Inmueble
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
        //backgroundColor: 'purple'
    },

    image: {
        width: 480,
        height: 280,
        bottom: 10
    },
    title: {
        fontFamily: 'trueno-semibold',
        paddingHorizontal: 20,
        fontWeight: '700',
        textAlign: 'center',
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
    },

    createButton: {
        width: width * 0.5,
        marginTop: 20,
        marginBottom: 10
    },
});