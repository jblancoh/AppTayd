import React from 'react';
import { Block } from "galio-framework";
import { Easing, Animated } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
// screens
import Home from '../screens/Home';
import History from '../screens/History';
import Schedule from '../screens/Schedule';
import Profile from '../screens/Profile';
import RegisterScreen from '../screens/Register';
import DocumentationScreen from '../screens/Documentation';
import LoginScreen from '../screens/Login';
import Onboarding from '../screens/Onboarding';
import PropertyLocationScreen from '../screens/PropertyLocation';
import PropertyInfoScreen from '../screens/PropertyInfo';

import AgendaIndexScreen from '../screens/agenda/Index';
import AgendaFechaScreen from '../screens/agenda/DateAddressConf';
import AgendaInsumosScreen from '../screens/agenda/SuppliesConf';
import AgendaCheckoutScreen from '../screens/agenda/CheckoutConf';
import AgendaSuccessScreen from '../screens/agenda/Success';

import DomicilioIndexScreen from '../screens/domicilios/Index';

import MetodoPagoIndexScreen from '../screens/metodosPagos/Index';
import MetodoPagoAddCardScreen from '../screens/metodosPagos/AddCard';

import GeneraIngresoIndexScreen from '../screens/generarIngresos/Index';

import SoporteIndexScreen from '../screens/soporte/Index';
import SoporteCitaScreen from '../screens/soporte/Cita';

// drawer
import Menu from './Menu';
import DrawerItem from '../components/DrawerItem';

// header for screens
import Header from '../components/Header';
import { nowTheme } from '../constants';

const transitionConfig = (transitionProps, prevTransitionProps) => ({
  transitionSpec: {
    duration: 400,
    easing: Easing.out(Easing.poly(4)),
    timing: Animated.timing
  },
  screenInterpolator: sceneProps => {
    const { layout, position, scene } = sceneProps;
    const thisSceneIndex = scene.index;
    const width = layout.initWidth;

    const scale = position.interpolate({
      inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
      outputRange: [4, 1, 1]
    });
    const opacity = position.interpolate({
      inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
      outputRange: [0, 1, 1]
    });
    const translateX = position.interpolate({
      inputRange: [thisSceneIndex - 1, thisSceneIndex],
      outputRange: [width, 0]
    });

    const scaleWithOpacity = { opacity };
    const screenName = 'Search';

    if (
      screenName === transitionProps.scene.route.routeName ||
      (prevTransitionProps && screenName === prevTransitionProps.scene.route.routeName)
    ) {
      return scaleWithOpacity;
    }
    return { transform: [{ translateX }] };
  }
});

const ProfileStack = createStackNavigator(
  {
    Profile: {
      screen: Profile,
      navigationOptions: ({ navigation }) => ({
        header: (
          <Header white transparent title="Profile" iconColor={'#CFCFCF'} navigation={navigation} />
        ),
        headerTransparent: true
      })
    }
  },
  {
    cardStyle: { backgroundColor: '#FFFFFF' },
    transitionConfig
  }
);

const DomicilioStack = createStackNavigator(
  {
    DomicilioIndex: {
      screen: DomicilioIndexScreen,
      navigationOptions: ({ navigation }) => ({
        header: (
          <Header back title="Domicilio" iconColor={nowTheme.COLORS.SECONDARY} navigation={navigation} />
        ),
        headerTransparent: false
      })
    }
  },
  {
    cardStyle: { backgroundColor: '#FFFFFF' },
    transitionConfig
  }
);

const MetodoPagoStack = createStackNavigator(
  {
    MetodoPagoIndex: {
      screen: MetodoPagoIndexScreen,
      navigationOptions: ({ navigation }) => ({
        header: (
          <Header back title="Método de pago" iconColor={nowTheme.COLORS.SECONDARY} navigation={navigation} />
        ),
        headerTransparent: false
      })
    }, 
    MetodoPagoAddCard: {
      screen: MetodoPagoAddCardScreen,
      navigationOptions: ({ navigation }) => ({
        header: (
          <Header back title="Método de pago" iconColor={nowTheme.COLORS.SECONDARY} navigation={navigation} />
        ),
        headerTransparent: false
      })
    }
  },
  {
    cardStyle: { backgroundColor: '#FFFFFF' },
    transitionConfig
  }
);

const GeneraIngresoStack = createStackNavigator(
  {
    GeneraIngresoIndex: {
      screen: GeneraIngresoIndexScreen,
      navigationOptions: ({ navigation }) => ({
        header: (
          <Header back title="Genera Ingresos" iconColor={nowTheme.COLORS.SECONDARY} navigation={navigation} />
        ),
        headerTransparent: false
      })
    }
  },
  {
    cardStyle: { backgroundColor: '#FFFFFF' },
    transitionConfig
  }
);

const AppStack = createDrawerNavigator(
  {
    Onboarding: {
      screen: Onboarding,
      navigationOptions: {
        drawerLabel: () => { }
      }
    },
    Register: {
      screen: RegisterScreen,
      navigationOptions: {
        drawerLabel: () => { }
      }
    },
    Documentation: {
      screen: DocumentationScreen,
      navigationOptions: {
        drawerLabel: () => { }
      }
    },
    PropertyLocation: {
      screen: PropertyLocationScreen,
      navigationOptions: {
        drawerLabel: () => { }
      }
    },
    PropertyInfo: {
      screen: PropertyInfoScreen,
      navigationOptions: {
        drawerLabel: () => { }
      }
    },
    Login: {
      screen: LoginScreen,
      navigationOptions: {
        drawerLabel: () => { }
      }
    },
    Home: {
      screen: Home,
      navigationOptions: {
        drawerLabel: () => { }
      }
    },
    History: {
      screen: History,
      navigationOptions: {
        drawerLabel: () => { }
      }
    },
    Schedule: {
      screen: Schedule,
      navigationOptions: {
        drawerLabel: () => { }
      }
    },
    Soporte: {
      screen: SoporteIndexScreen,
      navigationOptions: {
        drawerLabel: () => { }
      }
    },
    SoporteCita: {
      screen: SoporteCitaScreen,
      navigationOptions: {
        drawerLabel: () => { }
      }
    },
    Agenda: {
      screen: AgendaIndexScreen,
      navigationOptions: {
        drawerLabel: () => {}
      }
    },
    AgendaFecha: {
      screen: AgendaFechaScreen,
      navigationOptions: {
        drawerLabel: () => {}
      }
    },
    AgendaInsumos: {
      screen: AgendaInsumosScreen,
      navigationOptions: {
        drawerLabel: () => { }
      }
    },
    AgendaCheckout: {
      screen: AgendaCheckoutScreen,
      navigationOptions: {
        drawerLabel: () => { }
      }
    },
    AgendaSuccess: {
      screen: AgendaSuccessScreen,
      navigationOptions: {
        drawerLabel: () => { }
      }
    },
    Perfil: {
      screen: ProfileStack,
      navigationOptions: navOpt => ({
        drawerLabel: ({ focused }) => (
          <DrawerItem focused={focused} screen="Profile" title="Perfil" />
        )
      })
    },
    Idioma: {
      screen: ProfileStack,
      navigationOptions: navOpt => ({
        drawerLabel: ({ focused }) => (
          <DrawerItem focused={focused} screen="Profile" title="Idioma" />
        )
      })
    },
    Domicilio: {
      screen: DomicilioStack,
      navigationOptions: navOpt => ({
        drawerLabel: ({ focused }) => (
          <DrawerItem focused={focused} screen="DomicilioIndex" title="Domicilio" />
        )
      })
    },
    
    MetodoPago: {
      screen: MetodoPagoStack,
      navigationOptions: navOpt => ({
        drawerLabel: ({ focused }) => (
          <DrawerItem focused={focused} screen="MetodoPagoIndex" title="Método de pago" />
        )
      })
    },

    GeneraIngreso: {
      screen: GeneraIngresoStack,
      navigationOptions: {
        drawerLabel: () => { }
      }
    },
  },
  Menu
);

const AppContainer = createAppContainer(AppStack);
export default AppContainer;
