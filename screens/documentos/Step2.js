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

class DocumentosStep2Screen extends React.Component {
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
            this.props.navigation.navigate("DocumentosStep3");
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
                            <View style={{ justifyContent: "center", alignItems: 'center' }}>
                                <View style={{ height: 600, marginTop: 50 }}>
                                    <Image source={Images.Icons.CamaraMarco} style={{ height: 550, width: 250 }} />
                                </View>

                                <Text style={[{ fontFamily: 'trueno', color: nowTheme.COLORS.WHITE, fontSize: 8 }]}>Asegúrate de que el documento sea legible.</Text>

                                <TouchableOpacity
                                    style={{ backgroundColor: 'transparent', marginTop: 10 }}
                                    onPress={() => this.handleCameraPhoto()}
                                >
                                    <Image source={Images.Icons.CamaraBoton} />
                                </TouchableOpacity>
                            </View>
                        </Camera>
                    )
                    : (
                        <Block flex={1} middle space="between" style={styles.padded}>
                            <Block center flex={1}>
                                <Block middle>
                                    <Image source={Images.Icons.RFC} style={[styles.itemGroup, { marginTop: 10 }]} />

                                    <Image source={Images.Icons.Grupo2} style={[styles.imageGroup, styles.itemGroup, { marginTop: 20}]} />

                                    <Text style={[styles.title]}>R.F.C.</Text>

                                    <Text style={[styles.subtitle, {paddingBottom: 40}]}>
                                            Realiza tu inscripción o actualización de RFC en el SAT.
                                    </Text>

                                    <Text style={[styles.subtitle, styles.itemGroup]}>
                                            Toma una fotografía de tu R.F.C., te aconsejamos se encuentre VIGENTE.
                                    </Text>
                                    <Text style={[styles.subtitle, styles.itemGroup]}>
                                        La imagen debe verse claramente y sin
                                        obstruir la información.
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

export default withNavigation(DocumentosStep2Screen);

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.COLORS.BLACK
    },
    padded: {
        paddingHorizontal: theme.SIZES.BASE * 2,
        paddingTop: 40,
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
        fontFamily: 'trueno-light',
        fontSize: 16,
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

