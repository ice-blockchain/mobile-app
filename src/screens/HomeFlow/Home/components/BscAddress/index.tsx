// SPDX-License-Identifier: ice License 1.0

import {FramedBscIcon} from '@components/FramedBscIcon';
import {ActionListItem} from '@components/ListItems/ActionListItem';
import {SectionHeader} from '@components/SectionHeader';
import {COLORS} from '@constants/colors';
import {SCREEN_SIDE_OFFSET} from '@constants/styles';
import {Images} from '@images';
import {MainNavigationParams} from '@navigation/Main';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {unsafeUserSelector} from '@store/modules/Account/selectors';
import {ChevronSmallIcon} from '@svg/ChevronSmallIcon';
import {isRTL, t} from '@translations/i18n';
import {font} from '@utils/styles';
import React, {memo} from 'react';
import {StyleSheet, Text} from 'react-native';
import {useSelector} from 'react-redux';
import {rem} from 'rn-units';

const ICON_CONTAINER_SIZE = rem(36);
const ICON_SIZE = rem(24);

export const BscAddress = memo(() => {
  const navigation =
    useNavigation<NativeStackNavigationProp<MainNavigationParams>>();

  const user = useSelector(unsafeUserSelector);

  const onPress = () => navigation.navigate('BscAddress');

  return (
    <>
      <SectionHeader title={t('home.bsc_address.title')} />
      <ActionListItem
        onPress={onPress}
        containerStyle={styles.container}
        LeadingIcon={
          <FramedBscIcon
            iconColor={COLORS.goldenZest}
            style={styles.iconStyle}
            iconSize={ICON_SIZE}
          />
        }
        title={t('home.bsc_address.title')}
        subtitle={
          user.miningBlockchainAccountAddress ? (
            <Text
              style={styles.subtitleText}
              numberOfLines={1}
              ellipsizeMode={'middle'}>
              {user.miningBlockchainAccountAddress}
            </Text>
          ) : (
            t('home.bsc_address.subtitle')
          )
        }
        TrailingIcon={
          <ChevronSmallIcon style={styles.chevron} color={COLORS.white} />
        }
        backgroundImageSource={Images.backgrounds.darkListItem}
        leadingIconContainerStyle={styles.leadingIconContainer}
        titleTextStyle={styles.text}
        subtitleTextStyle={styles.text}
      />
    </>
  );
});

const styles = StyleSheet.create({
  container: {
    marginHorizontal: SCREEN_SIDE_OFFSET,
    marginTop: rem(16),
  },
  chevron: {
    transform: [{rotateZ: isRTL ? '90deg' : '-90deg'}],
  },
  leadingIconContainer: {
    backgroundColor: COLORS.white,
  },
  text: {
    color: COLORS.white,
  },
  subtitleText: {
    width: '90%',
    marginTop: rem(4),
    ...font(12, 14.4, 'medium', 'white'),
  },
  iconStyle: {
    width: ICON_CONTAINER_SIZE,
    height: ICON_CONTAINER_SIZE,
    borderRadius: rem(10),
    backgroundColor: COLORS.white,
  },
});
