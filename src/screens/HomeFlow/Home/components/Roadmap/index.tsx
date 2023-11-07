// SPDX-License-Identifier: ice License 1.0

import {SectionHeader} from '@components/SectionHeader';
import {t} from '@translations/i18n';
import React, {memo} from 'react';

export const Roadmap = memo(() => {
  return (
    <>
      <SectionHeader title={t('home.roadmap.title')} />
    </>
  );
});
