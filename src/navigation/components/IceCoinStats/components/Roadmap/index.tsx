// SPDX-License-Identifier: ice License 1.0

import {ActionListItem} from '@components/ListItems/ActionListItem';
import {SectionHeader} from '@components/SectionHeader';
import {COLORS} from '@constants/colors';
import {isLightDesign} from '@constants/featureFlags';
import {LINKS} from '@constants/links';
import {commonStyles, SCREEN_SIDE_OFFSET} from '@constants/styles';
import {ChevronSmallIcon} from '@svg/ChevronSmallIcon';
import {PaperIcon} from '@svg/PaperIcon';
import {isRTL, t} from '@translations/i18n';
import {openLinkWithInAppBrowser} from '@utils/device';
import React, {memo} from 'react';
import {StyleSheet} from 'react-native';
import {rem} from 'rn-units';

export const Roadmap = memo(() => {
  const onPress = () => openLinkWithInAppBrowser({url: LINKS.WHITEPAPER});

  return (
    <>
      <SectionHeader title={t('home.roadmap.title')} />
      <ActionListItem
        onPress={onPress}
        LeadingIcon={<PaperIcon />}
        title={t('home.roadmap.button_title')}
        subtitle={
          isLightDesign
            ? t('override.home.roadmap.button_subtitle')
            : t('home.roadmap.button_subtitle')
        }
        TrailingIcon={
          <ChevronSmallIcon style={styles.chevron} color={COLORS.primaryDark} />
        }
        containerStyle={[styles.container, commonStyles.shadow]}
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
});
