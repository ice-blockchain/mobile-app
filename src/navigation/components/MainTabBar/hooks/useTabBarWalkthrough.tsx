// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import {windowWidth} from '@constants/styles';
import {TabBarIcon} from '@navigation/components/MainTabBar/components/TabBarItem/components/TabBarIcon';
import {iconStyles} from '@navigation/Main';
import {useSetWalkthroughElementData} from '@store/modules/Walkthrough/hooks/useSetWalkthroughElementData';
import {HomeWalkthroughStepKey} from '@store/modules/Walkthrough/steps/home';
import {isRTL} from '@translations/i18n';
import React, {useRef} from 'react';
import {LayoutChangeEvent, StyleSheet, View, ViewStyle} from 'react-native';
import {rem} from 'rn-units';

function tabNameToWalkthroughStepName(
  tabName: string,
): HomeWalkthroughStepKey | null {
  switch (tabName) {
    case 'HomeTab':
      return 'home';
    case 'TeamTab':
      return 'team';
    case 'NewsTab':
      return 'news';
    case 'ProfileTab':
      return 'profile';
  }
  return null;
}

function tabNameToIconStyles(tabName: string): ViewStyle | null {
  switch (tabName) {
    case 'HomeTab':
      return iconStyles.homeIconStyle;
    case 'TeamTab':
      return iconStyles.teamIconStyle;
    case 'NewsTab':
      return iconStyles.newsIconStyle;
    case 'ProfileTab':
      return iconStyles.profileIconStyle;
  }
  return null;
}

export const useTabBarWalkthrough = ({
  tabName,
  onPress,
  onLongPress,
  icon,
}: {
  tabName: string;
  onPress: () => void;
  onLongPress: () => void;
  icon: React.ReactNode;
}) => {
  const stepName = tabNameToWalkthroughStepName(tabName);
  const iconStyle = tabNameToIconStyles(tabName);
  const elementRef = useRef<View>(null);

  const {setWalkthroughElementData} = useSetWalkthroughElementData();

  const onElementLayout = ({nativeEvent}: LayoutChangeEvent) => {
    if (!stepName) {
      return;
    }
    setWalkthroughElementData({
      stepKey: stepName,
      elementData: {
        getRef: () => elementRef,
        getTop: measurements => measurements.pageY,
        render: () => (
          <View
            style={{
              width: nativeEvent.layout.width,
              height: nativeEvent.layout.height,
              marginLeft: isRTL
                ? windowWidth - nativeEvent.layout.x - nativeEvent.layout.width
                : nativeEvent.layout.x,
            }}>
            <TabBarIcon
              icon={
                <View style={[styles.outerContainer, iconStyle]}>
                  <View style={styles.innerContainer}>{icon}</View>
                </View>
              }
              onLongPress={onLongPress}
              onPress={onPress}
              isFocused={true}
            />
          </View>
        ),
      },
    });
  };

  return {
    onElementLayout,
    elementRef,
  };
};

const INNER_CONTAINER_SIZE = rem(40);
const OUTER_CONTAINER_SIZE = INNER_CONTAINER_SIZE + rem(12) * 2;

const styles = StyleSheet.create({
  innerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
    borderRadius: INNER_CONTAINER_SIZE / 2,
    width: INNER_CONTAINER_SIZE,
    height: INNER_CONTAINER_SIZE,
  },
  outerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white02opacity,
    borderRadius: OUTER_CONTAINER_SIZE / 2,
    width: OUTER_CONTAINER_SIZE,
    height: OUTER_CONTAINER_SIZE,
  },
});
