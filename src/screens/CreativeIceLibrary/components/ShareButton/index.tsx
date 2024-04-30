// SPDX-License-Identifier: ice License 1.0

import {Touchable} from '@components/Touchable';
import {COLORS} from '@constants/colors';
import {LINKS} from '@constants/links';
import {openShareDialog} from '@services/share';
import {ShareIcon} from '@svg/ShareIcon';
import {t} from '@translations/i18n';
import React from 'react';

export function ShareButton() {
  const onShare = () => {
    openShareDialog({
      message: t('creative_library.share'),
      url: LINKS.HOW_TO_BOOTS_EARNINGS,
    });
  };
  return (
    <Touchable onPress={onShare}>
      <ShareIcon color={COLORS.primaryDark} />
    </Touchable>
  );
}
