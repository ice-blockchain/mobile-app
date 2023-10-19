// SPDX-License-Identifier: ice License 1.0

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
import {EthereumIcon} from '@svg/EthereumIcon';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import React, {memo} from 'react';
import {StyleSheet, Text} from 'react-native';
import {useSelector} from 'react-redux';
import {rem} from 'rn-units';

export const EthereumAddress = memo(() => {
  const navigation =
    useNavigation<NativeStackNavigationProp<MainNavigationParams>>();

  const user = useSelector(unsafeUserSelector);

  const onPress = () => navigation.navigate('EthereumAddress');

  return (
    <>
      <SectionHeader title={t('home.ethereum_address.title')} />
      <ActionListItem
        onPress={onPress}
        disabled={!!user.miningBlockchainAccountAddress}
        containerStyle={styles.container}
        LeadingIcon={<EthereumIcon color={COLORS.primaryLight} />}
        title={t('home.ethereum_address.title')}
        subtitle={
          user.miningBlockchainAccountAddress ? (
            <Text
              style={styles.subtitleText}
              numberOfLines={1}
              ellipsizeMode={'middle'}>
              {user.miningBlockchainAccountAddress}
            </Text>
          ) : (
            t('home.ethereum_address.subtitle')
          )
        }
        TrailingIcon={
          user.miningBlockchainAccountAddress ? null : (
            <ChevronSmallIcon style={styles.chevron} color={COLORS.white} />
          )
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
    transform: [{rotateZ: '-90deg'}],
  },
  leadingIconContainer: {
    backgroundColor: COLORS.white,
  },
  text: {
    color: COLORS.white,
  },
  subtitleText: {
    width: '80%',
    marginTop: rem(4),
    ...font(12, 14.4, 'medium', 'white'),
  },
});
