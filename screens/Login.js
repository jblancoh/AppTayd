import React from 'react';
import { Image, StyleSheet, StatusBar, Dimensions, Platform, TouchableHighlight, View , TouchableWithoutFeedback, Keyboard, Alert, AsyncStorage } from 'react-native';
import { Block, Button, Text, theme } from 'galio-framework';
import { Icon, Input } from '../components';

import { Images, nowTheme } from '../constants/';
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
      password  : '',
      isLoading : false,
    };
  }

  _handleLogin = () => {
    if(this.state.email != '' && this.state.password != '') {
      this.props.navigation.navigate('Welcome');
      //this._handleRequest();
    } else {
      Alert.alert('Upps!', 'Al parecer el formulario de acceso se encuentra incompleto.');
    }
  }
  
  async _handleRequest() {
    this.setState({isLoading : true});
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

            this.setState({ isLoading: false });
            if(!response.user.first_login && !response.user.isTayder) {
              this.props.navigation.navigate('PropertyLocation')
            } else if(response.user.first_login && !response.user.isTayder) {
              this.props.navigation.navigate('Home')
            }

          } catch (error) {
            console.error(error);
            this.setState({ isLoading: false });
            Alert.alert('Inicio de sesión', 'Ocurrió un error inesperado al iniciar sesión.');
          }
        } else {
          this.setState({ isLoading: false });
          Alert.alert('Inicio de sesión', 'Correo o contraseña incorrectas.');
        }
      })
      .catch(error => {
        this.setState({ isLoading: false });
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
                            type="email-address"
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
                            onChangeText={(text) => this.setState({ password: text })}
                            style={styles.inputs}
                            iconContent={
                              <Image style={styles.inputIcons} source={Images.Icons.Contrasena} />
                            }
                          />
                        </Block>
                      </Block>

                      <Block width={width * 0.8} style={{ marginTop: theme.SIZES.BASE * 0.8, marginBottom: 10 }}>
                        <View style={{ flexDirection: 'row', alignContent: 'center', justifyContent: 'center' }}>
                          <Text style={{ fontFamily: 'trueno', fontSize: 12 }} color={nowTheme.COLORS.WHITE}>¿Aún no tienes una cuenta? </Text>
                          <TouchableHighlight onPress={() => this.props.navigation.navigate('Onboarding')}>
                            <View>
                              <Text style={{ fontFamily: 'trueno-semibold', fontSize: 12, fontWeight: '700' }} color={nowTheme.COLORS.WHITE}> Regístrate</Text>
                            </View>
                          </TouchableHighlight>
                        </View>
                      </Block>

                      <Block width={width * 0.8} style={{marginBottom: theme.SIZES.BASE * 2 }}>
                        <View style={{alignSelf: 'center', justifyContent: 'center' }}>
                          <TouchableHighlight onPress={() => { }}>
                            <View>
                              <Text style={{ fontFamily: 'trueno-semibold', fontSize: 12, fontWeight: '700' }} color={nowTheme.COLORS.WHITE}>
                                ¿No puedes acceder a tu cuenta?
                              </Text>
                            </View>
                          </TouchableHighlight>
                        </View>
                      </Block>

                      <Block center>
                        <Button
                          round
                          color={nowTheme.COLORS.WHITE}
                          style={styles.createButton}
                          loading={this.state.isLoading}
                          loadingColor={nowTheme.COLORS.BASE}
                          disabled={this.state.isLoading}
                          onPress={() => this._handleLogin()}>
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
    marginTop: 0,
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
    marginBottom: 40
  },

});

