// SPDX-License-Identifier: ice License 1.0

import {Touchable} from '@components/Touchable';
import {COLORS} from '@constants/colors';
import {ShareIcon} from '@svg/ShareIcon';
import {t} from '@translations/i18n';
import React from 'react';
import {Share as ShareMore} from 'react-native';

export function ShareButton() {
  const onShare = () => {
    ShareMore.share({
      message: t('creative_library.share'),
      url: 'https://ice.io/how-to-boost-your-earnings',
    });
  };
  return (
    <Touchable onPress={onShare}>
      <ShareIcon color={COLORS.primaryDark} />
    </Touchable>
  );
}
