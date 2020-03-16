import React from "react";
import { View, TouchableWithoutFeedback, StyleSheet, Image } from 'react-native';
import PropTypes from 'prop-types';
import { Text } from 'galio-framework'

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
            newValue: props.newValue,
            value: props.value,
            label: props.label
        };
    }

    _onPress(_id) {
        this.setState({ value: _id });
        this.props.updateValue(_id);
    }

    render() {
        const { newValue, value, label } = this.state;
        return (
            <TouchableWithoutFeedback key={value} onPress={() => this._onPress(value)}>
                <View style={styles.checkboxContainer}>
                    {
                        (newValue == value)
                        ? (
                            <Image source={icons[value - 1]} style={{width: 50, height: 50}}/>
                        ) 
                        : (
                            <Image source={iconsDisabled[value - 1]} style={{ width: 50, height: 50 }}/>
                        )
                    }
                    <View style={{ marginLeft: 5 }}>
                        <Text style={styles.label}>{ label }</Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

PropertyType.propTypes = {
    value       : PropTypes.number,
    newValue    : PropTypes.number,
    label       : PropTypes.string,
};

const styles = StyleSheet.create({
    checkboxContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        padding: 15,
    },
    label: {
        fontFamily: 'montserrat-regular',
        textAlign: 'center',
        fontWeight: '400',
        lineHeight: 1,
        letterSpacing: 1,
        color: '#444444',
    }
});
