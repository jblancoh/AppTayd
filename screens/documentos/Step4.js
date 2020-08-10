import React from 'react';
import { TouchableOpacity, Image, StyleSheet, StatusBar, Dimensions, View, Alert, ScrollView } from 'react-native';
import { Block, Button, Text, theme } from 'galio-framework';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';

import { Images, nowTheme } from '../../constants';
import { withNavigation } from 'react-navigation';

const { height, width } = Dimensions.get('screen');
const smallScreen = height < 812 ? true : false;

class DocumentosStep4Screen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,

            hasPermissionCamera: null,
            cameraType: Camera.Constants.Type.back,
            openCamera: false,
            file1               : this.props.navigation.state.params.fileINE,
            file2               : this.props.navigation.state.params.fileRFC,
            file3               : this.props.navigation.state.params.fileCLABE,
            file4               : null
        };
    }

    async componentDidMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasPermissionCamera: status === 'granted' });
    }

    handleCameraPhoto = async () => {
        if(this.camera) {
            let photo = await this.camera.takePictureAsync({ quality: 1, base64: false });

            Alert.alert("Foto de perfil", "¿Desea volver a tomar otra fotografía o continuar?", [
                {
                    text: 'Volver a tomar',
                    onPress: () => this.setState({openCamera: false}),
                    style: 'cancel'
                },
                {
                    text: 'Continuar', onPress: () => {
                        this.props.navigation.navigate("DocumentosSuccess", {
                            fileINE     : this.state.file1,
                            fileRFC     : this.state.file2,
                            fileCLABE   : this.state.file3,
                            fileProfile : photo,
                        })
                    }
                }
            ])
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
                                <View style={{ marginTop: 30 }}>
                                    <Image source={Images.Icons.CamaraMarco} style={{width: smallScreen ? 240 : 250, height: smallScreen ? 525 : 550}} />
                                </View>

                                <Text style={[{ fontFamily: 'trueno', color: nowTheme.COLORS.WHITE, fontSize: 8, paddingTop: 5 }]}>Asegúrate de que el documento sea legible.</Text>

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
                        <View style={{height}}>
                            <ScrollView>
                                <Block flex={1} middle space="between" style={styles.padded}>
                                    <Image source={Images.Icons.MujerPerfil} style={[styles.itemGroup, { marginTop: 10 }]} />

                                    <Image source={Images.Icons.Grupo4} style={[styles.imageGroup, styles.itemGroup, { marginTop: 20}]} />

                                    <Text style={[styles.title]}>Foto de perfil</Text>

                                    <Text style={[styles.subtitle, {paddingBottom: 25}]}>
                                        (Obligatorio)
                                    </Text>

                                    <Text style={[styles.subtitle, styles.itemGroup]}>
                                        Para comodidad y confianza del servicio debemos mostrar nuestra fotografía en el perfil de TAYDER.
                                    </Text>
                                    <Text style={[styles.subtitle, styles.itemGroup]}>
                                        Te recomendamos tu fotografía muestre tu rostro y la parte superior de los hombros.
                                    </Text>
                                    <Text style={[styles.subtitle, styles.itemGroup, { paddingBottom: 40 }]}>
                                        Evita: usar anteojos de sol, sombreros y una fotografía mal iluminada,
                                    </Text>

                                    <Block center style={{marginBottom: 30}}>
                                        <Button
                                            round
                                            color={nowTheme.COLORS.BASE}
                                            style={styles.button}
                                            loading={this.state.isLoading}
                                            disabled={this.state.isLoading}
                                            onPress={() => this.setState({openCamera : true})}>
                                            <Text style={{ fontFamily: 'trueno-semibold' }} size={14} color={nowTheme.COLORS.WHITE}>
                                                TOMAR FOTO
                                            </Text>
                                        </Button>
                                    </Block>
                                </Block>
                            </ScrollView>
                        </View>
                    )
                }
            </Block>
        );
    }
}

export default withNavigation(DocumentosStep4Screen);

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.COLORS.BLACK
    },
    padded: {
        paddingHorizontal: theme.SIZES.BASE * 2,
        paddingTop: 40,
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

