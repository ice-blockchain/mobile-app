// SPDX-License-Identifier: BUSL-1.1

import React, {useRef, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import PagerView, {PagerViewOnPageSelectedEvent} from 'react-native-pager-view';
import {rem, font} from 'rn-units';

import WelcomeItem from './components/WelcomeItem';
import NavigationPanel from './components/NavigationPanel';

import {Images} from '@images/index';
import LogoIconSvg from '@svg/logoIcon';
import {FONTS, WEIGHTS} from '@constants/fonts';
import {COLORS} from '@constants/colors';

const Welcome = () => {
  //TODO use i18n
  const welcomeScreenData = [
    {
      key: '1',
      title: 'Welcome to ICE',
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
              <Text style={styles.mediumText}>{' ICE'}</Text>
              <Text style={styles.text}>
                {' is a digital currency that you can mine'}
              </Text>
            </View>
          </View>
          <Text style={styles.text}>
            {'on your phone. ICE is owned and operated by'}
          </Text>
          <Text style={styles.text}>{'every day users like yourself.'}</Text>
        </>
      ),
    },
    {
      key: '2',
      title: 'Planet Friendly',
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
              <Text style={styles.mediumText}>{' ICE'}</Text>
              <Text style={styles.text}>
                {' is inherently more energy efficient than BTC'}
              </Text>
            </View>
          </View>
          <Text style={styles.text}>
            {'as it uses a “Proof of Stake” consensus mechanism.'}
          </Text>
          <Text style={styles.text}>
            {'With proof-of-stake (POS), cryptocurrency'}
          </Text>
          <Text style={styles.text}>
            {'owners validate block transactions based on the'}
          </Text>
          <Text style={styles.text}>
            {'number of coins a validator stakes.'}
          </Text>
        </>
      ),
    },
    {
      key: '3',
      title: 'People’s Coin',
      image: Images.welcome.welcome3,
      imageSize: {
        width: rem(305),
        height: rem(233),
      },
      text: (
        <>
          <Text style={styles.text}>{'The power is in your hands.'}</Text>
          <View style={styles.textContainerWithIcon}>
            <Text style={styles.text}>{'Everything that we develop at '}</Text>
            <LogoIconSvg />
            <View style={styles.textContainer}>
              <Text style={styles.mediumText}>{' ICE'}</Text>
              <Text style={styles.text}>{' will be'}</Text>
            </View>
          </View>
          <Text style={styles.text}>
            {'open source & controlled by the Decentralized'}
          </Text>
          <Text style={styles.text}>{'Autonomous Organization (DAO).'}</Text>
        </>
      ),
    },
    {
      key: '4',
      title: 'Stay Connected',
      image: Images.welcome.welcome4,
      imageSize: {
        width: rem(309),
        height: rem(280),
      },
      text: (
        <>
          <View style={styles.textContainerWithIcon}>
            <Text style={styles.text}>{'Tap '}</Text>
            <LogoIconSvg />
            <Text style={styles.text}>
              {' and start mining today with our free,'}
            </Text>
          </View>
          <Text style={styles.text}>
            {'energy-light mobile app. Your daily tap ensures'}
          </Text>
          <Text style={styles.text}>
            {'that ICE ends up in the hands of real'}
          </Text>
          <Text style={styles.text}>{'humans, not bots.'}</Text>
        </>
      ),
    },
    {
      key: '5',
      title: 'Refer & Earn',
      image: Images.welcome.welcome5,
      imageSize: {
        width: rem(302),
        height: rem(222),
      },
      text: (
        <Text style={styles.text}>
          {
            'Invite your friends and earn up to 25% bonus\non your base mining rate for each friend\nthat joins your team.'
          }
        </Text>
      ),
    },
    {
      key: '6',
      title: 'Notifications',
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
              <Text style={styles.mediumText}>{' ICE'}</Text>
              <Text style={styles.text}>
                {' mining sessions only last for 24 hours.'}
              </Text>
            </View>
          </View>
          <Text style={styles.text}>
            {'Would you like to receive a notification when'}
          </Text>
          <Text style={styles.text}>
            {'your current session ends? Don’t worry,'}
          </Text>
          <Text style={styles.text}>{'we will not spam you!'}</Text>
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
    lineHeight: 24,
    fontFamily: FONTS.primary.regular,
    fontSize: font(14),
    color: COLORS.greyText,
  },
  mediumText: {
    fontWeight: WEIGHTS.medium,
    textAlign: 'center',
    lineHeight: 24,
    fontFamily: FONTS.primary.regular,
    fontSize: font(14),
    color: COLORS.greyText,
  },
});

export default Welcome;
