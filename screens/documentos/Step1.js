import React from 'react';
import { TouchableOpacity, ImageBackground, Image, StyleSheet, StatusBar, Dimensions, Platform, TouchableHighlight, View, TouchableWithoutFeedback, Keyboard, Alert, AsyncStorage } from 'react-native';
import { Block, Button, Text, theme, Checkbox } from 'galio-framework';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import { Icon, Input } from '../../components';

import { Images, nowTheme } from '../../constants';
import { withNavigation } from 'react-navigation';

const { height, width } = Dimensions.get('screen');

const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>{children}</TouchableWithoutFeedback>
);

class DocumentosStep1Screen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            isTayder: true,
            isLoading: false,

            hasPermissionCamera: null,
            cameraType: Camera.Constants.Type.back,
            openCamera: false,
            files: []
        };
    }

    async componentDidMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasPermissionCamera: status === 'granted' });
    }

    async askPermissions() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasPermissionCamera: status === 'granted' });

        if (this.state.hasPermissionCamera) {
            this.setState({ openCamera: true });
        } else {
            Alert.alert('Permiso denegado', 'No se concedieron permisos para acceder a la cámara.');
        }
    }

    handleCameraPhoto = async () => {
        if (this.camera) {
            let photo = await this.camera.takePictureAsync({ quality: 1, base64: false });
            let arrFiles = this.state.files;

            arrFiles.push(photo);

            this.setState({ openCamera: false, files: arrFiles });
        }
    }

    render() {
        const { navigation } = this.props;

        return (
            <Block flex style={styles.container}>
                <StatusBar barStyle="light-content" />
                {
                    this.state.openCamera
                    ? (
                        <Camera
                            ref={ref => { this.camera = ref }}
                            style={{ flex: 1, justifyContent: 'space-between' }}
                            type={this.state.cameraType}>
                            <View style={{ flex: 1, flexDirection: "row", justifyContent: "flex-end", margin: 30 }}>
                                <TouchableOpacity
                                    style={{
                                        alignSelf: 'flex-end',
                                        alignItems: 'center',
                                        backgroundColor: 'transparent',
                                    }}
                                    onPress={() => this.handleCameraPhoto()}
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
                        <Block flex={1} middle space="between" style={styles.padded}>
                            <Block center flex={1}>
                                <Block middle>
                                    <Image source={Images.Icons.INE} style={[styles.itemGroup, { marginTop: 10 }]} />

                                    <Image source={Images.Icons.Grupo1} style={[styles.imageGroup, styles.itemGroup, { marginTop: 20}]} />

                                    <Text style={[styles.title]}>Identificación oficial</Text>

                                    <Text style={[styles.subtitle, {paddingBottom: 40}]}>
                                        IFE ó INE (Visible) con CURP.
                                    </Text>

                                    <Text style={[styles.subtitle, styles.itemGroup]}>
                                        Toma una fotografía de tu
                                        identificación oficial, te aconsejamos
                                        que tu ID sea VIGENTE y ORIGINAL.
                                    </Text>
                                    <Text style={[styles.subtitle, styles.itemGroup]}>
                                        La imagen debe verse claramente y sin
                                        obstruir la información y la foto del
                                        propietario.
                                    </Text>
                                    <Text style={[styles.subtitle, styles.itemGroup, { paddingBottom: 40 }]}>
                                        Te recomendamos evitar el uso del
                                        flash de tu teléfono en caso de que
                                        este pueda sobreexponer la claridad y
                                        legibilidad de los datos.
                                    </Text>
                                </Block>

                                <Block center>
                                    <Button
                                        round
                                        color={nowTheme.COLORS.BASE}
                                        style={styles.button}
                                        loading={this.state.isLoading}
                                        disabled={this.state.isLoading}
                                        onPress={() => this.setState({openCamera : true})}>
                                        <Text style={{ fontFamily: 'montserrat-bold' }} size={14} color={nowTheme.COLORS.WHITE}>
                                            TOMAR FOTO
                                        </Text>
                                    </Button>
                                </Block>
                            </Block>
                        </Block>
                    )
                }
            </Block>
        );
    }
}

export default withNavigation(DocumentosStep1Screen);

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
        fontSize: 24,
        textAlign: 'center',
    },
    itemGroup: {
        paddingVertical: 15,
    },
    subtitle: {
        fontFamily: 'trueno',
        fontSize: 18,
        color: nowTheme.COLORS.WHITE,
        textAlign: 'center',
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

