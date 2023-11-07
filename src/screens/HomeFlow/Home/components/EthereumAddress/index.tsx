// SPDX-License-Identifier: ice License 1.0

import {ActionListItem} from '@components/ListItems/ActionListItem';
import {SectionHeader} from '@components/SectionHeader';
import {COLORS} from '@constants/colors';
import {LINKS} from '@constants/links';
import {SCREEN_SIDE_OFFSET} from '@constants/styles';
import {Images} from '@images';
import {ChevronSmallIcon} from '@svg/ChevronSmallIcon';
import {EthereumIcon} from '@svg/EthereumIcon';
import {t} from '@translations/i18n';
import {openLinkWithInAppBrowser} from '@utils/device';
import React, {memo} from 'react';
import {StyleSheet} from 'react-native';
import {rem} from 'rn-units';

export const EthereumAddress = memo(() => {
  const onPress = () => openLinkWithInAppBrowser({url: LINKS.WHITEPAPER});

  return (
    <>
      <SectionHeader title={t('home.ethereum_address.title')} />
      <ActionListItem
        onPress={onPress}
        containerStyle={styles.container}
        LeadingIcon={<EthereumIcon color={COLORS.primaryLight} />}
        title={t('home.ethereum_address.title')}
        subtitle={t('home.ethereum_address.subtitle')}
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
    transform: [{rotateZ: '-90deg'}],
  },
  leadingIconContainer: {
    backgroundColor: COLORS.white,
  },
  text: {
    color: COLORS.white,
  },
});
