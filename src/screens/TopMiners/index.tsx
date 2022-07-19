// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {commonStyles} from '@constants/styles';
import {useScrollShadow} from '@hooks/useScrollShadow';
import {Images} from '@images';
import {Header} from '@navigation/components/Header';
import {useBottomTabBarOffsetStyle} from '@navigation/hooks/useBottomTabBarOffsetStyle';
import {TopMinersItem} from '@screens/Stats/components/TopMinersItem';
import {Search} from '@screens/Team/components/Search';
import {TopCountriesIcon} from '@svg/TopCountriesIcon';
import {t} from '@translations/i18n';
import React, {useState} from 'react';
import {ImageSourcePropType, StyleSheet, View} from 'react-native';
import Animated from 'react-native-reanimated';
import {rem} from 'rn-units';

const topMiners = [
  {
    nickname: 'iulianflyby',
    photoUrl: Images.topMiners.monkey,
    ice: 214114114,
  },
  {
    nickname: 'joshitinnograt',
    photoUrl: '',
    ice: 156144144,
  },
  {
    nickname: 'andremary',
    photoUrl: '',
    ice: 94541009,
  },
  {
    nickname: 'parisdophie92',
    photoUrl: '',
    ice: 4144144,
  },
  {
    nickname: 'mikehush',
    photoUrl: '',
    ice: 613190,
  },
  {
    nickname: 'iulianflyby1',
    photoUrl: Images.topMiners.monkey,
    ice: 214114114,
  },
  {
    nickname: 'joshitinnograt1',
    photoUrl: '',
    ice: 156144144,
  },
  {
    nickname: 'andremary1',
    photoUrl: '',
    ice: 94541009,
  },
  {
    nickname: 'parisdophie921',
    photoUrl: Images.topMiners.yoda,
    ice: 4144144,
  },
  {
    nickname: 'mikehush1',
    photoUrl: '',
    ice: 613190,
  },
  {
    nickname: 'iulianflyby2',
    photoUrl: '',
    ice: 214114114,
  },
  {
    nickname: 'joshitinnograt2',
    photoUrl: '',
    ice: 156144144,
  },
  {
    nickname: 'andremary2',
    photoUrl: Images.topMiners.monkey,
    ice: 94541009,
  },
  {
    nickname: 'parisdophie922',
    photoUrl: '',
    ice: 4144144,
  },
  {
    nickname: 'mikehush2',
    photoUrl: Images.topMiners.yoda,
    ice: 613190,
  },
];

interface TopMinersScreenProps {}

export const TopMinersScreen = ({}: TopMinersScreenProps) => {
  const {scrollHandler, shadowStyle} = useScrollShadow();
  const tabbarOffset = useBottomTabBarOffsetStyle();
  const [query, setQuery] = useState('');

  const renderItem = ({
    item,
    index,
  }: {
    item: {
      nickname: string;
      ice: number | string;
      photoUrl: ImageSourcePropType;
    };
    index: number;
  }) => {
    return (
      <TopMinersItem
        nickname={item.nickname}
        miners={item.ice}
        topBorder={index === 0}
        bottomBorder={index === topMiners.length - 1}
        style={commonStyles.shadow}
        photo={item.photoUrl}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Header
        containerStyle={shadowStyle}
        color={COLORS.darkBlue}
        backgroundColor={COLORS.white}
        title={t('stats.top_miners')}
        titleOffset={rem(7)}
        icon={<TopCountriesIcon />}
      />
      <Animated.FlatList
        onScroll={scrollHandler}
        data={topMiners}
        renderItem={renderItem}
        keyExtractor={item => item.nickname}
        ListHeaderComponent={
          <Search
            value={query}
            onChangeText={setQuery}
            style={styles.search}
            placeholderTextColor={COLORS.greyText}
            iconColor={COLORS.greyText}
          />
        }
        contentContainerStyle={[styles.content, tabbarOffset.current]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    marginHorizontal: 24,
    borderRadius: 16,
  },
  search: {
    marginBottom: 20,
    backgroundColor: COLORS.wildSand,
    marginTop: rem(10),
  },
});
