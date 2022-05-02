// SPDX-License-Identifier: BUSL-1.1

import React, {useRef, useState} from 'react';
import {StyleSheet, View, StatusBar} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import PagerView, {PagerViewOnPageSelectedEvent} from 'react-native-pager-view';
import {rem} from 'rn-units';

import WelcomeItem from './components/WelcomeItem';
import NavigationPanel from './components/NavigationPanel';
import {Images} from '@images/index';
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
      description: [
        [1, translate('welcome.page1.description_row1')],
        translate('welcome.page1.description_row2'),
        translate('welcome.page1.description_row3'),
      ],
    },
    {
      key: '2',
      title: translate('welcome.page2.title'),
      image: Images.welcome.welcome2,
      imageSize: {
        width: rem(280),
        height: rem(309),
      },
      description: [
        [1, translate('welcome.page2.description_row1')],
        translate('welcome.page2.description_row2'),
        translate('welcome.page2.description_row3'),
        translate('welcome.page2.description_row4'),
        translate('welcome.page2.description_row5'),
      ],
    },
    {
      key: '3',
      title: translate('welcome.page3.title'),
      image: Images.welcome.welcome3,
      imageSize: {
        width: rem(305),
        height: rem(233),
      },
      description: [
        translate('welcome.page2.description_row1'),
        [
          translate('welcome.page3.description_row2_part1'),
          1,
          translate('welcome.page3.description_row2_part2'),
        ],
        translate('welcome.page3.description_row3'),
        translate('welcome.page3.description_row4'),
      ],
    },
    {
      key: '4',
      title: translate('welcome.page4.title'),
      image: Images.welcome.welcome4,
      imageSize: {
        width: rem(309),
        height: rem(280),
      },
      description: [
        [
          translate('welcome.page4.description_row1_part1'),
          0,
          translate('welcome.page4.description_row1_part2'),
        ],
        translate('welcome.page4.description_row2'),
        translate('welcome.page4.description_row3'),
        translate('welcome.page4.description_row4'),
      ],
    },
    {
      key: '5',
      title: translate('welcome.page5.title'),
      image: Images.welcome.welcome5,
      imageSize: {
        width: rem(302),
        height: rem(222),
      },
      description: [translate('welcome.page5.description_row1')],
    },
    {
      key: '6',
      title: translate('welcome.page6.title'),
      image: Images.welcome.welcome6,
      imageSize: {
        width: rem(281),
        height: rem(262),
      },
      description: [
        [1, translate('welcome.page6.description_row1')],
        translate('welcome.page6.description_row2'),
        translate('welcome.page6.description_row3'),
        translate('welcome.page6.description_row4'),
      ],
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
              description={v.description}
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
});

export default Welcome;
