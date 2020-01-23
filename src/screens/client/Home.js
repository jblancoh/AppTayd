import React, { Component } from 'react';
import {Dimensions, StyleSheet, View, TouchableOpacity} from 'react-native';
import { Container, Content, Card, CardItem, Body, Text, Header, Form, Item, Label, Input, Picker, Icon, ListItem, CheckBox } from 'native-base';
import MapView, { Marker, ProviderPropType } from 'react-native-maps';

import flagImg from '../../../assets/images/flag-blue.png';

const {width: WIDTH} = Dimensions.get('window');
/* const ASPECT_RATIO = width / height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO; */

export default class HomeScreen extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          /* region: {
            latitude: LATITUDE,
            longitude: LONGITUDE,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }, */
          markers: [],
          chkSala : false,
          chkCocina: false,
          chkComedor: false,
          chkGarage: false,
          chkPatio: false,
        };
    
        //this.onMapPress = this.onMapPress.bind(this);
    }

    /* onMapPress(e) {
        this.setState({
          markers: [
            ...this.state.markers,
            {
              coordinate: e.nativeEvent.coordinate,
              key: `foo${id++}`,
            },
          ],
        });
    } */

    _login() {
        this.props.navigation.navigate('Cards');
    }

    render() {
        return (
            <View style={styles.container}>
                <Header iosBarStyle={"light-content"} androidStatusBarColor="#000" />
                <Card>
                    <CardItem>                
                        <Form>
                            <Item stackedLabel>
                                <Label>Direccion</Label>
                                <Input />
                            </Item>
                            <Item stackedLabel last>
                                <Label>Alias de ubicación</Label>
                                <Input />
                            </Item>
                            <Item picker>
                                <Label>Número de habitaciones</Label>
                                <Picker
                                    mode="dropdown"
                                    iosIcon={<Icon name="arrow-down" />}
                                    style={{ width: undefined }}
                                    placeholder="Número de habitaciones"
                                    placeholderStyle={{ color: "#bfc6ea" }}
                                    placeholderIconColor="#007aff"
                                >
                                    <Picker.Item label="1" value="key0" />
                                    <Picker.Item label="2" value="key1" />
                                    <Picker.Item label="3" value="key2" />
                                    <Picker.Item label="4" value="key3" />
                                    <Picker.Item label="5" value="key4" />
                                </Picker>
                            </Item>
                            <Item picker>
                                <Label>Número de baños</Label>
                                <Picker
                                    mode="dropdown"
                                    iosIcon={<Icon name="arrow-down" />}
                                    style={{ width: undefined }}
                                    placeholder="Número de Baños"
                                    placeholderStyle={{ color: "#bfc6ea" }}
                                    placeholderIconColor="#007aff"
                                >
                                    <Picker.Item label="1" value="key0" />
                                    <Picker.Item label="2" value="key1" />
                                    <Picker.Item label="3" value="key2" />
                                    <Picker.Item label="4" value="key3" />
                                    <Picker.Item label="5" value="key4" />
                                </Picker>
                            </Item>
                            <ListItem>
                                <CheckBox checked={this.state.chkSala} onPress={() => this.setState({chkSala: !this.state.chkSala})} />
                                <Body>
                                    <Text>Sala</Text>
                                </Body>
                            </ListItem>
                            <ListItem>
                                <CheckBox checked={this.state.chkComedor} onPress={() => this.setState({chkComedor: !this.state.chkComedor})} />
                                <Body>
                                    <Text>Comedor</Text>
                                </Body>
                            </ListItem>
                            <ListItem>
                                <CheckBox checked={this.state.chkCocina} onPress={() => this.setState({chkCocina: !this.state.chkCocina})} />
                                <Body>
                                    <Text>Cocina</Text>
                                </Body>
                            </ListItem>
                            <ListItem>
                                <CheckBox checked={this.state.chkGarage} onPress={() => this.setState({chkGarage: !this.state.chkGarage})} />
                                <Body>
                                    <Text>Garage</Text>
                                </Body>
                            </ListItem>
                            <ListItem>
                                <CheckBox checked={this.state.chkPatio} onPress={() => this.setState({chkPatio: !this.state.chkPatio})} />
                                <Body>
                                    <Text>Patio trasero</Text>
                                </Body>
                            </ListItem>
                            <Item picker>
                                <Label>Tipo de inmueble</Label>
                                <Picker
                                    mode="dropdown"
                                    iosIcon={<Icon name="arrow-down" />}
                                    style={{ width: undefined }}
                                    placeholder="Tipo de inmueble"
                                    placeholderStyle={{ color: "#bfc6ea" }}
                                    placeholderIconColor="#007aff"
                                >
                                    <Picker.Item label="Hogar" value="key0" />
                                    <Picker.Item label="Oficina" value="key1" />
                                </Picker>
                            </Item>
                        </Form>
                    </CardItem>

                    <CardItem>
                    <TouchableOpacity onPress={() => this._login()} style={styles.buttonLogin}>
                        <Text style={styles.textLogin}>Guardar y continuar</Text>
                    </TouchableOpacity>
                    </CardItem>
                </Card>

                    {/* <View>
                        <MapView
                            provider={this.props.provider}
                            style={styles.map}
                            initialRegion={this.state.region}
                            onPress={this.onMapPress}
                            >
                            {this.state.markers.map(marker => (
                                <Marker
                                title={marker.key}
                                image={flagImg}
                                key={marker.key}
                                coordinate={marker.coordinate}
                                />
                            ))}
                        </MapView>
                    </View> */}
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
    map: {
        flex: 1,
        alignContent: 'center'
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