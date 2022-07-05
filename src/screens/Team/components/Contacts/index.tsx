// SPDX-License-Identifier: BUSL-1.1

import {DEFAULT_SUB_SCREEN_TOP_OFFSET} from '@constants/styles';
import {ConfirmCode} from '@screens/Team/components/ConfirmCode';
import {ConfirmPhone} from '@screens/Team/components/ConfirmPhone';
import {ContactsList} from '@screens/Team/components/ContactsList';
import {ContactsPermissions} from '@screens/Team/components/ContactsPermissions';
import {PermissionsActions} from '@store/modules/Permissions/actions';
import {TeamActions} from '@store/modules/Team/actions';
import {getContactsScreenStateSelector} from '@store/modules/Team/selectors';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {ActivityIndicator, Animated, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {screenHeight, screenWidth} from 'rn-units';

type TContactsFlow =
  | 'ContactsPermissions'
  | 'ConfirmPhone'
  | 'ConfirmCode'
  | 'ContactsList';

export const Contacts = () => {
  const [isLoading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const contactScreenState = useSelector(getContactsScreenStateSelector);

  const [visibleFlow, setVisibleFlow] =
    useState<TContactsFlow>(contactScreenState);

  const fadeAnimation = useRef(new Animated.Value(1)).current;

  const showNewFlow = useCallback(
    (newVisibleFlow: TContactsFlow) => {
      Animated.timing(fadeAnimation, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        setVisibleFlow(newVisibleFlow);
        Animated.timing(fadeAnimation, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }).start();
      });
    },
    [fadeAnimation],
  );

  useEffect(() => {
    if (contactScreenState !== visibleFlow) {
      showNewFlow(contactScreenState);
    }
  }, [showNewFlow, contactScreenState, visibleFlow]);

  const confirmPhonePress = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      dispatch(TeamActions.SET_PHONE_NUMBER_VERIFIED.STATE.create());
    }, 1500);
  };

  const confirmCodePress = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      dispatch(TeamActions.SET_CODE_VERIFIED.STATE.create());
    }, 1500);
  };

  const requestContactsAccessPermissionPress = async () => {
    dispatch(PermissionsActions.GET_CONTACTS_PERMISSIONS.START.create());
  };
  return (
    <Animated.View style={[styles.container, {opacity: fadeAnimation}]}>
      {visibleFlow === 'ContactsPermissions' && (
        <ContactsPermissions
          requestContactsAccessPermissionPress={
            requestContactsAccessPermissionPress
          }
        />
      )}
      {visibleFlow === 'ConfirmPhone' && (
        <ConfirmPhone confirmPhonePress={confirmPhonePress} />
      )}
      {visibleFlow === 'ConfirmCode' && (
        <ConfirmCode confirmCodePress={confirmCodePress} />
      )}
      {visibleFlow === 'ContactsList' && <ContactsList />}

      {isLoading ? (
        <ActivityIndicator
          style={[StyleSheet.absoluteFill, styles.loading]}
          size={'large'}
        />
      ) : null}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: screenWidth,
    height: screenHeight - DEFAULT_SUB_SCREEN_TOP_OFFSET,
  },
  loading: {
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
});
