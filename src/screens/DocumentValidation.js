import React, { Component } from 'react';
import { 
    View, 
    Image, 
    Text, 
    Dimensions, 
    StyleSheet, 
    TextInput, 
    TouchableOpacity, 
    Alert,
    AsyncStorage
} from 'react-native';
import UploadImage from '../components/UploadImage';

const {width: WIDTH} = Dimensions.get('window');

export default class DocumentValidationScreen extends Component<{}> {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            isValidating: false,
        }
    }

    _upload() {
        this.setState({isValidating: true})
        /* if(this.state.email != '' && this.state.password != '') {
            this.setState({ isLoading: true });

            AuthenticationService
              .login(this.state.email, this.state.password)
              .then((response) => this._handleResponse(response));
        } else {
            Alert.alert('Todos los campos son requeridos');
        } */
    }

    _handleResponse = async(response) => {
        /* var that = this;

        if(response.result) {
            try {
                await AsyncStorage.setItem('user', JSON.stringify(response.usuario));

                that.setState({isLoading: false});
                Actions.profile();
            } catch(error) {
                that.setState({isLoading: false});
                Alert.alert(error);
            }
        } else {
            that.setState({isLoading: false});
            Alert.alert('Correo o contraseña incorrectas');
        } */
    }

    render() {
        const { isValidating } = this.state;

        return (
            <View style={styles.container}>
                <View style={styles.logoContainer}>
                    <Image style={styles.logo} source={require('../../assets/images/logo.png')} />
                </View>

                {
                    isValidating
                    ? (
                        <View>
                            <Text>Su cita ha sido agendara para el día 05 de Enero del 2020 a las 11:00 hrs.</Text>
                        </View>
                    )
                    : (
                        <View>
                            <View style={styles.documentContainer}>
                                <Text>Identificación oficial (IFE):</Text>
                                <UploadImage
                                    payloadKey='IFE'
                                    endpoint='https://www.api.com/upload'
                                />
                            </View>

                            <View style={styles.documentContainer}>
                                <Text>Coprobante de domicilio:</Text>
                                <UploadImage
                                    payloadKey='Comprobante'
                                    endpoint='https://www.api.com/upload'
                                />
                            </View>

                            <View style={styles.documentContainer}>
                                <Text>Cartas de recomendación:</Text>
                                <UploadImage
                                    payloadKey='Recomendacion'
                                    endpoint='https://www.api.com/upload'
                                />
                            </View>

                            <TouchableOpacity onPress={() => this._upload()} style={styles.buttonLogin}>
                                <Text style={styles.textLogin}>Subir documentos</Text>
                            </TouchableOpacity>
                        </View>
                    )
                }
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 70,
    },
    logo: {
        height: 150,
        width: 150
    },
    documentContainer: {
        justifyContent: 'center',
        flexWrap: 'wrap',
        flexDirection: 'row',
    },
    buttonLogin: {
        width: WIDTH - 55,
        marginLeft: 25,
        height: 45,
        borderRadius: 25,
        backgroundColor: '#2ba17c',
        justifyContent: 'center',
        marginTop: 20
    },
    textLogin: {
        color: 'rgba(255,255,255,0.7)',
        fontSize: 16,
        textAlign: 'center'
    },
});