// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import {Images} from '@images';
import {
  PracticesItem,
  PracticesItemData,
} from '@screens/CreativeIceLibrary/components/PracticesSection/components/PracticesItem';
import {CheckMarkIcon} from '@svg/CheckMarkIcon';
import {NoSymbolIcon} from '@svg/NoSymbolIcon';
import {t} from '@translations/i18n';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {rem} from 'rn-units';

const practicesItemData: PracticesItemData[] = [
  {
    image: Images.creativeLibrary.practicesSection.goodPractices,
    title: t('creative_library.practices_section.good.title'),
    color: COLORS.shamrock,
    icon: <CheckMarkIcon width={rem(12)} color={COLORS.shamrock} />,
    rules: [
      {
        title: t('creative_library.practices_section.good.rules.01.title'),
        description: t(
          'creative_library.practices_section.good.rules.01.description',
        ),
      },
      {
        title: t('creative_library.practices_section.good.rules.02.title'),
        description: t(
          'creative_library.practices_section.good.rules.02.description',
        ),
      },
      {
        title: t('creative_library.practices_section.good.rules.03.title'),
        description: t(
          'creative_library.practices_section.good.rules.03.description',
        ),
      },
    ],
  },
  {
    image: Images.creativeLibrary.practicesSection.badPractices,
    title: t('creative_library.practices_section.bad.title'),
    color: COLORS.attention,
    icon: <NoSymbolIcon width={rem(12)} color={COLORS.attention} />,
    rules: [
      {
        title: t('creative_library.practices_section.bad.rules.01.title'),
        description: t(
          'creative_library.practices_section.bad.rules.01.description',
        ),
      },
      {
        title: t('creative_library.practices_section.bad.rules.02.title'),
        description: t(
          'creative_library.practices_section.bad.rules.02.description',
        ),
      },
      {
        title: t('creative_library.practices_section.bad.rules.03.title'),
        description: t(
          'creative_library.practices_section.bad.rules.03.description',
        ),
      },
    ],
  },
];

export function PracticesSection() {
  return (
    <View style={styles.container}>
      {practicesItemData.map(itemData => (
        <PracticesItem key={itemData.title} data={itemData} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.alabaster,
  },
});
