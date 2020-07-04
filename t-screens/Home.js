import React from "react";
import { StyleSheet, Dimensions, ImageBackground, Image, StatusBar, View } from "react-native";
import { Block, theme, Text, Button } from "galio-framework";
import Carousel from 'react-native-snap-carousel';

import { TabBarTayder, Switch } from "../components";
import { Images, nowTheme } from '../constants/';

const { width } = Dimensions.get("screen");

export default class HomeTayder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOnline: true,
      hasAcceptButton: true,
      statusText: 'En Línea',
      activeIndex: 0,
      carouselIntroItems: [
        { image: Images.CarouselIndicador01 },
        { image: Images.CarouselIndicador02 },
        { image: Images.CarouselIndicador03 },
        { image: Images.CarouselIndicador04 },
        { image: Images.CarouselIndicador05 },
        { image: Images.CarouselIndicador06 },
        { image: Images.CarouselIndicador07 },
        { image: Images.CarouselIndicador08 },
      ]
    };
  }

  _changeStatus = (switchValue) => {
    let message = switchValue ? 'En Línea' : 'Desconectado';
    this.setState({ isOnline: !this.state.isOnline, statusText: message });
  }

  _renderItem = ({ item, index }) => {
    console.log(index);
    return (
      <View style={{height: 560}}>
        <Image source={item.image} style={{ height: 550, width: 300, resizeMode: 'stretch',}} />
      </View>
    )
  }

  onSnapToItem = (index) => {
    this.setState({activeIndex : index});
  }

  renderBlocks() {
    return (
      <View style={styles.blocksContainer}>
        <Block flex>
          <Block row style={{paddingTop: 30}}>
            <Image source={Images.ProfilePicture} style={{borderRadius: 50, height: 60, width: 60, marginHorizontal: 25}} />
            <Block flex>
              <Text style={styles.nameTitle}>Christopher</Text>
              <Block row style={{paddingTop: 10}}>
                <Text style={[styles.statusText, this.state.isOnline ? styles.statusOnline : styles.statusOffline]}>{this.state.statusText}</Text>
                <Switch
                  value={this.state.isOnline}
                  style={{ transform: [{ scaleX: 1.6 }, { scaleY: 1.6 }], paddingLeft: 80, marginTop: -10}}
                  onValueChange={this._changeStatus}
                />
              </Block>
            </Block>
          </Block>

          <Block middle style={{paddingVertical: 25}}>
            <Carousel
              layout={"default"}
              data={this.state.carouselIntroItems}
              sliderWidth={width}
              itemWidth={300}
              renderItem={this._renderItem}
              enableSnap
              onSnapToItem={this.onSnapToItem} />
          </Block>
        
        </Block>
      </View>
    );
  };

  render() {
    return (
      <Block flex center style={styles.home}>
        <StatusBar barStyle="light-content" />

        {this.renderBlocks()}

        {
          this.state.hasAcceptButton ? (
            <Block style={{width: '100%', justifyContent: 'center', alignItems: 'center', paddingBottom: 20 }}>
              {
                this.state.activeIndex == 7 && (
                  <Button
                    round
                    color={nowTheme.COLORS.BASE}
                    style={styles.button}
                    onPress={() => this.setState({hasAcceptButton : false})}>
                    <Text style={{fontFamily: 'trueno-semibold', color: nowTheme.COLORS.WHITE, }} size={14}>
                      EMPEZAR
                    </Text>
                  </Button>
                )
              }
            </Block>
          ) : (
            <TabBarTayder {...this.props} activeScreen="home" />
          )
        }
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  home: {
    width: width,
    backgroundColor: nowTheme.COLORS.BLACK,
  },
  nameTitle: {
    fontFamily: 'trueno-extrabold',
    fontSize: 24,
    color: nowTheme.COLORS.WHITE,
    lineHeight: 29,
  },
  statusText: {
    fontFamily: 'trueno',
    fontSize: 14,
    lineHeight: 15,
    color: '#36c550',
  },
  statusOnline: {
    color: '#36c550',
  },
  statusOffline: {
    color: '#C4C4C4',
  },
  blocksContainer: {
    width: width - theme.SIZES.BASE * 2,
    flex: 1,
    paddingVertical: theme.SIZES.BASE,
    paddingHorizontal: 2,
  },
  button: {
    width: width * 0.4,
    height: theme.SIZES.BASE * 2.5,
    shadowRadius: 0,
    shadowOpacity: 0
  },
});
