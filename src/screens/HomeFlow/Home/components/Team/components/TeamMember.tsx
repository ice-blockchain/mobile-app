// SPDX-License-Identifier: ice License 1.0

import {Avatar} from '@components/Avatar/Avatar';
import {Touchable} from '@components/Touchable';
import {COLORS} from '@constants/colors';
import {isLightDesign} from '@constants/featureFlags';
import {MainStackParamList} from '@navigation/Main';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {getReferralUserSelector} from '@store/modules/Referrals/selectors';
import {LogoIcon} from '@svg/LogoIcon';
import {font} from '@utils/styles';
import React, {memo} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {useSelector} from 'react-redux';
import {rem} from 'rn-units';

interface Props {
  userId: string;
}

const TEAM_MEMBER_SIZE = rem(60);
const TEAM_MEMBER_BORDER_RADIUS = rem(20);
const DEFAULT_ICON_SIZE = rem(22);
const USERNAME_OFFSET = rem(5);
const USERNAME_LINE_HEIGHT = 12;

export const TeamMember = memo(({userId}: Props) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackParamList>>();

  const {username, profilePictureUrl, phoneNumber} = useSelector(
    getReferralUserSelector({userId}),
  );

  return (
    <Touchable
      disabled={isLightDesign}
      onPress={() => navigation.navigate('UserProfile', {userId})}>
      <View>
        <Avatar
          uri={profilePictureUrl}
          size={TEAM_MEMBER_SIZE}
          borderRadius={TEAM_MEMBER_BORDER_RADIUS}
          allowFullScreen={false}
        />
        {!!phoneNumber && (
          <View style={styles.friendIcon}>
            <LogoIcon color={COLORS.white} width={rem(15)} height={rem(15)} />
          </View>
        )}
      </View>
      <Text style={styles.usernameText} numberOfLines={1}>
        {username}
      </Text>
    </Touchable>
  );
});

export const TeamMemberSkeleton = () => (
  <SkeletonPlaceholder borderRadius={TEAM_MEMBER_BORDER_RADIUS}>
    <View style={styles.skeleton} />
  </SkeletonPlaceholder>
);

export const styles = StyleSheet.create({
  usernameText: {
    marginTop: USERNAME_OFFSET,
    width: TEAM_MEMBER_SIZE,
    ...font(10, USERNAME_LINE_HEIGHT, 'medium', 'secondary', 'center'),
  },
  friendIcon: {
    position: 'absolute',
    bottom: -rem(2),
    right: -rem(1),
    justifyContent: 'center',
    alignItems: 'center',
    width: DEFAULT_ICON_SIZE,
    height: DEFAULT_ICON_SIZE,
    borderRadius: DEFAULT_ICON_SIZE / 2,
    borderWidth: 1,
    borderColor: COLORS.white,
    backgroundColor: COLORS.primaryLight,
  },
  skeleton: {
    width: TEAM_MEMBER_SIZE,
    height: TEAM_MEMBER_SIZE,
    marginBottom: USERNAME_OFFSET + rem(USERNAME_LINE_HEIGHT),
  },
});
