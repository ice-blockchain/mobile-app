// SPDX-License-Identifier: BUSL-1.1

import {BadgeCategory} from '@screens/ProfileFlow/MyBadges/components/CategorySwitcher';
import {IceBreaker} from '@svg/Badges/IceBreaker';
import {TroubleMaker} from '@svg/Badges/TroubleMaker';
import {ReactNode} from 'react';
import {SvgProps} from 'react-native-svg';

export type Badge = {
  title: string;
  description: string;
  renderIcon: (props: SvgProps) => ReactNode;
  progress: number;
  active: boolean;
};

export const BADGES: {[key in BadgeCategory]: Badge[]} = {
  social: [
    {
      title: 'Ice Breaker',
      description: 'Below 3 ice friends',
      renderIcon: IceBreaker,
      progress: 72.23,
      active: true,
    },
    {
      title: 'Ice Breaker',
      description: 'Below 3 ice friends',
      renderIcon: IceBreaker,
      progress: 72.23,
      active: true,
    },
    {
      title: 'Ice Breaker',
      description: 'Below 3 ice friends',
      renderIcon: IceBreaker,
      progress: 72.23,
      active: false,
    },
    {
      title: 'Ice Breaker',
      description: 'Below 3 ice friends',
      renderIcon: IceBreaker,
      progress: 72.23,
      active: false,
    },
  ],
  coins: [
    {
      title: 'Trouble Maker',
      description: '4-9 ice friends',
      renderIcon: TroubleMaker,
      progress: 11.23,
      active: true,
    },
    {
      title: 'Trouble Maker',
      description: '4-9 ice friends',
      renderIcon: TroubleMaker,
      progress: 42.23,
      active: true,
    },
    {
      title: 'Trouble Maker',
      description: '4-9 ice friends',
      renderIcon: TroubleMaker,
      progress: 42.23,
      active: true,
    },
    {
      title: 'Trouble Maker',
      description: '4-9 ice friends',
      renderIcon: TroubleMaker,
      progress: 42.23,
      active: false,
    },
    {
      title: 'Trouble Maker',
      description: '4-9 ice friends',
      renderIcon: TroubleMaker,
      progress: 42.23,
      active: false,
    },
    {
      title: 'Trouble Maker',
      description: '4-9 ice friends',
      renderIcon: TroubleMaker,
      progress: 72.23,
      active: false,
    },
  ],
  level: [
    {
      title: 'Snowy Plower',
      description: '10-24 ice friends',
      renderIcon: IceBreaker,
      progress: 26.11,
      active: true,
    },
    {
      title: 'Snowy Plower',
      description: '10-24 ice friends',
      renderIcon: IceBreaker,
      progress: 26.11,
      active: true,
    },
    {
      title: 'Snowy Plower',
      description: '10-24 ice friends',
      renderIcon: IceBreaker,
      progress: 26.11,
      active: true,
    },
    {
      title: 'Snowy Plower',
      description: '10-24 ice friends',
      renderIcon: IceBreaker,
      progress: 26.11,
      active: false,
    },
    {
      title: 'Snowy Plower',
      description: '10-24 ice friends',
      renderIcon: IceBreaker,
      progress: 26.11,
      active: false,
    },
    {
      title: 'Snowy Plower',
      description: '10-24 ice friends',
      renderIcon: IceBreaker,
      progress: 26.11,
      active: false,
    },
  ],
};
