// SPDX-License-Identifier: ice License 1.0

import {ViewMeasurementsResult} from '@ice/react-native';
import {HomeWalkthroughStepKey} from '@store/modules/Walkthrough/steps/home';
import {NewsWalkthroughStepKey} from '@store/modules/Walkthrough/steps/news';
import {ProfileWalkthroughStepKey} from '@store/modules/Walkthrough/steps/profile';
import {TeamWalkthroughStepKey} from '@store/modules/Walkthrough/steps/team';
import {ReactNode, RefObject} from 'react';
import {View} from 'react-native';

export type WalkthroughElementData = {
  getRef: () => RefObject<View> | null;
  getTop: (measurements: ViewMeasurementsResult) => number;
  render: ({
    measurements,
    onNext,
  }: {
    measurements: ViewMeasurementsResult;
    onNext: () => void;
  }) => ReactNode;
};

export type WalkthroughStepKey =
  | TeamWalkthroughStepKey
  | NewsWalkthroughStepKey
  | ProfileWalkthroughStepKey
  | HomeWalkthroughStepKey;

export type WalkthroughStepStaticData<T> = {
  key: T;
  version: number;
  title: string;
  description: string;
  link?: string;
  Icon?: React.ReactNode;
  circlePosition?: 'top' | 'bottom'; // otherwise automatically
  before?: () => void;
  after?: () => void;
  isActive?: () => boolean;
  zIndex?: number;
};

export interface WalkthroughStep
  extends WalkthroughStepStaticData<WalkthroughStepKey> {
  elementData?: WalkthroughElementData;
}
