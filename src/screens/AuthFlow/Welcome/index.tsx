// SPDX-License-Identifier: BUSL-1.1

import React, {useRef, useState} from 'react';
import {StyleSheet, Text, View, StatusBar} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import PagerView, {PagerViewOnPageSelectedEvent} from 'react-native-pager-view';
import {rem, font} from 'rn-units';
import WelcomeItem from './components/WelcomeItem';
import NavigationPanel from './components/NavigationPanel';
import {Images} from '@images/index';
import LogoIconSvg from '@svg/logoIcon';
import {FONTS, WEIGHTS} from '@constants/fonts';
import {COLORS} from '@constants/colors';
import {translate} from '@utils/i18n';

const Welcome = () => {
  const welcomeScreenData = [
    {
      key: '1',
      title: translate('welcome.page1.title'),
      image: Images.welcome.welcome1,
      imageSize: {
        width: rem(272),
        height: rem(290),
      },
      text: (
        <>
          <View style={styles.textContainerWithIcon}>
            <LogoIconSvg />
            <View style={styles.textContainer}>
              <Text style={styles.mediumText}>
                {translate('global.project_name')}
              </Text>
              <Text style={styles.text}>
                {translate('welcome.page1.description_row1')}
              </Text>
            </View>
          </View>
          <Text style={styles.text}>
            {translate('welcome.page1.description_row2')}
          </Text>
          <Text style={styles.text}>
            {translate('welcome.page1.description_row3')}
          </Text>
        </>
      ),
    },
    {
      key: '2',
      title: translate('welcome.page2.title'),
      image: Images.welcome.welcome2,
      imageSize: {
        width: rem(280),
        height: rem(309),
      },
      text: (
        <>
          <View style={styles.textContainerWithIcon}>
            <LogoIconSvg />
            <View style={styles.textContainer}>
              <Text style={styles.mediumText}>
                {translate('global.project_name')}
              </Text>
              <Text style={styles.text}>
                {translate('welcome.page2.description_row1')}
              </Text>
            </View>
          </View>
          <Text style={styles.text}>
            {translate('welcome.page2.description_row2')}
          </Text>
          <Text style={styles.text}>
            {translate('welcome.page2.description_row3')}
          </Text>
          <Text style={styles.text}>
            {translate('welcome.page2.description_row4')}
          </Text>
          <Text style={styles.text}>
            {translate('welcome.page2.description_row5')}
          </Text>
        </>
      ),
    },
    {
      key: '3',
      title: translate('welcome.page3.title'),
      image: Images.welcome.welcome3,
      imageSize: {
        width: rem(305),
        height: rem(233),
      },
      text: (
        <>
          <Text style={styles.text}>
            {translate('welcome.page2.description_row1')}
          </Text>
          <View style={styles.textContainerWithIcon}>
            <Text style={styles.text}>
              {translate('welcome.page3.description_row2_part1')}
            </Text>
            <LogoIconSvg />
            <View style={styles.textContainer}>
              <Text style={styles.mediumText}>
                {translate('global.project_name')}
              </Text>
              <Text style={styles.text}>
                {translate('welcome.page3.description_row2_part2')}
              </Text>
            </View>
          </View>
          <Text style={styles.text}>
            {translate('welcome.page3.description_row3')}
          </Text>
          <Text style={styles.text}>
            {translate('welcome.page3.description_row4')}
          </Text>
        </>
      ),
    },
    {
      key: '4',
      title: translate('welcome.page4.title'),
      image: Images.welcome.welcome4,
      imageSize: {
        width: rem(309),
        height: rem(280),
      },
      text: (
        <>
          <View style={styles.textContainerWithIcon}>
            <Text style={styles.text}>
              {translate('welcome.page4.description_row1_part1')}
            </Text>
            <LogoIconSvg />
            <Text style={styles.text}>
              {translate('welcome.page4.description_row1_part2')}
            </Text>
          </View>
          <Text style={styles.text}>
            {translate('welcome.page4.description_row2')}
          </Text>
          <Text style={styles.text}>
            {translate('welcome.page4.description_row3')}
          </Text>
          <Text style={styles.text}>
            {translate('welcome.page4.description_row4')}
          </Text>
        </>
      ),
    },
    {
      key: '5',
      title: translate('welcome.page5.title'),
      image: Images.welcome.welcome5,
      imageSize: {
        width: rem(302),
        height: rem(222),
      },
      text: (
        <Text style={styles.text}>
          {translate('welcome.page5.description_row1')}
        </Text>
      ),
    },
    {
      key: '6',
      title: translate('welcome.page6.title'),
      image: Images.welcome.welcome6,
      imageSize: {
        width: rem(281),
        height: rem(262),
      },
      text: (
        <>
          <View style={styles.textContainerWithIcon}>
            <LogoIconSvg />
            <View style={styles.textContainer}>
              <Text style={styles.mediumText}>
                {translate('global.project_name')}
              </Text>
              <Text style={styles.text}>
                {translate('welcome.page6.description_row1')}
              </Text>
            </View>
          </View>
          <Text style={styles.text}>
            {translate('welcome.page6.description_row2')}
          </Text>
          <Text style={styles.text}>
            {translate('welcome.page6.description_row3')}
          </Text>
          <Text style={styles.text}>
            {translate('welcome.page6.description_row4')}
          </Text>
        </>
      ),
    },
  ];

  const pagerViewRef = useRef<PagerView>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const onNextPress = () => {
    const nextPage = currentPage + 1;
    if (nextPage < welcomeScreenData.length) {
      pagerViewRef.current?.setPage(nextPage);
      setCurrentPage(nextPage);
    }
  };

  const onPageSelected = (e: PagerViewOnPageSelectedEvent) => {
    setCurrentPage(e.nativeEvent.position);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={COLORS.white} barStyle="dark-content" />
      <PagerView
        ref={pagerViewRef}
        style={styles.container}
        initialPage={0}
        onPageSelected={onPageSelected}>
        {welcomeScreenData.map(v => (
          <View key={v.key} style={styles.container}>
            <WelcomeItem
              key={v.key}
              title={v.title}
              image={v.image}
              text={v.text}
              index={v.key}
              imageSize={v.imageSize}
            />
          </View>
        ))}
      </PagerView>

      <NavigationPanel
        amount={welcomeScreenData.length}
        activeIndex={currentPage}
        nextPress={onNextPress}
        notNowPress={() => {}}
        yesPleasePress={() => {}}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: rem(20),
  },
  textContainerWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
    lineHeight: rem(24),
    fontFamily: FONTS.primary.regular,
    fontSize: font(14),
    color: COLORS.greyText,
  },
  mediumText: {
    fontWeight: WEIGHTS.medium,
    textAlign: 'center',
    lineHeight: rem(24),
    fontFamily: FONTS.primary.regular,
    fontSize: font(14),
    color: COLORS.greyText,
  },
});

export default Welcome;
