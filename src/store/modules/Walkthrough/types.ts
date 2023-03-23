// SPDX-License-Identifier: ice License 1.0

import {HomeWalkthroughStepKey} from '@store/modules/Walkthrough/steps/home';
import {NewsWalkthroughStepKey} from '@store/modules/Walkthrough/steps/news';
import {TeamWalkthroughStepKey} from '@store/modules/Walkthrough/steps/team';
import {ReactNode, RefObject} from 'react';
import {View} from 'react-native';

export type ElementMeasurements = {
  x: number;
  y: number;
  width: number;
  height: number;
  pageX: number;
  pageY: number;
};

export type WalkthroughElementData = {
  getRef: () => RefObject<View> | null;
  getTop: (measurements: ElementMeasurements) => number;
  render: ({
    measurements,
    onNext,
  }: {
    measurements: ElementMeasurements;
    onNext: () => void;
  }) => ReactNode;
};

export type WalkthroughStepKey =
  | TeamWalkthroughStepKey
  | NewsWalkthroughStepKey
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
};

export interface WalkthroughStep
  extends WalkthroughStepStaticData<WalkthroughStepKey> {
  elementData?: WalkthroughElementData;
}
