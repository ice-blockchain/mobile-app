// SPDX-License-Identifier: ice License 1.0

import {IceLabel} from '@components/Labels/IceLabel';
import {Touchable} from '@components/Touchable';
import {COLORS} from '@constants/colors';
import {SCREEN_SIDE_OFFSET} from '@constants/styles';
import {MainStackParamList} from '@navigation/Main';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  AnalyticsEventLogger,
  EVENT_NAMES,
} from '@store/modules/Analytics/constants';
import {InviteIcon} from '@svg/InviteIcon';
import {LogoTransparentIcon} from '@svg/LogoTransparentIcon';
import {replaceString, t, tagRegex} from '@translations/i18n';
import {font} from '@utils/styles';
import React from 'react';
import {StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native';
import {isAndroid, rem} from 'rn-units';

type Props = {
  style?: StyleProp<ViewStyle>;
};

export const InviteButton = ({style}: Props = {}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackParamList>>();

  const onInvitePress = () => {
    navigation.navigate('InviteShare');
    AnalyticsEventLogger.trackEvent({
      eventName: EVENT_NAMES.INVITE_FRIENDS_BANNER_PRESSED,
    });
  };

  return (
    <Touchable style={[styles.button, style]} onPress={onInvitePress}>
      <LogoTransparentIcon style={styles.backgroundIcon} />

      <View style={styles.iconWrapper}>
        <InviteIcon style={styles.icon} />
      </View>
      <View>
        <Text style={styles.mainText}>{t('button.invite_friend.title')}</Text>
        <Text style={styles.noteText}>
          {replaceString(
            t('button.invite_friend.description'),
            tagRegex('ice'),
            (match, index) => (
              <IceLabel
                key={match + index}
                iconSize={14}
                iconOffsetY={isAndroid ? 3 : 2}
              />
            ),
          )}
        </Text>
      </View>
    </Touchable>
  );
};

const styles = StyleSheet.create({
  button: {
    marginHorizontal: SCREEN_SIDE_OFFSET,
    padding: rem(14),
    flexDirection: 'row',
    height: rem(64),
    borderRadius: rem(15),
    alignItems: 'center',
    backgroundColor: COLORS.primaryLight,
    overflow: 'hidden',
  },
  iconWrapper: {
    marginRight: rem(10),
    width: rem(36),
    height: rem(36),
    borderRadius: rem(12),
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: rem(21),
    height: rem(20),
  },
  mainText: {
    ...font(15, 20, 'black'),
  },
  noteText: {
    marginTop: rem(1),
    ...font(12, 15, 'medium'),
  },
  backgroundIcon: {
    position: 'absolute',
    right: -rem(3),
    top: -rem(18),
    width: rem(74),
    height: rem(74),
  },
});
