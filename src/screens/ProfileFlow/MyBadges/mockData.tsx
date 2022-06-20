// SPDX-License-Identifier: BUSL-1.1

import {BadgeCategory} from '@screens/ProfileFlow/MyBadges/components/CategorySwitcher';
import {IceBreaker} from '@svg/Badges/IceBreaker';
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
      title: 'Ice Breaker',
      description: 'Below 3 ice friends',
      renderIcon: IceBreaker,
      progress: 11.23,
      active: true,
    },
    {
      title: 'Ice Breaker',
      description: 'Below 3 ice friends',
      renderIcon: IceBreaker,
      progress: 42.23,
      active: true,
    },
    {
      title: 'Ice Breaker',
      description: 'Below 3 ice friends',
      renderIcon: IceBreaker,
      progress: 42.23,
      active: true,
    },
    {
      title: 'Ice Breaker',
      description: 'Below 3 ice friends',
      renderIcon: IceBreaker,
      progress: 42.23,
      active: false,
    },
    {
      title: 'Ice Breaker',
      description: 'Below 3 ice friends',
      renderIcon: IceBreaker,
      progress: 42.23,
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
  level: [
    {
      title: 'Ice Breaker',
      description: 'Below 3 ice friends',
      renderIcon: IceBreaker,
      progress: 26.11,
      active: true,
    },
    {
      title: 'Ice Breaker',
      description: 'Below 3 ice friends',
      renderIcon: IceBreaker,
      progress: 26.11,
      active: true,
    },
    {
      title: 'Ice Breaker',
      description: 'Below 3 ice friends',
      renderIcon: IceBreaker,
      progress: 26.11,
      active: true,
    },
    {
      title: 'Ice Breaker',
      description: 'Below 3 ice friends',
      renderIcon: IceBreaker,
      progress: 26.11,
      active: false,
    },
    {
      title: 'Ice Breaker',
      description: 'Below 3 ice friends',
      renderIcon: IceBreaker,
      progress: 26.11,
      active: false,
    },
    {
      title: 'Ice Breaker',
      description: 'Below 3 ice friends',
      renderIcon: IceBreaker,
      progress: 26.11,
      active: false,
    },
  ],
};
