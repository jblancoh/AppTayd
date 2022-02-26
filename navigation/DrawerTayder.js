import React, { useState, useEffect } from 'react';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer'

import { ScrollView, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';
import { Block, Text, theme } from 'galio-framework';
import Images from '../constants/Images';
import { DrawerItem as Item } from '../components/index';
import Actions from '../lib/actions';

import nowTheme from '../constants/Theme';


function DrawerTayder(props) {
  const { state, ...rest } = props;
  const [userData, setUserData] = useState(null)
  const [newState, setNewState] = useState({ ...props.state })

  const _logout = () => {
    Actions.removeUserData().then((response) => {
      if (response) {
        setTimeout(() => {
          props.navigation.navigate('Onboarding')
        }, 500);
      }
    });
  }

  useEffect(() => {
    Actions.extractUserData().then((result) => {
      if (result != null) {
        setUserData(result.user)
      }
    });
    newState.routes = newState.routes.filter(item =>
      item.name !== 'HistoryTayder' &&
      item.name !== 'ServiceInfoTayder' &&
      item.name !== 'ServiceProgressTayder' &&
      item.name !== 'ServiceFinishTayder' &&
      item.name !== 'EarningsTayder' &&
      item.name !== 'ChatServiceTayder' &&
      item.name !== 'SoporteTayder' &&
      item.name !== 'SoporteTayderGuiaBasica'
    )
    setNewState(newState)
  }, [])
  return (
    <DrawerContentScrollView {...props}>
      <Block style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
        <Block row style={styles.header}>
          <Image source={Images.ProfilePicture} style={{ borderRadius: 25, height: 60, width: 60, marginRight: 25 }} />
          <Block flex>
            <Text style={styles.nameTitle}>{userData != null && userData.info ? userData.info.name : ''}</Text>
            <Text style={{ fontFamily: 'trueno', fontSize: 14, lineHeight: 15 }}>{userData != null ? userData.email : ''}</Text>
          </Block>
        </Block>
        <Block flex>
          <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
            <Block style={{ paddingTop: 20 }}>
              <Text style={styles.sectionTitle}>Cuenta</Text>
            </Block>
            <TouchableOpacity onPress={() => props.navigation.navigate('DrawerTayder', { screen: 'HomeTayder' })} style={{ fontFamily: 'trueno', fontSize: 18, paddingTop: 20 }}>
              <Item {...props} title="Inicio" />
            </TouchableOpacity>
            <Text style={styles.sectionTitle}>Extra</Text>
            <TouchableOpacity onPress={() => _logout(props)} style={{ fontFamily: 'trueno', fontSize: 18, }}>
              <Item {...props} title="Cerrar sesión" />
            </TouchableOpacity>
          </ScrollView>
        </Block>

        <Block style={{ justifyContent: 'center', alignSelf: 'center', paddingBottom: 30 }}>
          <Image source={Images.TaydLogoGris} style={{ height: 30, width: 140, marginTop: 20 }} />
        </Block>
      </Block>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    paddingHorizontal: 28,
    paddingTop: theme.SIZES.BASE,
    justifyContent: 'center'
  },
  sectionTitle: {
    fontFamily: 'trueno-extrabold',
    fontSize: 32,
    color: nowTheme.COLORS.SECONDARY,
    paddingLeft: 20,
  },
  nameTitle: {
    fontFamily: 'trueno-extrabold',
    fontSize: 24,
    color: nowTheme.COLORS.SECONDARY,
    lineHeight: 29,
  },
  headerIcon: {
    marginTop: -20
  },
  logo: {
    height: 40,
    width: 37
  }
});

export default DrawerTayder