import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import LoginScreen from './screens/Login';
import RegisterScreen from './screens/Register';
import DocumentValidationScreen from './screens/DocumentValidation';
import HomeScreen from './screens/client/Home';
import CardScreen from './screens/client/Card';


const AppNavigator = createStackNavigator(
    {
        Login: LoginScreen,
        Register: RegisterScreen,
        Documents: DocumentValidationScreen,

        Home: HomeScreen,
        Cards: CardScreen,
    },
    {
        initialRouteName: "Login",
        headerMode: 'none',
    }
);

export default createAppContainer(AppNavigator);