import React from "react";
import { View, TouchableWithoutFeedback, StyleSheet, Image } from 'react-native';
import PropTypes from 'prop-types';
import { Text } from 'galio-framework'

const icons = [
    require('../assets/icons/T-casa.png'),
    require('../assets/icons/T-Depa.png'),
    require('../assets/icons/T-Ofi.png'),
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
    }

    render() {
        const { newValue, value, label } = this.state;
        return (
            <TouchableWithoutFeedback key={id} onPress={() => this._onPress(id)}>
                <View style={styles.checkboxContainer}>
                    {
                        (newValue == value)
                        ? (
                            <Image source={icons[value - 1]} />
                        ) 
                        : (
                            <Image source={icons[value - 1]}/>
                        )
                    }
                    <View style={{ marginLeft: 5 }}>
                        <Text style={{ ...textStyle }}>{ label }</Text>
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
    onChecked   : PropTypes.func,
};

const styles = StyleSheet.create({
    checkboxContainer: {
        flexDirection: 'column',
        alignItems: 'center'
    },
});
