// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import {Images} from '@images';
import {
  PromoItem,
  PromoItemData,
} from '@screens/CreativeIceLibrary/components/PromoSection/components/PromoItem';
import {t} from '@translations/i18n';
import React from 'react';
import {StyleSheet, View} from 'react-native';

const promoItems: PromoItemData[] = [
  {
    image: Images.creativeLibrary.promoSection.webPromo,
    title: t('creative_library.promo_section.web.title'),
    description: t('creative_library.promo_section.web.description'),
    actions: [
      {
        actionText: t('creative_library.promo_section.web.action'),
        actionLink:
          'https://github.com/ice-blockchain/community-assets/tree/master/website-widget',
      },
    ],
  },
  {
    image: Images.creativeLibrary.promoSection.mobilePromo,
    title: t('creative_library.promo_section.mobile.title'),
    description: t('creative_library.promo_section.mobile.description'),
    actions: [
      {
        actionText: t('creative_library.promo_section.mobile.action1'),
        actionLink:
          'https://github.com/ice-blockchain/community-assets/tree/master/android-widget',
      },
      {
        actionText: t('creative_library.promo_section.mobile.action2'),
        actionLink:
          'https://github.com/ice-blockchain/community-assets/tree/master/react-native-widget',
      },
    ],
  },
];

export function PromoSection() {
  return (
    <View style={styles.container}>
      {promoItems.map(promoItem => (
        <PromoItem key={promoItem.title} data={promoItem} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.alabaster,
  },
});
