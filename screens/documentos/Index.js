import React from 'react';
import { ImageBackground, Image, StyleSheet, StatusBar, Dimensions, Platform, TouchableHighlight, View , TouchableWithoutFeedback, Keyboard, Alert, AsyncStorage } from 'react-native';
import { Block, Button, Text, theme, Checkbox } from 'galio-framework';
import { Icon, Input } from '../../components';

import { Images, nowTheme } from '../../constants';
import AuthenticationService from '../../services/authentication';
import { withNavigation } from 'react-navigation';

const { height, width } = Dimensions.get('screen');

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>{children}</TouchableWithoutFeedback>
);

class DocumentosIndexScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email     : '',
      password  : '',
      isTayder  : true,
      isLoading : false,
    };
  }

  render() {
    const { navigation } = this.props;

    return (
      <Block flex style={styles.container}>
        <StatusBar barStyle="light-content" />

        <Block flex={1} middle space="between" style={styles.padded}>
          <Block center flex={0.9}>
            <Block middle style={{paddingTop: 30}}>
              <Text style={styles.title}>
                Hola, Chris
              </Text>
            </Block>

            <Block style={styles.itemGroup} row width={width * 0.8}>
              <Image source={Images.Icons.Camara} style={styles.imageCamara} />
              <Text style={[styles.subtitle, styles.groupTextContainer]}>
                Para formar parte de nuestro equipo, necesitamos subas una fotografía de los siguientes documentos,te recomendamos tenerlos a la mano.
              </Text>
            </Block>

            <Block style={styles.itemGroup} row width={width * 0.8}>
              <Image source={Images.Icons.Grupo1} style={styles.imageGroup} />
              <Block style={styles.groupTextContainer}>
                <Text style={styles.title2}>Identificación oficial</Text>
                <Text style={styles.subtitle}>
                  IFE ó INE (Visible) con CURP.
                </Text>
              </Block>
            </Block>

            <Block style={styles.itemGroup} row width={width * 0.8}>
              <Image source={Images.Icons.Grupo2} style={styles.imageGroup} />
              <Block style={styles.groupTextContainer}>
                <Text style={styles.title2}>Comprobante de domicilio</Text>
                <Text style={styles.subtitle}>
                  Recibo de luz o agua.
                </Text>
              </Block>
            </Block>

            <Block style={styles.itemGroup} row width={width * 0.8}>
              <Image source={Images.Icons.Grupo3} style={styles.imageGroup} />
              <Block style={styles.groupTextContainer}>
                <Text style={styles.title2}>R.F.C.</Text>
                <Text style={styles.subtitle}>
                  Realiza tu inscripción o actualización de RFC en el SAT.
                </Text>
              </Block>
            </Block>

            <Block style={styles.itemGroup} row width={width * 0.8}>
              <Image source={Images.Icons.Grupo4} style={styles.imageGroup} />
              <Block style={styles.groupTextContainer}>
                <Text style={styles.title2}>Clabe interbancaria</Text>
                <Text style={styles.subtitle}>
                  Herramienta para poder depositar tus ganancias en TAYD.
                </Text>
              </Block>
            </Block>
            
            <Block center>
              <Button
                round
                color={nowTheme.COLORS.BASE}
                style={styles.button}
                loading={this.state.isLoading}
                disabled={this.state.isLoading}
                onPress={() => this.props.navigation.navigate('DocumentosStep1')}>
                <Text style={{ fontFamily: 'montserrat-bold' }} size={14} color={nowTheme.COLORS.WHITE}>
                  Iniciar
                </Text>
              </Button>
            </Block>
          </Block>
        </Block>
      </Block>
    );
  }
}

export default withNavigation(DocumentosIndexScreen);

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.COLORS.BLACK
  },
  padded: {
    paddingHorizontal: theme.SIZES.BASE * 2,
    paddingTop: 20,
    position: 'absolute'
  },
  title: {
    fontFamily: 'trueno-extrabold',
    color: nowTheme.COLORS.WHITE,
    fontSize: 45,
    textAlign: 'center',
  },
  itemGroup: {
    paddingVertical: 15,
  },
  groupTextContainer: {
    paddingLeft: 15,
    paddingRight: 10,
  },  
  title2: {
    fontFamily: 'trueno-extrabold',
    color: nowTheme.COLORS.WHITE,
    fontSize: 24,
    textAlign: 'left',
  },
  subtitle: {
    fontFamily: 'trueno-light',
    fontSize: 18,
    color: nowTheme.COLORS.WHITE,
    textAlign: 'left',
  },
  button: {
    width: width * 0.4,
    height: theme.SIZES.BASE * 2.5,
    shadowRadius: 0,
    shadowOpacity: 0
  },
  imageCamara: {
    width: 50,
    height: 40,
  },
  imageGroup: {
    width: 50,
    height: 50
  }
});

