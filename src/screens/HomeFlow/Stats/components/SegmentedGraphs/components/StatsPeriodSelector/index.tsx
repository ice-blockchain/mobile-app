// SPDX-License-Identifier: ice License 1.0

import {DropDownMenu} from '@components/Menu/DropDownMenu';
import {STATS_PERIODS} from '@store/modules/Stats/constants';
import {StatsPeriod} from '@store/modules/Stats/types';
import {t} from '@translations/i18n';
import React from 'react';

const PERIODS = STATS_PERIODS.map(period => ({
  label: t(`periods.${period}_days`),
  period,
}));

type Props = {
  selectedPeriod: StatsPeriod;
  onChange: (period: StatsPeriod) => void;
};

export const StatsPeriodSelector = ({selectedPeriod, onChange}: Props) => {
  return (
    <DropDownMenu
      selectedIndex={STATS_PERIODS.indexOf(selectedPeriod)}
      options={PERIODS}
      onChange={index => onChange(STATS_PERIODS[index])}
    />
  );
};
