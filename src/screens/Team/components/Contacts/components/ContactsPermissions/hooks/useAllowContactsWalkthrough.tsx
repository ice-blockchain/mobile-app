// SPDX-License-Identifier: ice License 1.0

import {AllowContactsButton} from '@screens/Team/components/Contacts/components/ContactsPermissions/components/AllowContactsButton';
import {WalkthroughElementContainer} from '@screens/Walkthrough/components/WalkthroughElementContainer';
import {isPermissionGrantedSelector} from '@store/modules/Permissions/selectors';
import {WalkthroughActions} from '@store/modules/Walkthrough/actions';
import {useSetWalkthroughElementData} from '@store/modules/Walkthrough/hooks/useSetWalkthroughElementData';
import {useEffect, useRef} from 'react';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {rem} from 'rn-units';

const CONTAINER_PADDING = rem(20);

export const useAllowContactsWalkthrough = () => {
  const dispatch = useDispatch();

  const elementRef = useRef<View>(null);

  const {setWalkthroughElementData} = useSetWalkthroughElementData();

  const hasContactsPermissions = useSelector(
    isPermissionGrantedSelector('contacts'),
  );

  useEffect(() => {
    if (hasContactsPermissions) {
      dispatch(WalkthroughActions.RESTART_WALKTHROUGH.STATE.create());
    }
  }, [dispatch, hasContactsPermissions]);

  const onElementLayout = () => {
    setWalkthroughElementData({
      stepKey: 'allowContacts',
      elementData: {
        getRef: () => elementRef,
        getTop: measurements => measurements.pageY - CONTAINER_PADDING * 2,
        render: () => (
          <WalkthroughElementContainer
            outerStyle={styles.outerContainer}
            innerStyle={styles.innerContainer}>
            <AllowContactsButton />
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
  outerContainer: {
    alignSelf: 'center',
    padding: CONTAINER_PADDING,
  },
  innerContainer: {
    padding: CONTAINER_PADDING,
  },
});
