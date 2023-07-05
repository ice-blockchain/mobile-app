// SPDX-License-Identifier: ice License 1.0

import {Avatar} from '@components/Avatar/Avatar';
import {Touchable} from '@components/Touchable';
import {COLORS} from '@constants/colors';
import {MainStackParamList} from '@navigation/Main';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {userIdSelector} from '@store/modules/Account/selectors';
import {BinIcon} from '@svg/BinIcon';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import React, {memo, useCallback} from 'react';
import {StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native';
import {useSelector} from 'react-redux';
import {rem} from 'rn-units';

interface Props {
  style?: StyleProp<ViewStyle>;
  userId: string;
}

export const UserItem = memo(({style, userId}: Props) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackParamList>>();

  const currentUserId = useSelector(userIdSelector);

  const userAvatarUri = 'https://i.pravatar.cc/300?img=1';

  const userName = 'User Name';

  const phoneNumber = '123456789';

  const onRemove = useCallback(() => {
    navigation.navigate('PopUp', {
      title: t(
        'chat.channel_administrators.dialogs.delete_administrator.title',
      ),
      message: t(
        'chat.channel_administrators.dialogs.delete_administrator.message',
      ),
      buttons: [
        {
          text: t('button.cancel'),
          preset: 'outlined',
        },
        {
          text: t(
            'chat.channel_administrators.dialogs.delete_administrator.buttons.delete',
          ),
          preset: 'destructive',
          onPress: () => {
            // Remove userId from administrators
          },
        },
      ],
    });
  }, [navigation]);

  return (
    <View style={[styles.container, style]}>
      <Avatar
        uri={userAvatarUri}
        size={rem(46)}
        borderRadius={rem(15)}
        allowFullScreen={false}
      />

      <View style={styles.body}>
        <Text style={styles.name} numberOfLines={1}>
          {userName}
        </Text>

        {phoneNumber ? (
          <Text style={styles.phoneNumber}>{phoneNumber}</Text>
        ) : null}
      </View>

      {currentUserId !== userId && (
        <Touchable style={styles.binContainer} onPress={onRemove}>
          <BinIcon width={rem(24)} height={rem(24)} color={COLORS.attention} />
        </Touchable>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: rem(16),
    flexDirection: 'row',
    alignItems: 'center',
  },

  body: {
    marginLeft: rem(12),
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    ...font(16, null, '700', 'primaryDark'),
  },
  phoneNumber: {
    paddingTop: rem(3),
    ...font(13.5, null, '500', 'emperor'),
  },

  binContainer: {
    marginLeft: rem(12),
  },
});
