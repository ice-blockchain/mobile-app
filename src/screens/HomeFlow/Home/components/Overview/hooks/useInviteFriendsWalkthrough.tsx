// SPDX-License-Identifier: ice License 1.0

import {InviteButton} from '@components/InviteButton';
import {SCREEN_SIDE_OFFSET} from '@constants/styles';
import {WalkthroughElementContainer} from '@screens/Walkthrough/components/WalkthroughElementContainer';
import {useSetWalkthroughElementData} from '@store/modules/Walkthrough/hooks/useSetWalkthroughElementData';
import React, {useRef} from 'react';
import {StyleSheet, View} from 'react-native';
import {screenWidth} from 'rn-units';

const CONTAINER_PADDING = SCREEN_SIDE_OFFSET / 2;

export const useInviteFriendsWalkthrough = () => {
  const elementRef = useRef<View>(null);

  const {setWalkthroughElementData} = useSetWalkthroughElementData();

  const onElementLayout = () => {
    setWalkthroughElementData({
      stepKey: 'inviteFriends',
      elementData: {
        getRef: () => elementRef,
        getTop: measurements => measurements.pageY - CONTAINER_PADDING * 2,
        render: () => (
          <WalkthroughElementContainer
            innerStyle={styles.innerContainer}
            outerStyle={styles.outerContainer}>
            <InviteButton style={styles.inviteButtonStyle} />
          </WalkthroughElementContainer>
        ),
      },
    });
  };

  return {
    onElementLayout,
    elementRef,
  };
};

const styles = StyleSheet.create({
  inviteButtonStyle: {
    marginHorizontal: 0,
    width: screenWidth - SCREEN_SIDE_OFFSET * 2,
  },
  outerContainer: {
    alignSelf: 'center',
    padding: CONTAINER_PADDING,
  },
  innerContainer: {
    width: '100%',
    padding: CONTAINER_PADDING,
  },
});
