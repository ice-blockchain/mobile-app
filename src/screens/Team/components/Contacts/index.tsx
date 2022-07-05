// SPDX-License-Identifier: BUSL-1.1

import {ConfirmCode} from '@screens/Team/components/ConfirmCode';
import {ConfirmPhone} from '@screens/Team/components/ConfirmPhone';
import ContactsList from '@screens/Team/components/ContactsList';
import {ContactsPermissions} from '@screens/Team/components/ContactsPermissions';
import {
  hasContactsAccessPermission,
  requestContactsAccessPermission,
} from '@services/contacts';
import {TeamActions} from '@store/modules/Team/actions';
import {selectorIsPhoneNumberVerified} from '@store/modules/Team/selectors';
import React, {useEffect, useRef, useState} from 'react';
import {ActivityIndicator, Animated, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

type TContactsFlow =
  | 'ContactsPermissions'
  | 'ConfirmPhone'
  | 'ConfirmCode'
  | 'ContactsList';

export const Contacts = () => {
  const [isLoading, setLoading] = useState(false);
  const [visibleFlow, setVisibleFlow] = useState<TContactsFlow>(
    'ContactsPermissions',
  );
  const dispatch = useDispatch();
  const isPhoneNumberVerified = useSelector(selectorIsPhoneNumberVerified);

  const fadeAnimation = useRef(new Animated.Value(1)).current;

  const showNewFlow = (newVisibleFlow: TContactsFlow) => {
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
  };

  useEffect(() => {
    if (isPhoneNumberVerified) {
      setVisibleFlow('ContactsList');
    } else {
      hasContactsAccessPermission()
        .then(granted => {
          if (granted) {
            setVisibleFlow('ConfirmPhone');
          }
        })
        .catch(() => {});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const confirmPhonePress = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      showNewFlow('ConfirmCode');
    }, 1500);
  };

  const confirmCodePress = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      dispatch(TeamActions.SET_PHONE_NUMBER_VERIFIED.STATE.create());
      showNewFlow('ContactsList');
    }, 1500);
  };

  const requestContactsAccessPermissionPress = async () => {
    const granted = await requestContactsAccessPermission();
    if (granted) {
      showNewFlow('ConfirmPhone');
    }
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
    flex: 1,
  },
  loading: {
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
});
