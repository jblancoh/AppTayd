import React from 'react';
import { StyleSheet, Image, Dimensions, TouchableWithoutFeedback, Keyboard, Alert, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Block, Checkbox, Text, Button, } from 'galio-framework';

import { Input } from '../components';
import { Images, nowTheme } from '../constants';
import AuthenticationService from '../services/authentication';

const { width, height } = Dimensions.get('screen');

const DismissKeyboard = ({ children }) => (
  <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style={{flex: 1}}>
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>{children}</TouchableWithoutFeedback>
  </KeyboardAvoidingView>
);

class RegisterScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isTayder  : this.props.navigation.state.params.isTayder,
      phone     : '',
      email     : '',
      name      : '',
      lastname  : '',
      password  : '',
      confirm   : '',
      chkTerms  : false,
      isLoading : false
    };
  }

  _handleLogin = () => {
    if(this.state.email != '' && this.state.password != '' && this.state.password != '' && this.state.name != '' && this.state.lastname != '' && this.state.phone != '') {
      this._handleRequest();
    } else {
      Alert.alert('Upps!', 'Al parecer el formulario de acceso se encuentra incompleto.');
    }
  }

  async _handleRequest() {
    this.setState({isLoading : true});

    let params = {
      email     : this.state.email,
      password  : this.state.password,
      isTayder  : this.state.isTayder,
      name      : this.state.name,
      last_name : this.state.lastname,
      phone     : this.state.phone,
    };

    await AuthenticationService.signup(params)
      .then(async (response) => {
        this.setState({ isLoading: false, email: '', password: '', name: '', last_name: '', phone: '' });
        Alert.alert("Registro", "Se ha registrado tu cuenta exitosamente, inicia sesión para acceder a Tayd.")
        this.props.navigation.navigate('Login', {hasMessage: true, message: 'Registro exitoso!'});
      })
      .catch(error => {
        this.setState({ isLoading: false });
        Alert.alert('Upps!', 'Oucrrió un error al realizar tu registro.');
      })
  }

  render() {
    return (
      <DismissKeyboard>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
          <Block flex middle>
              <Block flex space="evenly">
                <Block middle style={styles.titleContainer}>
                  <Block middle>
                    <Text style={{fontFamily: 'trueno-extrabold', textAlign: 'center', fontWeight: '600'}} color={nowTheme.COLORS.BASE} size={32}>
                      Registro
                    </Text>
                  </Block>

                  <Block middle>
                    <Image source={Images.TaydRegistro} style={styles.logoTayder} />
                  </Block>
                </Block>

                <Block flex={1} middle space="between">
                  <Block center flex={0.9}>
                    <Block flex space="between">
                      <Block>
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
                            onChangeText={(text) => this.setState({lastname: text })}
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
                            onChangeText={(text) => this.setState({password: text })}
                          />
                        </Block>
                        <Block width={width * 0.6} style={{justifyContent: 'center', alignSelf: 'center', marginVertical: 10, marginLeft: 15}} row>
                          <Checkbox
                            checkboxStyle={{borderWidth: 1, borderRadius: 2, borderColor: '#C0C0C0'}}
                            color={nowTheme.COLORS.BASE}
                            labelStyle={{ color: '#C0C0C0', fontFamily: 'montserrat-regular', fontSize: 12}}
                            label="Acepto los términos y condiciones."
                            initialValue={this.state.chkTerms}
                            onChange={() => this.setState({chkTerms: !this.state.chkTerms})}
                          />
                        </Block>
                      </Block>
                      <Block center>
                        <Button 
                          round
                          color={nowTheme.COLORS.BASE}
                          style={styles.createButton}
                          loading={this.state.isLoading}
                          disabled={this.state.isLoading}
                          onPress={() => this._handleLogin()}>
                          <Text style={{ fontFamily: 'montserrat-bold' }} size={14} color={nowTheme.COLORS.WHITE}>
                            REGISTRAR
                          </Text>
                        </Button>
                      </Block>
                    </Block>
                  </Block>
                </Block>
              </Block>
          </Block>
        </ScrollView>
      </DismissKeyboard>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: nowTheme.COLORS.WHITE,
    paddingTop: 45
  },
  registerContainer: {
    width: width * 0.9,
    height: height < 812 ? height * 0.9 : height * 0.9,
    marginTop: 45,
    marginBottom: 20,
    backgroundColor: nowTheme.COLORS.WHITE,
    borderRadius: 25,
    shadowColor: nowTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
    overflow: 'hidden',
  },
  titleContainer: {
    backgroundColor: nowTheme.COLORS.WHITE
  },
  logoTayder : {
    width   : 300,
    height  : 300,
  },

  inputIcons: {
    marginRight: 25,
    width: 25,
    height: 25,
  },
  inputs: {
    borderWidth: 1,
    borderColor: '#C0C0C0',
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
});

export default RegisterScreen;
