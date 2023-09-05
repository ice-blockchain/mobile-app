// SPDX-License-Identifier: ice License 1.0

import {Touchable} from '@components/Touchable';
import {COLORS} from '@constants/colors';
import {openShareDialog} from '@services/share';
import {ShareIcon} from '@svg/ShareIcon';
import {t} from '@translations/i18n';
import React from 'react';

export function ShareButton() {
  const onShare = () => {
    openShareDialog({
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
