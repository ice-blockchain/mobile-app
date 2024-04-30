// SPDX-License-Identifier: ice License 1.0

import {Avatar} from '@components/Avatar/Avatar';
import {stopPropagation} from '@components/KeyboardDismiss';
import {Touchable} from '@components/Touchable';
import {COLORS} from '@constants/colors';
import {isLightDesign} from '@constants/featureFlags';
import {CountryFlagAbbreviation, flags} from '@flags';
import {MainStackParamList} from '@navigation/Main';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {getReferralUserSelector} from '@store/modules/Referrals/selectors';
import {VerifiedSvg} from '@svg/Verified';
import {font} from '@utils/styles';
import React, {memo, ReactNode} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {isAndroid, rem, screenHeight} from 'rn-units';

const FLAG_WIDTH = rem(24);
const FLAG_HEIGHT = (FLAG_WIDTH / 20) * 14;
const SKELETON_HEIGHT = rem(46);
const SKELETON_MARGIN = rem(16);

export const SKELETONS_PER_SCREEN = Math.ceil(
  screenHeight / (SKELETON_HEIGHT + SKELETON_MARGIN),
);

export const UserListItem = memo(
  ({
    userId,
    AdditionalInfoComponent,
    showFlag = true,
    disabled = false,
  }: {
    userId: string;
    AdditionalInfoComponent?: ReactNode;
    showFlag?: boolean;
    disabled?: boolean;
  }) => {
    const navigation =
      useNavigation<NativeStackNavigationProp<MainStackParamList>>();

    const user = useSelector(
      getReferralUserSelector({
        userId,
      }),
    );

    return (
      <View style={styles.container} {...stopPropagation}>
        <Touchable
          style={styles.touchArea}
          onPress={() => navigation.navigate('UserProfile', {userId})}
          disabled={isLightDesign || disabled}>
          <View style={styles.imageContainer}>
            {user.profilePictureUrl && (
              <Avatar
                uri={user.profilePictureUrl}
                size={rem(46)}
                borderRadius={rem(16)}
                allowFullScreen={false}
              />
            )}
            <View
              style={[
                styles.indicator,
                {
                  backgroundColor: user.active
                    ? COLORS.shamrock
                    : COLORS.cadetBlue,
                },
              ]}
            />
          </View>
          <View style={styles.body}>
            <View style={styles.usernameContainer}>
              <Text style={styles.nameText} numberOfLines={1}>
                {user.username}
              </Text>
              {!!user.verified && <VerifiedSvg style={styles.badge} />}
            </View>
            {user.phoneNumber ? (
              <Text style={styles.noteText}>{user.phoneNumber}</Text>
            ) : null}
          </View>
        </Touchable>
        {AdditionalInfoComponent}
        {showFlag && user.country ? (
          <Image
            style={styles.flag}
            source={
              flags[user.country?.toLowerCase() as CountryFlagAbbreviation]
            }
          />
        ) : null}
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingBottom: rem(14),
    alignItems: 'center',
  },
  body: {
    flex: 1,
    justifyContent: 'center',
  },
  imageContainer: {
    width: rem(46),
    height: rem(46),
    marginRight: rem(14),
  },
  indicator: {
    width: rem(15),
    height: rem(15),
    borderRadius: rem(7.5),
    borderWidth: 2,
    borderColor: COLORS.white,
    position: 'absolute',
    right: -2,
    bottom: -2,
  },
  nameText: {
    marginRight: rem(5),
    ...font(16, null, 'bold', 'primaryDark'),
  },
  noteText: {
    paddingTop: rem(3),
    ...font(13.5, null, 'medium', 'emperor'),
  },
  flag: {
    marginLeft: rem(12),
    width: FLAG_WIDTH,
    height: FLAG_HEIGHT,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: COLORS.black01opacity,
  },
  touchArea: {
    flex: 1,
    flexDirection: 'row',
  },
  usernameContainer: {
    flexDirection: 'row',
    marginRight: rem(20),
  },
  badge: {
    marginTop: isAndroid ? rem(4) : rem(2),
  },
});
