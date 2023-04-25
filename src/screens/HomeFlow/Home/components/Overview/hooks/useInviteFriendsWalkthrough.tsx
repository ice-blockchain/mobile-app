// SPDX-License-Identifier: ice License 1.0

import {InviteButton} from '@components/Buttons/InviteButton';
import {SCREEN_SIDE_OFFSET, windowWidth} from '@constants/styles';
import {WalkthroughElementContainer} from '@screens/Walkthrough/components/WalkthroughElementContainer';
import {useSetWalkthroughElementData} from '@store/modules/Walkthrough/hooks/useSetWalkthroughElementData';
import React, {useRef} from 'react';
import {StyleSheet, View} from 'react-native';

const CONTAINER_PADDING = SCREEN_SIDE_OFFSET / 2;

export const useInviteFriendsWalkthrough = () => {
  const inviteFriendsRef = useRef<View>(null);

  const {setWalkthroughElementData} = useSetWalkthroughElementData();

  const onInviteFriendsLayout = () => {
    setWalkthroughElementData({
      stepKey: 'inviteFriends',
      elementData: {
        getRef: () => inviteFriendsRef,
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
    onInviteFriendsLayout,
    inviteFriendsRef,
  };
};

const styles = StyleSheet.create({
  inviteButtonStyle: {
    marginHorizontal: 0,
    width: windowWidth - SCREEN_SIDE_OFFSET * 2,
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
