import React from 'react';
import { Image, StyleSheet, StatusBar, Dimensions, Platform, TouchableHighlight, View } from 'react-native';
import { Block, Button, Text, theme } from 'galio-framework';
import { Switch } from '../components';

const { height, width } = Dimensions.get('screen');
import { Images, nowTheme } from '../constants/';
import { HeaderHeight } from '../constants/utils';
import Actions from '../lib/actions';

export default class Onboarding extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isTayder : false
    };
  }

  componentWillMount() {
    Actions.extractUserData().then((result) => {
      if (result != null) {
        this.props.navigation.navigate('PropertyLocation')
      }
    });
  }

  render() {
    const { navigation } = this.props;
    return (
      <Block flex style={[styles.container, this.state.isTayder ? styles.containerBlack:styles.containerRed]}>
        <StatusBar barStyle="light-content" />
        <Block flex>
          <Block space="between" style={styles.padded}>
            <Block>
              <Block row style={{justifyContent : 'center'}}>
                <Image source={this.state.isTayder ? Images.LogoTayder : Images.Logo} style={[this.state.isTayder ? styles.logoTayder : styles.logoTayd]} />
              </Block>

              <Block middle style={{width: width - theme.SIZES.BASE * 4, backgroundColor : 'green'}}>
                  <Text style={[styles.sloganText, this.state.isTayder ? {bottom : 25} : {bottom : 25}]} color="white" size={18}>
                    {this.state.isTayder ? 'Forma parte de nuestro equipo y genera ganancias' : 'Bienvenido a la nueva red de limpieza doméstica'}
                  </Text>
              </Block>

              <Block middle style={{width: width - theme.SIZES.BASE * 4}}>
                <Image source={Images.TaydLogo} style={{ width: 320, height: 70, bottom: 10 }} />
              </Block>

              <Block middle style={{marginBottom : 8, width: width - theme.SIZES.BASE * 4}}>
                <Text style={{fontFamily: 'trueno-semibold', fontWeight: '600'}} size={18} color={nowTheme.COLORS.WHITE}>¿Eres Tayder?</Text>
              </Block>

              <Block middle style={{marginBottom : theme.SIZES.BASE,  width: width - theme.SIZES.BASE * 4}}>
                <Switch
                  value={this.state.isTayder}
                  style={{ transform: [{ scaleX: 1.6 }, { scaleY: 1.6 }] }}
                  onValueChange={(value) => this.setState({isTayder : !this.state.isTayder})}
                />
              </Block>

              <Block row>
                <Button
                  shadowless
                  style={styles.button}
                  color={nowTheme.COLORS.WHITE}
                  onPress={() => navigation.navigate('Login')}
                >
                  <Text style={{ fontFamily: 'trueno-semibold', fontSize: 20, fontWeight: '600' }} color={this.state.isTayder ? nowTheme.COLORS.BLACK : nowTheme.COLORS.BASE}>INICIAR SESIÓN</Text>
                </Button>
              </Block>
              {
                !this.state.isTayder
                ? (
                  <Block row style={{marginTop: theme.SIZES.BASE * 0.8,marginBottom: theme.SIZES.BASE * 0.5}}>
                    <Button
                      shadowless
                      style={styles.button}
                      color={nowTheme.COLORS.WHITE}
                      onPress={() => navigation.navigate('Register')}
                    >
                      <Text style={{ fontFamily: 'trueno-semibold', fontSize: 20, fontWeight: '600' }} color={nowTheme.COLORS.BASE}>
                        REGISTRARSE
                      </Text>
                    </Button>
                  </Block>
                )
                : (
                  <Block row style={{marginTop: theme.SIZES.BASE * 0.8,marginBottom: theme.SIZES.BASE * 2}}>
                    <View style={{flexDirection : 'row', alignContent : 'center', justifyContent:'center'}}>
                      <Text style={{ fontFamily: 'trueno-semibold', fontSize: 16 }} color={nowTheme.COLORS.WHITE}>¿Aún no tienes una cuenta? </Text>
                      <TouchableHighlight onPress={() => {}}>
                        <View>
                          <Text style={{ fontFamily: 'trueno-semibold', fontSize: 19, fontWeight: '400' }} color={nowTheme.COLORS.BASE}> Regístrate</Text>
                        </View>
                      </TouchableHighlight>
                    </View>
                  </Block>
                )
              }
            </Block>
          </Block>
        </Block>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === 'android' ? - HeaderHeight : 0
  },
  containerRed: {
    backgroundColor: nowTheme.COLORS.BASE,
  },
  containerBlack: {
    backgroundColor: nowTheme.COLORS.BLACK,
  },

  logoTayd : {
    width   : 480,
    height  : 480,
    bottom  : 25
  },
  logoTayder : {
    width   : 300,
    height  : 300,
    bottom  : 125
  },

  sloganText : {
    fontFamily  : 'trueno-semibold',
    position    : 'absolute',
    letterSpacing: 2,
    paddingHorizontal: 20,
    fontWeight: '600',
    textAlign   : 'center',
  },
  padded: {
    paddingHorizontal: theme.SIZES.BASE * 2,
    zIndex: 3,
    position: 'absolute',
    bottom: Platform.OS === 'android' ? theme.SIZES.BASE * 2 : theme.SIZES.BASE * 3
  },
  button: {
    width: width - theme.SIZES.BASE * 4,
    height: theme.SIZES.BASE * 3,
    borderRadius: 50,
  },
});
