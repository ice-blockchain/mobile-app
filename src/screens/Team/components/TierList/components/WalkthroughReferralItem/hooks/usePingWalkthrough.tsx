// SPDX-License-Identifier: ice License 1.0

import {UserListPingButton} from '@components/ListItems/UserListItem/components/UserListPingButton';
import {WalkthroughElementContainer} from '@screens/Walkthrough/components/WalkthroughElementContainer';
import {useSetWalkthroughElementData} from '@store/modules/Walkthrough/hooks/useSetWalkthroughElementData';
import {useRef} from 'react';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {rem} from 'rn-units';

const CONTAINER_PADDING = rem(20);

export const usePingWalkthrough = ({userId}: {userId: string}) => {
  const elementRef = useRef<View>(null);

  const {setWalkthroughElementData} = useSetWalkthroughElementData();

  const onElementLayout = () => {
    setWalkthroughElementData({
      stepKey: 'ping',
      elementData: {
        getRef: () => elementRef,
        getTop: measurements => {
          return measurements.pageY - CONTAINER_PADDING * 2;
        },
        render: ({measurements}) => {
          const left = measurements.pageX - CONTAINER_PADDING * 2;
          return (
            <WalkthroughElementContainer
              outerStyle={[styles.outerContainer, {left}]}
              innerStyle={styles.innerContainer}>
              <UserListPingButton userId={userId} />
            </WalkthroughElementContainer>
          );
        },
      },
    });
  };

  return {
    elementRef,
    onElementLayout,
  };
};

const styles = StyleSheet.create({
  outerContainer: {
    alignSelf: 'flex-start',
    padding: CONTAINER_PADDING,
    justifyContent: 'center',
  },
  innerContainer: {
    padding: CONTAINER_PADDING,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
