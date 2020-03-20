import React from "react";
import { View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import PropTypes from 'prop-types';
import { Text } from 'galio-framework'
import PropertyTypeService from '../services/propertyType';

const icons = [
    require('../assets/icons/T-casa.png'),
    require('../assets/icons/T-Depa.png'),
    require('../assets/icons/T-Ofi.png'),
];

const iconsDisabled = [
    require('../assets/icons/T-casa-gris.png'),
    require('../assets/icons/T-Depa-gris.png'),
    require('../assets/icons/T-Ofi-gris.png'),
];

export default class PropertyType extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            propertyTypes   : [],
            newValue        : this.props.value,
        };
    }

    async componentWillMount() {
        await PropertyTypeService.getAll()
            .then(response => {
                this.setState({ propertyTypes: response.propertyTypes });
            })
            .catch(error => {
                console.error(error);
                alert('Ocurrió un error al hacer la petición al servidor.');
            })
    }

    _onPress(_id) {
        this.setState({ newValue: _id });
        this.props.updateValue(_id);
    }

    render() {
        const { propertyTypes, newValue } = this.state;
        return (
            <View style={{ justifyContent: 'center', alignContent: 'center', flexDirection: 'row' }}>
                {
                    propertyTypes.map((value) => {
                        return (
                            <TouchableOpacity style={{backgroundColor: 'transparent'}} key={value.id} onPress={() => this._onPress(value.id)}>
                                <View style={styles.checkboxContainer}>
                                    {
                                        (newValue == value.id)
                                        ? (
                                            <Image source={icons[value.id - 1]} style={{width: 50, height: 50}}/>
                                        ) 
                                        : (
                                            <Image source={iconsDisabled[value.id - 1]} style={{ width: 50, height: 50 }}/>
                                        )
                                    }
                                    <View style={{ marginLeft: 5 }}>
                                        <Text style={styles.label}>{ value.name }</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )
                    })
                }
            </View>
        );
    }
}

PropertyType.propTypes = {
    newValue    : PropTypes.number,
    label       : PropTypes.string,
};

const styles = StyleSheet.create({
    checkboxContainer: {
        alignItems: 'center',
        padding: 10,
    },
    label: {
        //fontFamily: 'montserrat-regular',
        textAlign: 'center',
        fontWeight: '400',
        color: '#444444',
    }
});
