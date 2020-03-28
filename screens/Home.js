import React from "react";
import { StyleSheet, Dimensions, ScrollView, Image, StatusBar } from "react-native";
import { Block, theme, Text } from "galio-framework";

import { Card, CardFullImage, Button, TabBar } from "../components";
import options from "../constants/options";
import { Images, nowTheme } from '../constants/';

const { width } = Dimensions.get("screen");

class Home extends React.Component {
  renderArticles = () => {
    return (
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.articles}>
        <Block flex>
          <StatusBar barStyle="dark-content" />
          <Block flex row style={{paddingTop: 30}}>
            <Image source={Images.ProfilePicture} style={{borderRadius: 50, height: 60, width: 60, marginRight: 25}} />
            <Block flex>
              <Text style={styles.nameTitle}>Bienvenido Chris</Text>
              <Text>¿En qué podemos ayudarte?</Text>
            </Block>
          </Block>

          <CardFullImage image={Images.Inicio001} imageStyle={{ height: 300, width: '100%' }} />
          {/* <Card full image={Images.Inicio001} title="La innovación de la limpieza" subtitle="Conoce los servicios que TAYD tiene para tí." /> */}

          <Block flex row>
            <CardFullImage image={Images.Inicio002} imageStyle={{height : 320, width: '100%'}} style={{marginRight : theme.SIZES.BASE}} />
            <Block flex>
              <CardFullImage full image={Images.Inicio003} imageStyle={{ height: 155, width: '100%' }} />
              <CardFullImage full image={Images.Inicio004} imageStyle={{ height: 155, width: '100%' }} />
            </Block>
          </Block>
        </Block>
      </ScrollView>
    );
  };

  render() {
    return (
      <Block flex center style={styles.home}>
        {this.renderArticles()}

        <TabBar {...this.props} activeScreen="home" />
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  home: {
    width: width
  },
  nameTitle: {
    fontFamily: 'trueno-extrabold',
    fontSize: 24,
    color: nowTheme.COLORS.SECONDARY,
    lineHeight: 29,
  },
  subtitle: {
    fontFamily: 'trueno',
    fontSize: 14,
    lineHeight: 15,
    color: nowTheme.COLORS.SECONDARY,
  },
  articles: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE,
    paddingHorizontal: 2,
    fontFamily: 'montserrat-regular'

  }
});

export default Home;
