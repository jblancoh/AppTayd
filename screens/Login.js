import React from 'react';
import { Image, StyleSheet, StatusBar, Dimensions, Platform, TouchableHighlight, View , TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Block, Button, Text, theme } from 'galio-framework';
import { Icon, Input } from '../components';

import { Images, nowTheme } from '../constants/';
import { HeaderHeight } from '../constants/utils';
import AuthenticationService from '../services/authentication';
import { withNavigation } from 'react-navigation';

const { height, width } = Dimensions.get('screen');

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>{children}</TouchableWithoutFeedback>
);

class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email     : '',
      password  : ''
    };
  }

  _handleLogin = () => {
    if(this.state.email != '' && this.state.password != '') {
      this._handleRequest();
    } else {
      Alert.alert('Upps!', 'Al parecer el formulario de acceso se encuentra incompleto.');
    }
  }
  
  async _handleRequest() {
    let params = {
      email     : this.state.email,
      password  : this.state.password
    };

    await AuthenticationService.login(params)
      .then(async (response) => {
        if(response.user != null) {
          try {
            await AsyncStorage.setItem('access_token', response.access_token);
            await AsyncStorage.setItem('expires_at', response.expires_at);
            await AsyncStorage.setItem('user', JSON.stringify(response.user));

            this.props.navigation.navigate('PropertyLocation')
          } catch (error) {
            console.error(error);
            that.setState({ isLoading: false });
            Alert.alert('Inicio de sesión', 'Ocurrió un error inesperado al iniciar sesión.');
          }
        } else {
          that.setState({ isLoading: false });
          Alert.alert('Inicio de sesión', 'Correo o contraseña incorrectas.');
        }
      })
      .catch(error => {
        Alert.alert('Upps!', 'Correo o contraseña incorrectas.');
      })
  }

  render() {
    return (
      <DismissKeyboard>
        <Block flex middle style={styles.containerRed}>
          <StatusBar barStyle="light-content" />
          <Block flex middle>
            <Block style={styles.registerContainer}>
              <Block flex space="evenly">
                <Block middle>
                  <Image source={Images.Logo} style={styles.logoTayder} />
                </Block>

                <Block middle>
                  <Text style={{ fontFamily: 'montserrat-regular', textAlign: 'center', fontWeight: '700' }} color={nowTheme.COLORS.WHITE} size={40}>
                    Iniciar sesión
                  </Text>
                </Block>

                <Block flex={1} middle space="between">
                  <Block center flex={0.9}>
                    <Block flex space="between">
                      <Block>
                        <Block width={width * 0.8}>
                          <Input
                            placeholder="Correo electrónico"
                            placeholderTextColor={nowTheme.COLORS.WHITE}
                            color={nowTheme.COLORS.WHITE}
                            onChangeText={(text) => this.setState({ email: text })}
                            style={styles.inputs}
                            iconContent={
                              <Image style={styles.inputIcons} source={Images.Icons.Perfil} />
                            }
                          />
                        </Block>

                        <Block width={width * 0.8}>
                          <Input
                            placeholder="Contraseña"
                            placeholderTextColor={nowTheme.COLORS.WHITE}
                            color={nowTheme.COLORS.WHITE}
                            password
                            viewPass
                            onChangeText={(text) => this.setState({ email: text })}
                            style={styles.inputs}
                            iconContent={
                              <Image style={styles.inputIcons} source={Images.Icons.Contrasena} />
                            }
                          />
                        </Block>
                      </Block>

                      <Block width={width * 0.8} style={{ marginTop: theme.SIZES.BASE * 0.8, marginBottom: theme.SIZES.BASE * 2 }}>
                        <View style={{ flexDirection: 'row', alignContent: 'center', justifyContent: 'center' }}>
                          <Text style={{ fontFamily: 'trueno', fontSize: 12 }} color={nowTheme.COLORS.WHITE}>¿Aún no tienes una cuenta? </Text>
                          <TouchableHighlight onPress={() => { }}>
                            <View>
                              <Text style={{ fontFamily: 'trueno-semibold', fontSize: 12, fontWeight: '700' }} color={nowTheme.COLORS.WHITE}> Regístrate</Text>
                            </View>
                          </TouchableHighlight>
                        </View>
                      </Block>

                      <Block center>
                        <Button color={nowTheme.COLORS.WHITE} round style={styles.createButton} onPress={() => this._handleLogin()}>
                          <Text style={{ fontFamily: 'montserrat-bold' }} size={14} color={nowTheme.COLORS.BASE}>
                            INGRESAR
                          </Text>
                        </Button>
                      </Block>
                    </Block>
                  </Block>
                </Block>
              </Block>
            </Block>
           </Block> 
        </Block>
      </DismissKeyboard>
    );
  }
}

export default withNavigation(LoginScreen);

const styles = StyleSheet.create({
  containerRed: {
    backgroundColor: nowTheme.COLORS.BASE,
  },
  registerContainer: {
    width: width * 0.9,
    height: height < 812 ? height * 0.9 : height * 0.9,
    marginTop: 45,
    marginBottom: 20,
  },

  logoTayder: {
    width: 450,
    height: 450,
  },

  inputs: {
    borderWidth: 1,
    borderColor: '#E3E3E3',
    borderRadius: 21.5,
    backgroundColor: 'transparent'
  },
  inputIcons: {
    marginRight: 25,
    width: 25,
    height: 25,
  },

  createButton: {
    width: width * 0.5,
    marginTop: 25,
    marginBottom: 40
  },
  
  /* container: {
    marginTop: Platform.OS === 'android' ? - HeaderHeight : 0,
    backgroundColor: nowTheme.COLORS.BASE,
  },

  logoTayd: {
    width: 480,
    height: 480,
    bottom: 25
  },

  sloganText: {
    fontFamily: 'trueno-semibold',
    position: 'absolute',
    letterSpacing: 2,
    paddingHorizontal: 20,
    fontWeight: '600',
    textAlign: 'center',
  },
  padded: {
    paddingHorizontal: theme.SIZES.BASE * 2,
    bottom: Platform.OS === 'android' ? theme.SIZES.BASE * 2 : theme.SIZES.BASE * 3
  },
  button: {
    width: width - theme.SIZES.BASE * 4,
    height: theme.SIZES.BASE * 3,
    borderRadius: 50,
  },

   */
});

