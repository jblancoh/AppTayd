import React from 'react';
import {StyleSheet, Image, Dimensions, StatusBar, TouchableWithoutFeedback, Keyboard, View} from 'react-native';
import { Block, Checkbox, Text, Button, theme } from 'galio-framework';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

import { Icon, Input } from '../components';
import { Images, nowTheme } from '../constants';

const { width, height } = Dimensions.get('screen');

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    <View style={{flex : 1}}>
      <StatusBar barStyle={'dark-content'} />
      {children}
    </View>
  </TouchableWithoutFeedback>
);

class PropertyLocationScreen extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
            isLoading: true,
            markers: [],
            location : null,
            errorMessage: null,
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

    render() {
      let { location, errorMessage } = this.state;
        return (
        <DismissKeyboard>
          {
            (location != null) ?
            (
              <View style={styles.container}>
                <MapView 
                    style={styles.mapStyle}
                    initialRegion={{
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01
                    }}
                >
                  <MapView.Marker
                    key={0}
                    draggable
                    onDragEnd={(e) => alert(JSON.stringify(e.nativeEvent.coordinate))}
                    coordinate={{
                      latitude: location.coords.latitude,
                      longitude: location.coords.longitude,
                    }}
                    title={'Mi ubicación'}
                    description={'Esta ubicación será registrada en tayd'}
                  />
                </MapView>
                
                <View style={styles.bottomContainer}>
                    <View style={{justifyContent: 'center', alignContent: 'center', paddingTop: 25}}>
                      <Text style={{fontFamily: 'montserrat-regular', textAlign: 'center', fontWeight: '700'}} color={nowTheme.COLORS.SECONDARY} size={25}>
                        Dirección
                      </Text>
                    </View>

                    <View style={{justifyContent: 'center', alignContent: 'center', paddingTop: 5}}>
                      <Text style={{fontFamily: 'montserrat-regular', textAlign: 'center', fontWeight: '400'}} color={nowTheme.COLORS.SECONDARY} size={12}>
                        Usa el PIN para verificar tu domicilio en el mapa.
                      </Text>
                    </View>

                    <View style={{ marginBottom: 5, justifyContent: 'center', alignContent: 'center', paddingTop: 10, }}>
                      <Input
                        placeholder="Av. Paseo Tabasco #457"
                        editable={false}
                        style={styles.inputs}
                        iconContent={
                          <Image style={styles.inputIcons} source={Images.Icons.Ubicacion} />
                        }
                      />
                    </View>
                </View>

                <Block center>
                  <Button color={nowTheme.COLORS.BASE} round style={styles.createButton} onPress={() => navigation.navigate('Documentation')}>
                    <Text style={{ fontFamily: 'montserrat-bold' }} size={14} color={nowTheme.COLORS.WHITE}>
                      SIGUIENTE
                    </Text>
                  </Button>
                </Block>
              </View>
            ) : (
              <Text>Cargando...</Text>
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
  mapStyle: {
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
    borderRadius: 21.5
  },

  bottomContainer: {
    backgroundColor: nowTheme.COLORS.WHITE,
    borderRadius: 50,
    width: width * 0.88,
    height: 160,
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

export default PropertyLocationScreen;
