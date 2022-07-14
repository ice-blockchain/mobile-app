// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {FONTS} from '@constants/fonts';
import {useNavigation} from '@react-navigation/native';
import {BackButtonArrow} from '@svg/BackButtonIcon';
import {LogoIconSvg} from '@svg/LogoIcon';
import {TeamHeaderRefferalsSvg} from '@svg/TeamHeaderRefferals';
import {translate} from '@translations/i18n';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {font, rem} from 'rn-units';

interface StatsHeaderProps {}

export const StatsHeader = ({}: StatsHeaderProps) => {
  const navigation = useNavigation();
  const backPress = () => {
    navigation.goBack();
  };
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View>
        <Text style={styles.titleHeader}>
          {translate('stats.header_title')}
        </Text>
        <TouchableOpacity style={styles.backButton} onPress={backPress}>
          <BackButtonArrow />
        </TouchableOpacity>
      </View>

      <View style={styles.info}>
        <View style={styles.infoPart}>
          <LogoIconSvg color={COLORS.white} width={rem(32)} height={rem(32)} />
          <View style={styles.textContainer}>
            <Text style={styles.title}>{translate('stats.online')}</Text>
            <View>
              <Text style={styles.textCount}>{'25,141'}</Text>
            </View>
          </View>
        </View>
        <View style={styles.devider} />
        <View style={styles.infoPart}>
          <TeamHeaderRefferalsSvg />
          <View style={styles.textContainer}>
            <Text style={styles.title}>{translate('stats.total')}</Text>
            <Text style={styles.textCount}>{'139,205'}</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.persianBlue,
  },
  titleHeader: {
    fontSize: font(18),
    color: COLORS.white,
    fontFamily: FONTS.primary.bold,
    textAlign: 'center',
    paddingVertical: 8,
  },
  backButton: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    justifyContent: 'center',
    paddingHorizontal: rem(23),
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
  },
  devider: {
    width: 1,
    height: 22,
    backgroundColor: COLORS.white,
  },
  infoPart: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    marginLeft: rem(12),
  },
  title: {
    fontSize: font(12),
    color: COLORS.white,
    fontFamily: FONTS.primary.medium,
  },
  textCount: {
    fontSize: font(15),
    color: COLORS.white,
    fontFamily: FONTS.primary.black,
  },
});
