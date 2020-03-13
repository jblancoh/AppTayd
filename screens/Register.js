import React from 'react';
import {
  StyleSheet,
  Image,
  Dimensions,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import { Block, Checkbox, Text, Button, theme } from 'galio-framework';

import { Icon, Input } from '../components';
import { Images, nowTheme } from '../constants';

const { width, height } = Dimensions.get('screen');

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>{children}</TouchableWithoutFeedback>
);

class RegisterScreen extends React.Component {
  render() {
    const { navigation } = this.props;

    return (
      <DismissKeyboard>
        <Block flex middle style={styles.containerRed}>
            <Block flex middle>
              <Block style={styles.registerContainer}>
                <Block flex space="evenly">
                  <Block middle style={styles.titleContainer}>
                    <Block middle>
                      <Text style={{fontFamily: 'montserrat-regular', textAlign: 'center', fontWeight: '600'}} color={nowTheme.COLORS.BASE} size={32}>
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
                              type="phone-pad"
                              style={styles.inputs}
                              iconContent={
                                <Icon
                                  size={16}
                                  color="#ADB5BD"
                                  name="phone"
                                  family="FontAwesome"
                                  style={styles.inputIcons}
                                />
                              }
                            />
                          </Block>
                          <Block width={width * 0.8}>
                            <Input
                              placeholder="Correo electrónico"
                              type="email-address"
                              style={styles.inputs}
                              iconContent={
                                <Icon
                                  size={16}
                                  color="#ADB5BD"
                                  name="email-852x"
                                  family="NowExtra"
                                  style={styles.inputIcons}
                                />
                              }
                            />
                          </Block>
                          <Block width={width * 0.8}>
                            <Input
                              placeholder="Nombre(s)"
                              style={styles.inputs}
                              iconContent={
                                <Icon
                                  size={16}
                                  color="#ADB5BD"
                                  name="profile-circle"
                                  family="NowExtra"
                                  style={styles.inputIcons}
                                />
                              }
                            />
                          </Block>
                          <Block width={width * 0.8}>
                            <Input
                              placeholder="Apellido(s)"
                              style={styles.inputs}
                              iconContent={
                                <Icon
                                  size={16}
                                  color="#ADB5BD"
                                  name="profile-circle"
                                  family="NowExtra"
                                  style={styles.inputIcons}
                                />
                              }
                            />
                          </Block>
                          <Block width={width * 0.8}>
                            <Input
                              placeholder="Contraseña"
                              password
                              viewPass
                              style={styles.inputs}
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
                          <Block width={width * 0.75} style={{ marginVertical: 10, marginLeft: 15}} row>
                            <Checkbox
                              checkboxStyle={{
                                borderWidth: 1,
                                borderRadius: 2,
                                borderColor: '#E3E3E3'
                              }}
                              color={nowTheme.COLORS.BASE}
                              labelStyle={{
                                color: '#E3E3E3',
                                fontFamily: 'montserrat-regular',
                                fontSize: 14
                              }}
                              label="Acepto los términos y condiciones."
                            />
                          </Block>
                        </Block>
                        <Block center>
                          <Button color={nowTheme.COLORS.BASE} round style={styles.createButton} onPress={() => navigation.navigate('Documentation')}>
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
            </Block>
        </Block>
      </DismissKeyboard>
    );
  }
}

const styles = StyleSheet.create({
  containerRed: {
    backgroundColor: nowTheme.COLORS.BASE,
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
    overflow: 'hidden'
  },
  titleContainer: {
    backgroundColor: nowTheme.COLORS.WHITE
  },
  logoTayder : {
    width   : 300,
    height  : 300,
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
});

export default RegisterScreen;
