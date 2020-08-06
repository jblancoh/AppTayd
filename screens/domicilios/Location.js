import React from 'react';
import {StyleSheet, Image, Dimensions, TouchableWithoutFeedback, Keyboard, View, Alert, KeyboardAvoidingView} from 'react-native';
import { Block, Text, Button } from 'galio-framework';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

import { Input } from '../../components';
import { Images, nowTheme } from '../../constants';

const { width, height } = Dimensions.get('screen');

const DismissKeyboard = ({ children }) => (
  <KeyboardAvoidingView behavior={"height"} style={{flex : 1}}>
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={{flex : 1}}>
        {children}
      </View>
    </TouchableWithoutFeedback>
  </KeyboardAvoidingView>
);

class DomicilioLocationScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading       : true,
            markers         : [],
            location        : null,
            errorMessage    : null,

            address           : ''
        };

        this._getLocationAsync();
    }

    _getLocationAsync = async () => {
      let { status } = await Permissions.askAsync(Permissions.LOCATION);
      if (status !== 'granted') {
        this.setState({
          errorMessage: 'No se ha concedido permiso para acceder a la localización.',
        });
      }

      let location = await Location.getCurrentPositionAsync({});
      this.setState({ location });
    }

    handleBottomButton = () => {
      if(this.state.address != '') {
        this.props.navigation.navigate('DomicilioInfo', {
          address: this.state.address,
          location: this.state.location.coords
        });
      } else {
        Alert.alert("Upps!", "No se ha colocado la dirección de la propiedad.");
      }
    }

    render() {
      let { location } = this.state;
        return (
        <DismissKeyboard>
          {
            (location != null) ?
            (
              <View style={styles.container}>

                <MapView
                    style={styles.mapStyle}
                    pitchEnabled={true}
                    rotateEnabled={true}
                    scrollEnabled={true}
                    zoomEnabled={true}
                    initialRegion={{
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01
                    }}
                >
                  <MapView.Marker
                    key={0}
                    draggable={true}
                    onDragEnd={(e) => this.setState({location: e.nativeEvent.coordinate})}
                    coordinate={{
                      latitude: location.coords.latitude,
                      longitude: location.coords.longitude,
                    }}
                    title={'Mi ubicación'}
                    description={'Esta ubicación será registrada en tayd'}
                  />
                </MapView>
                
                <View style={[styles.bottomContainer, { height: 160 }]}>
                  <View style={[{ justifyContent: 'center', alignContent: 'center', paddingTop: 15 }]}>
                    <Text style={{fontFamily: 'trueno-extrabold', textAlign: 'center', paddingBottom: 10}} color={nowTheme.COLORS.SECONDARY} size={24}>
                      Dirección
                    </Text>
                  </View>

                  <View>
                    <View style={{justifyContent: 'center', alignContent: 'center', paddingTop: 5}}>
                      <Text style={{fontFamily: 'trueno', textAlign: 'center'}} color={nowTheme.COLORS.SECONDARY} size={12}>
                        Usa el PIN para verificar tu domicilio en el mapa.
                      </Text>
                    </View>

                    <View style={{ marginBottom: 5, justifyContent: 'center', alignContent: 'center', paddingTop: 10, }}>
                      <Input
                        placeholder="Av. Paseo Tabasco #457"
                        onChangeText={(text) => this.setState({address : text})}
                        style={styles.inputs}
                        iconContent={
                          <Image style={styles.inputIcons} source={Images.Icons.Ubicacion} />
                        }
                        />
                    </View>
                  </View>
                </View>

                <Block center style={{zIndex : 2}}>
                  <Button color={nowTheme.COLORS.BASE} round style={styles.createButton} onPress={() => this.handleBottomButton()}>
                    <Text style={{ fontFamily: 'trueno-semibold' }} size={14} color={nowTheme.COLORS.WHITE}> SIGUIENTE </Text>
                  </Button>
                </Block>
              </View>
            ) : (
              <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontFamily: 'trueno-semibold', color: nowTheme.COLORS.SECONDARY, fontSize: 24}}>Cargando...</Text>
              </View>
            )
          }
        </DismissKeyboard>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  overlay: {
    flex: 1,
    position: 'absolute',
    left: 0,
    top: 0,
    opacity: 0.5,
    backgroundColor: 'black',
    width: width,
    zIndex: 1
  },
  mapStyle: {
    zIndex: -1,
    ...StyleSheet.absoluteFillObject,
  },

  inputIcons: {
    marginRight: 25,
    width: 25,
    height: 25,
  },
  inputs: {
    borderWidth: 1,
    borderColor: '#E3E3E3',
    borderRadius: 21.5,
    fontFamily: 'trueno',
    fontSize: 17,
    letterSpacing: 20
  },

  bottomContainer: {
    zIndex: 2,
    backgroundColor: nowTheme.COLORS.WHITE,
    borderRadius: 30,
    width: width * 0.88,
    paddingHorizontal: 20,
    shadowColor: nowTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 8,
    shadowOpacity: 0.6,
    elevation: 1,
    justifyContent: 'center',
    alignContent : 'center',
    marginBottom: 10,
  },

  createButton: {
    width: width * 0.4,
    marginTop: 15,
    marginBottom: 40
  },
});

export default DomicilioLocationScreen;
