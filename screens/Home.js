import React from "react";
import { StyleSheet, Dimensions, ScrollView } from "react-native";
import { Block, theme, Text } from "galio-framework";

import { Card, Button } from "../components";
import options from "../constants/options";
const { width } = Dimensions.get("screen");

class Home extends React.Component {
  renderArticles = () => {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.articles}
      >
        <Block flex>
          <Block flex row>
            <Card
              item={options[1]}
              style={{ marginRight: theme.SIZES.BASE }}
            />
            <Card item={options[2]} />
          </Block>
          <Card item={options[3]} horizontal />
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
  articles: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE,
    paddingHorizontal: 2,
    fontFamily: 'montserrat-regular'

  }
});

export default Home;
