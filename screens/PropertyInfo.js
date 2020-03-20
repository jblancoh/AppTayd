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
        };
    }

    updatePropertyInfo = (value, label) => {
        console.log("Valor", value);
        console.log("Label", label);
        switch(label) {
            case "habitaciones":
                console.log("Entroooo");
                this.setState({habitaciones : value});
                break;

            case "banos":
                this.setState({ banos: value });
                break;
        }
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
                                    <Counter label="habitaciones" updateValue={() => this.updatePropertyInfo} />
                                </View>
                            </Block>

                            <Block row style={{ marginTop: theme.SIZES.BASE * 0.8}}>
                                <View style={styles.itemContainer}>
                                    <Image style={styles.icons} source={Images.Icons.Bano} />
                                    <Text style={styles.labels} color={nowTheme.COLORS.PLACEHOLDER}>Baños</Text>
                                    <Counter label="banos" />
                                </View>
                            </Block>

                            <Block row style={{ marginTop: theme.SIZES.BASE * 0.8}}>
                                <View style={styles.itemContainer}>
                                    <Image style={styles.icons} source={Images.Icons.Sala} />
                                    <Text style={styles.labels} color={nowTheme.COLORS.PLACEHOLDER}>Sala</Text>
                                    <Counter label="sala" />
                                </View>
                            </Block>

                            <Block row style={{ marginTop: theme.SIZES.BASE * 0.8}}>
                                <View style={styles.itemContainer}>
                                    <Image style={styles.icons} source={Images.Icons.Comedor} />
                                    <Text style={styles.labels} color={nowTheme.COLORS.PLACEHOLDER}>Comedor</Text>
                                    <Counter label="comedor" />
                                </View>
                            </Block>

                            <Block row style={{ marginTop: theme.SIZES.BASE * 0.8}}>
                                <View style={styles.itemContainer}>
                                    <Image style={styles.icons} source={Images.Icons.Cocina} />
                                    <Text style={styles.labels} color={nowTheme.COLORS.PLACEHOLDER}>Cocina</Text>
                                    <Counter label="cocina" />
                                </View>
                            </Block>

                            <Block row style={{ marginTop: theme.SIZES.BASE * 0.8}}>
                                <View style={styles.itemContainer}>
                                    <Image style={styles.icons} source={Images.Icons.Garage_G} />
                                    <Text style={styles.labels} color={nowTheme.COLORS.PLACEHOLDER}>Garage</Text>
                                    <Counter label="garage" />
                                </View>
                            </Block>

                            <Block row style={{ marginTop: theme.SIZES.BASE * 0.8}}>
                                <View style={styles.itemContainer}>
                                    <Image style={styles.icons} source={Images.Icons.Patio_G} />
                                    <Text style={styles.labels} color={nowTheme.COLORS.PLACEHOLDER}>Patio</Text>
                                    <Counter label="patio" />
                                </View>
                            </Block>

                            <Block middle style={{ width: width - theme.SIZES.BASE * 4 }}>
                                <Button
                                    round
                                    color={nowTheme.COLORS.BASE}
                                    style={styles.createButton}
                                    loading={this.state.isLoading}
                                    disabled={this.state.isLoading}
                                    onPress={() => this._handleLogin()}>
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