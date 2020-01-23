import React, { Component } from 'react';
import {Dimensions, StyleSheet, View, TouchableOpacity} from 'react-native';
import { Container, Content, Card, CardItem, Body, Text, Header, Form, Item, Label, Input, Picker, Icon, ListItem, CheckBox } from 'native-base';
import { CreditCardInput } from "react-native-credit-card-input";

const {width: WIDTH} = Dimensions.get('window');

export default class CardScreen extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
        };
    }

    _login() {
        this.props.navigation.navigate('Cards');
    }

    _onChange = form => console.log(form);

    render() {
        return (
            <View style={styles.container}>
                <Card>
                    <CardItem>                
                        <CreditCardInput onChange={this._onChange} />
                    </CardItem>

                    <CardItem>
                    <TouchableOpacity onPress={() => this._login()} style={styles.buttonLogin}>
                        <Text style={styles.textLogin}>Guardar y continuar</Text>
                    </TouchableOpacity>
                    </CardItem>
                </Card>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#3F0CE8'
    },
    buttonLogin: {
        width: WIDTH - 55,
        marginLeft: 25,
        height: 45,
        borderRadius: 25,
        backgroundColor: '#3F0CE8',
        justifyContent: 'center',
        marginTop: 20
    },
    textLogin: {
        color: 'rgba(255,255,255,0.7)',
        fontSize: 16,
        textAlign: 'center'
    },
});