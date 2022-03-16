import React from 'react';
import { Image, StyleSheet, Dimensions, Platform, View, ScrollView } from 'react-native';
import { Block, Button, Text, theme } from 'galio-framework';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Images, nowTheme } from '../../constants';
import { HeaderHeight, iPhoneX } from '../../constants/utils';
import { Input } from '../../components';
import VehicleType from "../../components/VehiclesTypes";

const { height, width } = Dimensions.get('screen');
const smallScreen = height < 812 ? true : false;

export default class VehicleServiceSelectionScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      datetime: this.props.route.params.datetime,
      isIphone: Platform.OS === 'ios',
      vehicleTypeValue: null,
      vehicleModel: '',
      vehicleBrand: '',
      vehicleItems: [],
    };
  }

  async componentDidMount() {
    this.focusListener = await this.props.navigation.addListener('focus', () => {
      this.setState({
        datetime: this.props.route.params.datetime,
        vehicleModel: '',
        vehicleBrand: '',
        vehicleTypeValue: null,
        vehicleItems: [],
      })
    });
  }

  componentWillUnmount() {
    this.focusListener()
  }

  updateVehicleType = (value, arrPrices) => {
    this.setState({ vehicleTypeValue: value, vehicleItems: arrPrices });
  }

  _handleNextAction() {
    if (this.state.vehicleTypeValue != null) {
      this.props.navigation.navigate('VehiculoServicio', {
        datetime: this.state.datetime,
        vehicleType: this.state.vehicleTypeValue,
        vehicleItems: this.state.vehicleItems,
        vehicleModel: this.state.vehicleModel,
        vehicleBrand: this.state.vehicleBrand
      });
    }
  }

  render() {
    const { vehicleTypeValue, vehicleModel, vehicleBrand } = this.state;
    return (
      <KeyboardAwareScrollView style={{ height: '100%' }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Block flex={1}>
            <Block flex={1} style={{ backgroundColor: 'green' }}>
              <Image source={Images.AgendaTipoAuto} style={styles.image} />
            </Block>
            <Block flex={2} style={styles.padded}>
              <Block flex={1.8}>
                <Text style={[styles.title, { paddingTop: smallScreen ? 30 : 5 }, { marginTop: iPhoneX && 10 }]}> Tipo de Vehículo </Text>
                <Text style={[styles.subtitle, { paddingVertical: 10 }]}> Selecciona tu tipo de vehículo </Text>
                <VehicleType value={vehicleTypeValue} updateValue={this.updateVehicleType} />
              </Block>
              <Block flex={1} middle style={{ marginTop: 15 }}>
                <Input
                  placeholder="Marca"
                  value={vehicleBrand}
                  onChangeText={(text) => this.setState({ vehicleBrand: text })}
                  style={styles.inputs}
                />

                <Input
                  placeholder="Modelo"
                  value={vehicleModel}
                  onChangeText={(text) => this.setState({ vehicleModel: text })}
                  style={styles.inputs}
                />
              </Block>
              <Block flex={1} middle style={{ width: width - theme.SIZES.BASE * 4 }}>
                <Button
                  round
                  color={nowTheme.COLORS.BASE}
                  style={styles.createButton}
                  disabled={vehicleTypeValue != null ? false : true}
                  onPress={() => this._handleNextAction()}>
                  <Text style={{ fontFamily: 'trueno-semibold' }} size={14} color={nowTheme.COLORS.WHITE}>
                    SIGUIENTE
                  </Text>
                </Button>
              </Block>
            </Block>
          </Block>
        </ScrollView>
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  padded: {
    paddingHorizontal: theme.SIZES.BASE * 2,
  },

  image: {
    width: width,
    height: height / 3,
  },
  title: {
    fontFamily: 'trueno-extrabold',
    paddingHorizontal: 20,
    fontSize: 30,
    fontWeight: '700',
    textAlign: 'center',
  },
  titleBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#E3E3E3'
  },
  subtitle: {
    fontFamily: 'trueno',
    textAlign: 'center',
    fontSize: 16,
    paddingBottom: 15,
  },
  datetimeText: {
    fontFamily: 'trueno-extrabold',
    paddingHorizontal: 20,
    fontSize: 16,
    fontWeight: '700',
    color: nowTheme.COLORS.BASE
  },
  itemContainer: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'baseline'
  },
  icons: {
    marginRight: 20,
    width: 25,
    height: 25,
  },
  labels: {
    fontFamily: 'trueno-semibold',
    fontSize: 16,
    width: 150,
    marginRight: 20,
  },

  createButton: {
    width: width * 0.5,
    marginTop: 10,
    marginBottom: 10,

    shadowRadius: 0,
    shadowOpacity: 0,
  },

  inputs: {
    borderWidth: 1,
    borderColor: '#E3E3E3',
    borderRadius: 21.5,
    fontFamily: 'trueno',
    fontSize: 17,
    letterSpacing: 20
  },
});