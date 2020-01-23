import React, { Component } from 'react';
import { 
    View, 
    Image, 
    Text, 
    Dimensions, 
    StyleSheet, 
    TextInput, 
    TouchableOpacity,
    Switch, 
    Alert,
    AsyncStorage
} from 'react-native';

const {width: WIDTH} = Dimensions.get('window');

export default class LoginScreen extends Component<{}> {

    constructor(props) {
        super(props);
        this.state = {
            phoneNumber: '',
            password: '',
            showPass: true,
            pressPass: false,
            switchValue: false,
            isLoading: false
        }
    }

    showPass = () => {
        if( this.state.pressPass == false) {
            this.setState({ showPass: false, pressPass: true})
        } else {
            this.setState({ showPass: true, pressPass: false})
        }
    }

    _login() {
        if(this.state.switchValue) {
            this.props.navigation.navigate('Documents');
        } else {
            this.props.navigation.navigate('Home');
        }
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
        return (
            <View style={styles.container}>
                <View style={styles.logoContainer}>
                    <Image style={styles.logo} source={require('../../assets/images/logo.png')} />
                </View>

                <View style={styles.inputContainer}>
                    <TextInput 
                        style={styles.input}
                        keyboardType="phone-pad"
                        placeholder={'Número Teléfonico'}
                        underlineColorAndroid="#d3d3d3"
                        onSubmitEditing={() => {this.passwordInput.focus();}}
                        blurOnSubmit={false}
                        autoCapitalize = "none"
                        onChangeText={(text) => {this.setState({phoneNumber: text})}}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <TextInput 
                        ref={(input) => { this.passwordInput = input; }}
                        style={styles.input}
                        placeholder={'Contraseña'}
                        secureTextEntry={this.state.showPass}
                        underlineColorAndroid="#d3d3d3"
                        onChangeText={(text) => {this.setState({password: text})}}
                    />
                    <TouchableOpacity style={styles.buttonEye} onPress={this.showPass.bind(this)}>
                        {/* <Icon name={this.state.pressPass == false ? 'visibility' : 'visibility-off'} size={26} color={'rgba(255,255,255, 0.7)'} /> */}
                    </TouchableOpacity>
                </View>

                <View style={styles.inputContainer}>
                    <Text>¿Eres Tayder?</Text>
                    <Switch  
                        onValueChange={(value) => this.setState({ switchValue: value })}
                        value={this.state.switchValue}
                    />
                </View>

                <TouchableOpacity onPress={() => this._login()} style={styles.buttonLogin}>
                    <Text style={styles.textLogin}>Iniciar Sesión</Text>
                </TouchableOpacity>

                <View style={styles.signupContent}>
                    <Text style={styles.signupText}>¿Aún no tienes una cuenta?</Text>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Register')}>
                        <Text style={styles.signupButton}> Registrarse</Text>
                    </TouchableOpacity>
                </View>
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
        width: 150,
        height: 150,
    },
    inputContainer: {
        marginTop: 10,
    },
    input: {
        width: WIDTH - 55,
        height: 45,
        borderRadius: 25,
        fontSize: 16,
        paddingLeft: 45,
        color: '#333333',
        marginHorizontal: 25,
    },
    inputIcon: {
        position: 'absolute',
        top: 8,
        left: 37
    },
    buttonEye: {
        position: 'absolute',
        top: 8,
        right: 37
    },
    buttonLogin: {
        width: WIDTH - 55,
        marginLeft: 25,
        height: 45,
        borderRadius: 25,
        backgroundColor: '#3F0CE8',
        justifyContent: 'center',
        marginTop: 20
    },
    textLogin: {
        color: 'rgba(255,255,255,0.7)',
        fontSize: 16,
        textAlign: 'center'
    },
    signupContent: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50,
        flexDirection: 'row',
        marginHorizontal: 15
    },
    signupText: {
        color: '#333333',
        fontSize:16
    },
    signupButton: {
        color:'#3F0CE8',
        fontSize:16,
        fontWeight:'500'
    }
});