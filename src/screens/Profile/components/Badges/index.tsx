// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {FONTS} from '@constants/fonts';
import {SCREEN_SIDE_OFFSET} from '@constants/styles';
import {
  BadgeCard,
  CARD_OFFSET,
} from '@screens/Profile/components/Badges/components/BadgeCard';
import {IceBreaker} from '@svg/Badges/IceBreaker';
import React, {useCallback} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {font, rem} from 'rn-units';

export const Badges = () => {
  const renderItem = useCallback(() => {
    return (
      <BadgeCard
        renderIcon={IceBreaker}
        title={'Ice Breaker'}
        category={'Social'}
        progressText={'2 of 5'}
        progressValue={60}
      />
    );
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.titleText}>MY BADGES</Text>
        <TouchableOpacity hitSlop={viewAllHitSlop}>
          <Text style={styles.viewAllText}>view all</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
        renderItem={renderItem}
        horizontal={true}
        contentContainerStyle={styles.badgeListContent}
        showsHorizontalScrollIndicator={false}
        style={styles.badgeList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: rem(28),
  },
  header: {
    flexDirection: 'row',
    marginHorizontal: SCREEN_SIDE_OFFSET,
    justifyContent: 'space-between',
  },
  titleText: {
    fontFamily: FONTS.primary.black,
    fontSize: font(14),
    lineHeight: font(17),
    color: COLORS.darkBlue,
  },
  viewAllText: {
    fontFamily: FONTS.primary.regular,
    fontSize: font(12),
    lineHeight: font(15),
    color: COLORS.darkBlue,
  },
  badgeList: {
    marginTop: rem(4),
  },
  badgeListContent: {
    paddingHorizontal: SCREEN_SIDE_OFFSET - CARD_OFFSET,
  },
});

const viewAllHitSlop = {top: 10, right: 15, bottom: 10, left: 15};
