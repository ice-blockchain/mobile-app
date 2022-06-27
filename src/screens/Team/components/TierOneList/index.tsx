// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {SCREEN_SIDE_OFFSET} from '@constants/styles';
import {useBottomTabBarOffsetStyle} from '@navigation/hooks/useBottomTabBarOffsetStyle';
import {ContactItem} from '@screens/Team/components/ContactItem';
import {RingIcon} from '@screens/Team/components/ContactsList/assets/Ring';
import {ContactsInviteButton} from '@screens/Team/components/ContactsList/components/ContactsInviteButton';
import {Tier, TierType} from '@screens/Team/components/Tier';
import {ListHeader} from '@screens/Team/components/TierOneList/components/Header';
import {
  getContactsByIdsSelector,
  getIceFriendsSelector,
} from '@store/modules/Team/selectors';
import {WhiteLogoSvg} from '@svg/WhiteLogo';
import {getRandomColor} from '@utils/getRandomColor';
import React, {useCallback} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';
import {rem} from 'rn-units';

interface TierOneListProps {}

export const TierOneList = ({}: TierOneListProps) => {
  const contactsByIds = useSelector(getContactsByIdsSelector);
  const iceFriends = useSelector(getIceFriendsSelector);

  const tabbarOffest = useBottomTabBarOffsetStyle({extraOffset: 20});

  const renderItem = useCallback(
    ({item, index}: {item: string; index: number}) => {
      const contact = contactsByIds[item];
      return (
        <ContactItem
          index={index}
          item={contact}
          backgroundColor={getRandomColor()}
          leftIconContent={<WhiteLogoSvg />}
          indicatorContent={
            <View
              style={[
                styles.activityIndicatorContainer,
                {
                  backgroundColor: contact?.isActive
                    ? COLORS.shamrock
                    : COLORS.cadetBlue,
                },
              ]}
            />
          }
          rightSideButton={
            <ContactsInviteButton
              icon={<RingIcon />}
              text={'PING'}
              onPress={() => onPress(item)}
            />
          }
        />
      );
    },
    [contactsByIds],
  );

  const onPress = (id: string) => {
    console.log(id);
  };

  if (!iceFriends.length) {
    return <Tier type={TierType.tierOne} />;
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
    width: '100%',
    marginTop: 22,
  },
  activityIndicatorContainer: {
    width: rem(15),
    height: rem(15),
    borderRadius: rem(7.5),
    borderWidth: 2,
    borderColor: COLORS.white,
  },
});
