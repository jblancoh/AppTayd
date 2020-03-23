import React from "react";
import { StyleSheet, Dimensions, ScrollView, Image, StatusBar } from "react-native";
import { Block, theme, Text } from "galio-framework";

import { Card, CardFullImage, Button } from "../components";
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

          <Card full image={require('../assets/imgs/bg40.jpg')} title="La innovación de la limpieza" subtitle="Conoce los servicios que TAYD tiene para tí." />

          <Block flex row>
            <CardFullImage item={options[3]} style={{marginRight : theme.SIZES.BASE}} />
            <Block flex>
              <CardFullImage item={options[3]} />
              <CardFullImage item={options[3]} />
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
