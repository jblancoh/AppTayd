import React from 'react';
import { Image, AsyncStorage } from 'react-native';
import { AppLoading, Notifications } from 'expo';
import * as Font from 'expo-font';
import { Asset } from 'expo-asset';
import { Block, GalioProvider } from 'galio-framework';

import Screens from './navigation/Screens';
import { Images, nowTheme } from './constants';
import * as Permissions from 'expo-permissions';

// cache app images
const assetImages = [
  Images.Onboarding,
  Images.Logo,
  Images.ProfilePicture,
  Images.RegisterBackground,
  Images.ProfileBackground
];

function cacheImages(images) {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

async function getToken() {
  const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);

  if(status !== 'granted') {
    alert("Necesitas habilitar los permisos para las notificaciones");
    return;
  }

  const token = await Notifications.getExpoPushTokenAsync();
  await AsyncStorage.setItem('movil_token', token);
  console.log('Our token', token);
}

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
    fontLoaded: false
  };

  handleNotification = ({origin, data}) => {
    console.log(
      `Push notification ${origin} with data: ${JSON.stringify(data)}`,
    );
  }

  async componentDidMount() {
    Font.loadAsync({
      'montserrat-regular': require('./assets/font/Montserrat-Regular.ttf'),
      'montserrat-bold'   : require('./assets/font/Montserrat-Bold.ttf'),
      'trueno-extrabold'  : require('./assets/font/TruenoExBd.ttf'),
      'trueno-semibold'   : require('./assets/font/TruenoSBd.ttf'),
      'trueno'            : require('./assets/font/TruenoRg.ttf'),
      'trueno-light'      : require('./assets/font/TruenoLt.ttf'),
    });

    getToken();
    this.listener = Notifications.addListener(this.handleNotification);

    this.setState({ fontLoaded: true });
  }

  render() {
    if (!this.state.isLoadingComplete) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <GalioProvider theme={nowTheme}>
          <Block flex>
            <Screens />
          </Block>
        </GalioProvider>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([...cacheImages(assetImages)]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    if (this.state.fontLoaded) {
      this.setState({ isLoadingComplete: true });
    }
  };
}
