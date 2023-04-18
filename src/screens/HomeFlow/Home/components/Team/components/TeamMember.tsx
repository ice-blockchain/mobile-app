// SPDX-License-Identifier: ice License 1.0

import {Avatar} from '@components/Avatar/Avatar';
import {Touchable} from '@components/Touchable';
import {COLORS} from '@constants/colors';
import {MainStackParamList} from '@navigation/Main';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {getReferralUserSelector} from '@store/modules/Referrals/selectors';
import {LogoIcon} from '@svg/LogoIcon';
import {font} from '@utils/styles';
import React, {memo} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {rem} from 'rn-units';

interface Props {
  userId: string;
}

const DEFAULT_ICON_SIZE = rem(22);

export const TeamMember = memo(({userId}: Props) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackParamList>>();

  const {username, profilePictureUrl, phoneNumber} = useSelector(
    getReferralUserSelector({userId}),
  );

  return (
    <Touchable onPress={() => navigation.navigate('UserProfile', {userId})}>
      <View>
        <Avatar
          uri={profilePictureUrl}
          size={rem(60)}
          borderRadius={rem(20)}
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

const styles = StyleSheet.create({
  usernameText: {
    marginTop: rem(5),
    width: rem(60),
    ...font(10, 12, 'medium', 'secondary', 'center'),
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
});
