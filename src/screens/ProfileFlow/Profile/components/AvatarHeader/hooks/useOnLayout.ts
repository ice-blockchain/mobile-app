// SPDX-License-Identifier: ice License 1.0

import {useCallback, useState} from 'react';
import {LayoutChangeEvent} from 'react-native';

export const useOnLayout = () => {
  const [navigationContainerLeftWidth, setNavigationContainerLeftWidth] =
    useState(0);

  const [navigationContainerRightWidth, setNavigationContainerRightWidth] =
    useState(0);

  const [wrapperWidth, setWrapperWidth] = useState(0);

  const [titleContainerWidth, setTitleContainerWidth] = useState(0);

  const onLayoutNavigationContainerLeft = useCallback(
    ({
      nativeEvent: {
        layout: {width},
      },
    }: LayoutChangeEvent) => {
      setNavigationContainerLeftWidth(width);
    },
    [],
  );

  const onLayoutNavigationContainerRight = useCallback(
    ({
      nativeEvent: {
        layout: {width},
      },
    }: LayoutChangeEvent) => {
      setNavigationContainerRightWidth(width);
    },
    [],
  );

  const onLayoutWrapper = useCallback(
    ({
      nativeEvent: {
        layout: {width},
      },
    }: LayoutChangeEvent) => {
      setWrapperWidth(width);
    },
    [],
  );

  const onLayoutTitleContainer = useCallback(
    ({
      nativeEvent: {
        layout: {width},
      },
    }: LayoutChangeEvent) => {
      setTitleContainerWidth(width);
    },
    [],
  );

  return {
    navigationContainerLeftWidth,
    navigationContainerRightWidth,
    wrapperWidth,
    titleContainerWidth,
    onLayoutNavigationContainerLeft,
    onLayoutNavigationContainerRight,
    onLayoutWrapper,
    onLayoutTitleContainer,
  };
};
