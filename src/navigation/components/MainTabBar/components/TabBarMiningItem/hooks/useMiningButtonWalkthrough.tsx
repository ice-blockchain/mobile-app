// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import {TAB_BAR_MINING_BUTTON_SIZE} from '@navigation/components/MainTabBar/components/TabBarMiningItem';
import {MiningButton} from '@navigation/components/MainTabBar/components/TabBarMiningItem/components/MiningButton';
import {WalkthroughElementContainer} from '@screens/Walkthrough/components/WalkthroughElementContainer';
import {miningStateSelector} from '@store/modules/Tokenomics/selectors';
import {WalkthroughActions} from '@store/modules/Walkthrough/actions';
import {useSetWalkthroughElementData} from '@store/modules/Walkthrough/hooks/useSetWalkthroughElementData';
import {TapIcon} from '@svg/TapIcon';
import {mirrorTransform} from '@utils/styles';
import React, {useCallback, useEffect, useRef} from 'react';
import {StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {rem} from 'rn-units';

const TAB_ICON_WIDTH = rem(64);
const TAB_ICON_HEIGHT = rem(56);

export const useMiningButtonWalkthrough = () => {
  const elementRef = useRef<View>(null);

  const {setWalkthroughElementData} = useSetWalkthroughElementData();

  const miningState = useSelector(miningStateSelector);
  const isInactive = miningState === 'inactive';
  const dispatch = useDispatch();

  const onElementLayout = useCallback(() => {
    const stepKey = isInactive ? 'earningIceStart' : 'earningIceSeeMore';
    setWalkthroughElementData({
      stepKey,
      elementData: {
        getRef: () => elementRef,
        getTop: measurements => measurements.pageY,
        render: () => (
          <WalkthroughElementContainer
            innerStyle={styles.innerContainer}
            outerStyle={styles.outerContainer}>
            <MiningButton
              onPressCallback={() => {
                if (stepKey === 'earningIceStart') {
                  dispatch(
                    WalkthroughActions.RESTART_WALKTHROUGH.STATE.create(),
                  );
                }
              }}
            />
            <View style={styles.tapIconContainer} pointerEvents={'none'}>
              <TapIcon
                pointerEvents={'none'}
                color={COLORS.white}
                width={TAB_ICON_WIDTH}
                height={TAB_ICON_HEIGHT}
              />
            </View>
          </WalkthroughElementContainer>
        ),
      },
    });
  }, [dispatch, isInactive, setWalkthroughElementData]);

  useEffect(() => {
    if (!isInactive) {
      onElementLayout();
    }
  }, [isInactive, onElementLayout]);

  return {
    onElementLayout,
    elementRef,
  };
};

const styles = StyleSheet.create({
  outerContainer: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: TAB_BAR_MINING_BUTTON_SIZE + rem(12),
    height: TAB_BAR_MINING_BUTTON_SIZE + rem(12),
    borderRadius: (TAB_BAR_MINING_BUTTON_SIZE + rem(12)) / 2,
  },
  innerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: TAB_BAR_MINING_BUTTON_SIZE,
    height: TAB_BAR_MINING_BUTTON_SIZE,
    borderRadius: TAB_BAR_MINING_BUTTON_SIZE / 2,
  },
  tapIconContainer: {
    position: 'absolute',
    right: -(TAB_BAR_MINING_BUTTON_SIZE / 2 + TAB_ICON_WIDTH / 4),
    bottom: -rem(12),
    ...mirrorTransform(),
  },
});
