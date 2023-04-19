// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import {commonStyles, windowWidth} from '@constants/styles';
import {
  Menu,
  ROUNDED_TRIANGLE_OFFSET,
} from '@screens/Modals/ContextualMenu/components/Menu';
import {ContextualMenuButton} from '@screens/Modals/ContextualMenu/types';
import {useSetWalkthroughElementData} from '@store/modules/Walkthrough/hooks/useSetWalkthroughElementData';
import {WalkthroughStepKey} from '@store/modules/Walkthrough/types';
import {CandyBoxMenuIcon} from '@svg/CandyBoxMenuIcon';
import {isRTL} from '@translations/i18n';
import React, {useRef} from 'react';
import {StyleSheet, View} from 'react-native';
import {rem} from 'rn-units';

const MENU_ICON_SIZE = rem(24);
const MENU_ICON_CONTAINER_SIZE = rem(40);
const OUTER_CONTAINER_PADDING = rem(12);
const EXTRA_PADDING = (MENU_ICON_CONTAINER_SIZE - MENU_ICON_SIZE) / 2;
const RTL_PADDING = rem(4);

function contextualMenuButtonToStepKey(
  button: ContextualMenuButton,
): WalkthroughStepKey | null {
  switch (button.id) {
    case 'help':
      return 'help';
    case 'staking':
      return 'preStaking';
    case 'stats':
      return 'stats';
  }
  return null;
}

export const useMenuButtonWalkthrough = ({
  buttons,
}: {
  buttons: ContextualMenuButton[];
}) => {
  const elementRef = useRef<View>(null);

  const {setWalkthroughElementData} = useSetWalkthroughElementData();

  const onElementLayout = () => {
    buttons.forEach((button: ContextualMenuButton) => {
      const stepKey = contextualMenuButtonToStepKey(button);
      if (stepKey) {
        setWalkthroughElementData({
          stepKey,
          elementData: {
            getRef: () => elementRef,
            getTop: measurements =>
              measurements.pageY - OUTER_CONTAINER_PADDING - EXTRA_PADDING,
            render: ({measurements}) => {
              return (
                <View
                  renderToHardwareTextureAndroid={true}
                  style={[
                    styles.mainContainer,
                    {
                      paddingRight: isRTL
                        ? EXTRA_PADDING + RTL_PADDING
                        : windowWidth -
                          measurements.pageX -
                          MENU_ICON_SIZE -
                          EXTRA_PADDING,
                    },
                  ]}>
                  <View style={commonStyles.flexOne} />
                  <View style={styles.outerContainer}>
                    <View style={styles.boxMenuOuterContainer}>
                      <View style={styles.boxMenuInnerContainer}>
                        <CandyBoxMenuIcon
                          stroke={COLORS.downriver}
                          width={MENU_ICON_SIZE}
                          height={MENU_ICON_SIZE}
                        />
                      </View>
                    </View>
                    <Menu
                      coordinates={{
                        right: 0,
                        top: 0,
                      }}
                      buttons={[button]}
                      style={styles.menuContainer}
                    />
                  </View>
                </View>
              );
            },
          },
        });
      }
    });
  };

  return {
    onElementLayout,
    elementRef,
  };
};

const styles = StyleSheet.create({
  mainContainer: {width: windowWidth, flexDirection: 'row'},
  boxMenuOuterContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  boxMenuInnerContainer: {
    width: MENU_ICON_CONTAINER_SIZE,
    height: MENU_ICON_CONTAINER_SIZE,
    borderRadius: MENU_ICON_CONTAINER_SIZE / 2,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuContainer: {
    position: 'relative',
    marginRight: MENU_ICON_SIZE / 2 - EXTRA_PADDING,
    marginTop:
      MENU_ICON_SIZE +
      EXTRA_PADDING +
      OUTER_CONTAINER_PADDING +
      ROUNDED_TRIANGLE_OFFSET,
  },
  outerContainer: {
    borderRadius: 30,
    padding: OUTER_CONTAINER_PADDING,
    marginRight: -OUTER_CONTAINER_PADDING,
    backgroundColor: COLORS.white02opacity,
  },
});
