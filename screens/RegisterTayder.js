import React from 'react';
import { ImageBackground, Image, StyleSheet, StatusBar, Dimensions, Platform, TouchableHighlight, View , TouchableWithoutFeedback, Keyboard, Alert, AsyncStorage } from 'react-native';
import { Block, Button, Text, theme, Checkbox } from 'galio-framework';
import { Icon, Input } from '../components';

import { Images, nowTheme } from '../constants';
import AuthenticationService from '../services/authentication';
import { withNavigation } from 'react-navigation';

const { height, width } = Dimensions.get('screen');

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>{children}</TouchableWithoutFeedback>
);

class RegisterTayderScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email     : '',
      password  : '',
      isTayder  : true,
      isLoading : false,
    };
  }

  _handleLogin = () => {
    this.props.navigation.navigate('DocumentosIndex')
    /* if(this.state.email != '' && this.state.password != '') {
      this._handleRequest();
    } else {
      Alert.alert('Upps!', 'Al parecer el formulario de acceso se encuentra incompleto.');
    } */
  }
  
  async _handleRequest() {
    /* this.setState({isLoading : true});
    let params = {
      email     : this.state.email,
      password  : this.state.password,
      isTayder  : true,
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
      }) */
  }

  render() {
    const { navigation } = this.props;

    return (
      <Block flex style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Block flex center>
          <ImageBackground source={Images.RegisterTayderBackground} style={{ height: height - 20, width, zIndex: 1 }} />
        </Block>

        <Block flex={1} middle space="between" style={styles.padded}>
          <Block center flex={0.9}>
            <Block flex space="between">
              <Block>
                <Block middle>
                  <Text style={{ fontFamily: 'montserrat-regular', textAlign: 'center', fontWeight: '600' }} color={nowTheme.COLORS.WHITE} size={32}>
                    Registro
                  </Text>
                </Block>
                <Block width={width * 0.8}>
                  <Input
                    placeholder="Número telefónico"
                    placeholderTextColor={nowTheme.COLORS.PLACEHOLDER}
                    type="phone-pad"
                    style={styles.inputs}
                    iconContent={
                      <Image style={styles.inputIcons} source={Images.Icons.Telefono} />
                    }
                    onChangeText={(text) => this.setState({ phone: text })}
                  />
                </Block>
                <Block width={width * 0.8}>
                  <Input
                    placeholder="Correo electrónico"
                    placeholderTextColor={nowTheme.COLORS.PLACEHOLDER}
                    type="email-address"
                    style={styles.inputs}
                    iconContent={
                      <Image style={styles.inputIcons} source={Images.Icons.Correo} />
                    }
                    onChangeText={(text) => this.setState({ email: text })}
                  />
                </Block>
                <Block width={width * 0.8}>
                  <Input
                    placeholder="Nombre(s)"
                    placeholderTextColor={nowTheme.COLORS.PLACEHOLDER}
                    style={styles.inputs}
                    iconContent={
                      <Image style={styles.inputIcons} source={Images.Icons.Nombre} />
                    }
                    onChangeText={(text) => this.setState({ name: text })}
                  />
                </Block>
                <Block width={width * 0.8}>
                  <Input
                    placeholder="Apellido(s)"
                    placeholderTextColor={nowTheme.COLORS.PLACEHOLDER}
                    style={styles.inputs}
                    iconContent={
                      <Image style={styles.inputIcons} source={Images.Icons.Apellido} />
                    }
                    onChangeText={(text) => this.setState({ lastname: text })}
                  />
                </Block>
                <Block width={width * 0.8}>
                  <Input
                    placeholder="Contraseña"
                    placeholderTextColor={nowTheme.COLORS.PLACEHOLDER}
                    password
                    viewPass
                    style={styles.inputs}
                    iconContent={
                      <Image style={styles.inputIcons} source={Images.Icons.Contrasena} />
                    }
                    onChangeText={(text) => this.setState({ password: text })}
                  />
                </Block>
                <Block width={width * 0.6} style={{ justifyContent: 'center', alignSelf: 'center', marginVertical: 10, marginLeft: 15 }} row>
                  <Checkbox
                    checkboxStyle={{ borderWidth: 1, borderRadius: 2, borderColor: '#C0C0C0' }}
                    color={nowTheme.COLORS.BASE}
                    labelStyle={{ color: '#C0C0C0', fontFamily: 'montserrat-regular', fontSize: 12 }}
                    label="Acepto los términos y condiciones."
                    initialValue={this.state.chkTerms}
                    onChange={() => this.setState({ chkTerms: !this.state.chkTerms })}
                  />
                </Block>
              </Block>
              <Block center>
                <Button
                  round
                  color={nowTheme.COLORS.BASE}
                  style={styles.button}
                  loading={this.state.isLoading}
                  disabled={this.state.isLoading}
                  onPress={() => this._handleLogin()}>
                  <Text style={{ fontFamily: 'montserrat-bold' }} size={14} color={nowTheme.COLORS.WHITE}>
                    SIGUIENTE
                  </Text>
                </Button>
              </Block>
            </Block>
          </Block>
        </Block>
      </Block>
    );
  }
}

export default withNavigation(RegisterTayderScreen);

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.COLORS.BLACK
  },
  padded: {
    top: 330,
    paddingHorizontal: theme.SIZES.BASE * 2,
    position: 'absolute',
    bottom: theme.SIZES.BASE,
    zIndex: 2
  },
  title: {
    fontFamily: 'trueno-extrabold',
    color: nowTheme.COLORS.SECONDARY,
    fontSize: 32,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: 'trueno',
    fontSize: 14,
    color: nowTheme.COLORS.SECONDARY,
    textAlign: 'center',
  },
  button: {
    width: width * 0.4,
    height: theme.SIZES.BASE * 2.5,
    shadowRadius: 0,
    shadowOpacity: 0
  },
  inputs: {
    borderWidth: 1,
    borderColor: '#E3E3E3',
    borderRadius: 21.5,
    backgroundColor: '#FFF'
  },
  inputIcons: {
    marginRight: 25,
    width: 25,
    height: 25,
  },
});

/* const styles = StyleSheet.create({
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
    marginBottom: 40
  },

}); */

