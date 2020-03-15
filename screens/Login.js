import React from 'react';
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  AsyncStorage,
} from 'react-native';
import { Block, Text, Button, theme } from 'galio-framework';

import { Icon, Input } from '../components';
import { Images, nowTheme } from '../constants';
import AuthenticationService from '../services/authentication';

const { width, height } = Dimensions.get('screen');

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

            this.props.navigation.navigate('Home')
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
        <Block flex middle>
          <ImageBackground
            source={Images.RegisterBackground}
            style={styles.imageBackgroundContainer}
            imageStyle={styles.imageBackground}
          >
            <Block flex middle>
              <Block style={styles.registerContainer}>
                <Block flex space="evenly">
                  <Block flex={0.4} middle style={styles.socialConnect}>
                    <Block flex={0.5} middle>
                      <Text style={{fontFamily: 'montserrat-regular', textAlign: 'center'}} color="#333" size={24} >
                        Inicio de sesión
                      </Text>
                    </Block>
                  </Block>

                  <Block flex={1} middle space="between">
                    <Block center flex={0.9}>
                      <Block flex space="between">
                        <Block>
                          <Block width={width * 0.8} style={{ marginBottom: 5 }}>
                            <Input
                              placeholder="Email"
                              type="email-address"
                              style={styles.inputs}
                              onChangeText={(text) => this.setState({email : text})}
                              iconContent={
                                <Icon
                                  size={16}
                                  color="#ADB5BD"
                                  name="lock"
                                  family="FontAwesome"
                                  style={styles.inputIcons}
                                />
                              }
                            />
                          </Block>
                          <Block width={width * 0.8} style={{ marginBottom: 5 }}>
                            <Input
                              placeholder="Contraseña"
                              password
                              viewPass
                              style={styles.inputs}
                              onChangeText={(text) => this.setState({ password: text })}
                              iconContent={
                                <Icon
                                  size={16}
                                  color="#ADB5BD"
                                  name="lock-circle-open2x"
                                  family="NowExtra"
                                  style={styles.inputIcons}
                                />
                              }
                            />
                          </Block>
                        </Block>
                        <Block center>
                          <Button color="primary" round style={styles.createButton} onPress={() => this._handleLogin()}>
                            <Text
                              style={{ fontFamily: 'montserrat-bold' }}
                              size={14}
                              color={nowTheme.COLORS.WHITE}
                            >
                              Accesar
                            </Text>
                          </Button>
                        </Block>
                      </Block>
                    </Block>
                  </Block>
                </Block>
              </Block>
            </Block>
          </ImageBackground>
        </Block>
      </DismissKeyboard>
    );
  }
}

const styles = StyleSheet.create({
  imageBackgroundContainer: {
    width: width,
    height: height,
    padding: 0,
    zIndex: 1
  },
  imageBackground: {
    width: width,
    height: height
  },
  registerContainer: {
    marginTop: 55,
    width: width * 0.9,
    height: height < 812 ? height * 0.8 : height * 0.8,
    backgroundColor: nowTheme.COLORS.WHITE,
    borderRadius: 4,
    shadowColor: nowTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
    overflow: 'hidden'
  },
  socialConnect: {
    backgroundColor: nowTheme.COLORS.WHITE
    // borderBottomWidth: StyleSheet.hairlineWidth,
    // borderColor: "rgba(136, 152, 170, 0.3)"
  },
  socialButtons: {
    width: 120,
    height: 40,
    backgroundColor: '#fff',
    shadowColor: nowTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1
  },
  socialTextButtons: {
    color: nowTheme.COLORS.PRIMARY,
    fontWeight: '800',
    fontSize: 14
  },
  inputIcons: {
    marginRight: 12,
    color: nowTheme.COLORS.ICON_INPUT
  },
  inputs: {
    borderWidth: 1,
    borderColor: '#E3E3E3',
    borderRadius: 21.5
  },
  passwordCheck: {
    paddingLeft: 2,
    paddingTop: 6,
    paddingBottom: 15
  },
  createButton: {
    width: width * 0.5,
    marginTop: 25,
    marginBottom: 40
  },
  social: {
    width: theme.SIZES.BASE * 3.5,
    height: theme.SIZES.BASE * 3.5,
    borderRadius: theme.SIZES.BASE * 1.75,
    justifyContent: 'center',
    marginHorizontal: 10
  }
});

export default LoginScreen;
