// SPDX-License-Identifier: ice License 1.0

import {stopPropagation} from '@components/KeyboardDismiss';
import {Touchable} from '@components/Touchable';
import {COLORS} from '@constants/colors';
import {SCREEN_SIDE_OFFSET} from '@constants/styles';
import {useSafeAreaInsets} from '@hooks/useSafeAreaInsets';
import {MainStackParamList} from '@navigation/Main';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {InfoOutlineIcon} from '@svg/InfoOutlineIcon';
import {RoundCheckboxActiveIcon} from '@svg/RoundCheckboxActiveIcon';
import {RoundCheckboxInactiveIcon} from '@svg/RoundCheckboxInactiveIcon';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import React, {useCallback, useState} from 'react';
import {StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';
import Animated, {SlideInDown} from 'react-native-reanimated';
import {rem} from 'rn-units';

type ChannelType = 'public' | 'private';

const CHANNEL_TYPES: ChannelType[] = ['public', 'private'];

export const ChannelTypeSelect = () => {
  const {
    params: {channelId},
  } = useRoute<RouteProp<MainStackParamList, 'Chat/ChannelType'>>();

  const navigation = useNavigation();

  const safeAreaInsets = useSafeAreaInsets();

  const [channelType, setChannelType] = useState<ChannelType>('public');

  const renderChannelType = useCallback(
    (type: ChannelType) => {
      return (
        <Touchable
          key={type}
          style={styles.itemContainer}
          onPress={() => {
            console.log(`Set '${channelType}' channel type for ${channelId}`);

            setChannelType(type);

            navigation.goBack();
          }}>
          {channelType === type ? (
            <RoundCheckboxActiveIcon width={rem(24)} height={rem(24)} />
          ) : (
            <RoundCheckboxInactiveIcon width={rem(24)} height={rem(24)} />
          )}

          <Text style={styles.itemText}>{t(`chat.channel.type.${type}`)}</Text>
        </Touchable>
      );
    },
    [channelId, channelType, navigation],
  );

  return (
    <TouchableWithoutFeedback onPress={navigation.goBack}>
      <View style={styles.background}>
        <Animated.View
          {...stopPropagation}
          entering={SlideInDown}
          style={[
            styles.container,
            {
              paddingBottom: safeAreaInsets.bottom + rem(16),
            },
          ]}>
          <Text style={styles.titleText}>{t('chat.channel_type.title')}</Text>

          {CHANNEL_TYPES.map(renderChannelType)}

          <View style={styles.infoContainer}>
            <InfoOutlineIcon
              color={COLORS.primaryLight}
              width={rem(16)}
              height={rem(16)}
            />

            <Text style={styles.infoText}>{t('chat.channel_type.info')}</Text>
          </View>
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: COLORS.transparentBackground,
  },
  container: {
    paddingTop: rem(30),
    paddingHorizontal: SCREEN_SIDE_OFFSET,
    borderTopLeftRadius: rem(20),
    borderTopRightRadius: rem(20),
    backgroundColor: COLORS.white,
  },
  titleText: {
    ...font(14, 16.8, 'semibold', 'primaryDark'),
  },

  itemContainer: {
    marginTop: rem(24),
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemText: {
    marginLeft: rem(12),
    ...font(12, 14.4, 'regular', 'secondary'),
  },

  infoContainer: {
    marginTop: rem(24),
    padding: rem(16),
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: rem(16),
    backgroundColor: COLORS.aliceBlue,
  },
  infoText: {
    marginLeft: rem(12),
    ...font(12, 14.4, 'regular', 'secondary'),
  },
});
