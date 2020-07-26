import React from "react";
import { View, StyleSheet, Image } from 'react-native';
import { Block, Text, theme } from 'galio-framework';
import { Images, nowTheme } from '../constants/';
import Counter from './Counter';

export default class PropertyCounter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            label        : this.props.label,
            counterValue : 0,
        };
    }

    getImage = (label) => {
        switch(label) {
            case "RECAMARA"         : return this.state.counterValue > 0 ?  Images.Icons.Habitacion : Images.Icons.Habitacion_G;
            case "BANO"             : return this.state.counterValue > 0 ?  Images.Icons.Bano       : Images.Icons.Bano_G;
            case "MEDIO_BANO"       : return this.state.counterValue > 0 ?  Images.Icons.Medio_Bano : Images.Icons.Habitacion_G;
            case "SALA"             : return this.state.counterValue > 0 ?  Images.Icons.Sala       : Images.Icons.Sala_G;
            case "COMEDOR"          : return this.state.counterValue > 0 ?  Images.Icons.Comedor    : Images.Icons.Comedor_G;
            case "COCINA"           : return this.state.counterValue > 0 ?  Images.Icons.Cocina     : Images.Icons.Cocina_G;
            case "GARAGE"           : return this.state.counterValue > 0 ?  Images.Icons.Garage     : Images.Icons.Garage_G;
            case "PATIO_TRASERO"    : return this.state.counterValue > 0 ?  Images.Icons.Patio      : Images.Icons.Patio_G;
            case "TERRAZA"          : return this.state.counterValue > 0 ?  Images.Icons.Terraza : Images.Icons.Habitacion_G;
            case "ESCALERAS"        : return this.state.counterValue > 0 ?  Images.Icons.Habitacion : Images.Icons.Habitacion_G;
            case "AREA_SERVICIOS"   : return this.state.counterValue > 0 ?  Images.Icons.LavadoServ : Images.Icons.Habitacion_G;
        }
    }

    updateCounter = (value) => {
        this.setState({counterValue: value});
    }

    render() {
        return (
            <Block row style={{ marginTop: theme.SIZES.BASE * 0.8}}>
                <View style={styles.itemContainer}>
                    <Image style={styles.icons} source={this.getImage(this.state.label)} />
                    <Text style={styles.labels} color={nowTheme.COLORS.PLACEHOLDER}>{this.state.label}</Text>
                    <Counter updateValue={(value) => this.updateCounter(value)} />
                </View>
            </Block>
        )
    }
}

const styles = StyleSheet.create({
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
})