import React from 'react';
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  TouchableOpacity,
  View,
} from 'react-native';
import { Block, Checkbox, Text, Button as GaButton, theme } from 'galio-framework';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';

import { Button, Icon, Input } from '../components';
import { Images, nowTheme } from '../constants';

const { width, height } = Dimensions.get('screen');

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>{children}</TouchableWithoutFeedback>
);

class DocumentationScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasPermissionCamera: null,
      cameraType: Camera.Constants.Type.back,
      isLoading: false,
      openCamera: false,
      files: []
    }
  }

  async componentDidMount() {
    this.setState({isLoading: true})

    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasPermissionCamera: status === 'granted' });
  }

  async askPermissions() {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      this.setState({ hasPermissionCamera: status === 'granted' });
      
      if(this.state.hasPermissionCamera) {
          this.setState({openCamera : true});
      } else {
          Alert.alert('Permiso denegado', 'No se concedieron permisos para acceder a la cámara.');
      }
  }

  handleCameraPhoto = async() => {
    if(this.camera) {
        let photo = await this.camera.takePictureAsync({quality: 1, base64: false});
        let arrFiles = this.state.files;

        arrFiles.push(photo);

        this.setState({openCamera : false, files : arrFiles});
    }
  }

  render() {
    const { navigation } = this.props;
    return (
      <DismissKeyboard>
        {
          this.state.openCamera
          ? (
            <Camera 
              ref={ref => {this.camera = ref}}
              style={{ flex: 1, justifyContent: 'space-between'}}
              type={this.state.cameraType}>
              <View style={{flex:1, flexDirection:"row",justifyContent:"flex-end",margin:30}}>
                  <TouchableOpacity
                      style={{
                          alignSelf: 'flex-end',
                          alignItems: 'center',
                          backgroundColor: 'transparent',
                      }}
                      onPress={()=>this.handleCameraPhoto()}
                      >
                      <Icon
                        size={25}
                        color="#FFF"
                        name="camera"
                        family="FontAwesome"
                      />
                  </TouchableOpacity>
              </View>
          </Camera>
          )
          : (
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
                          <Text
                            style={{
                              fontFamily: 'montserrat-regular',
                              textAlign: 'center'
                            }}
                            color="#333"
                            size={24}
                          >
                            Carga de documentos
                          </Text>
                        </Block>
                      </Block>

                      <Block flex={1} middle space="between">
                        <Block center flex={0.9}>
                          <Block flex space="between">
                            <Block>
                              <Block width={width * 0.8} style={{ marginBottom: 5 }}>
                                <Input
                                  placeholder="Identificación oficial"
                                  style={styles.inputs}
                                  iconContent={
                                    <Icon
                                      size={16}
                                      color="#ADB5BD"
                                      name="camera"
                                      family="FontAwesome"
                                      style={styles.inputIcons}
                                      onPress={() => this.askPermissions()}
                                    />
                                  }
                                />
                              </Block>
                              <Block width={width * 0.8} style={{ marginBottom: 5 }}>
                                <Input
                                  placeholder="Comprobante de domicilio"
                                  style={styles.inputs}
                                  iconContent={
                                    <Icon
                                      size={16}
                                      color="#ADB5BD"
                                      name="camera"
                                      family="FontAwesome"
                                      style={styles.inputIcons}
                                    />
                                  }
                                />
                              </Block>
                              <Block width={width * 0.8} style={{ marginBottom: 5 }}>
                                <Input
                                  placeholder="Carta de recomendación"
                                  style={styles.inputs}
                                  iconContent={
                                    <Icon
                                      size={16}
                                      color="#ADB5BD"
                                      name="camera"
                                      family="FontAwesome"
                                      style={styles.inputIcons}
                                    />
                                  }
                                />
                              </Block>
                            </Block>
                            <Block center>
                              <Button color="primary" round style={styles.createButton}>
                                <Text
                                  style={{ fontFamily: 'montserrat-bold' }}
                                  size={14}
                                  color={nowTheme.COLORS.WHITE}
                                  onPress={() => navigation.navigate('PropertyLocation')}
                                >
                                  Subir documentos
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
          )
        }
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

export default DocumentationScreen;
