// SPDX-License-Identifier: BUSL-1.1

import {UserSearchInfo} from '@api/user/types';
import {SCREEN_SIDE_OFFSET} from '@constants/styles';
import {useBottomTabBarOffsetStyle} from '@navigation/hooks/useBottomTabBarOffsetStyle';
import {EmptyTier} from '@screens/Team/components/EmptyTier';
import {IceUserItem} from '@screens/Team/components/IceUserItem';
import {ListHeader} from '@screens/Team/components/TierOneList/components/Header';
import {getIceUsersSelector} from '@store/modules/Team/selectors';
import {getRandomColor} from '@utils/getRandomColor';
import React, {useCallback} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';
import {rem, screenWidth} from 'rn-units';

export const TierOneList = () => {
  const iceFriends = useSelector(getIceUsersSelector);

  const tabbarOffest = useBottomTabBarOffsetStyle({extraOffset: 20});

  const renderItem = useCallback(({item}: {item: UserSearchInfo}) => {
    return (
      <IceUserItem
        item={item}
        backgroundColor={getRandomColor()}
        onPress={onPress}
      />
    );
  }, []);

  const onPress = () => {};

  if (!iceFriends.length) {
    return <EmptyTier title={'team.tierOne_tab'} />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tabbarOffest.current}
        ListHeaderComponent={ListHeader}
        style={styles.flatListStyle}
        data={iceFriends}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SCREEN_SIDE_OFFSET,
  },
  flatListStyle: {
    width: screenWidth - rem(48),
    marginTop: 22,
  },
});
