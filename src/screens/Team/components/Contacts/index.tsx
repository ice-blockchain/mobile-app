// SPDX-License-Identifier: BUSL-1.1

import {ConfirmCode} from '@screens/Team/components/ConfirmCode';
import {ConfirmPhone} from '@screens/Team/components/ConfirmPhone';
import {ContactsList} from '@screens/Team/components/ContactsList';
import {ContactsPermissions} from '@screens/Team/components/ContactsPermissions';
import {AuthActions} from '@store/modules/Auth/actions';
import {
  isPhoneNumberVerifiedSelector,
  phoneVerificationStepSelector,
} from '@store/modules/Auth/selectors';
import {PermissionsActions} from '@store/modules/Permissions/actions';
import {permissionSelector} from '@store/modules/Permissions/selectors';
import {isLoadingSelector} from '@store/modules/UtilityProcessStatuses/selectors';
import {ValidationActions} from '@store/modules/Validation/actions';
import {RootState} from '@store/rootReducer';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {ActivityIndicator, Animated, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

type TContactsFlow =
  | 'ContactsPermissions'
  | 'ConfirmPhone'
  | 'ConfirmCode'
  | 'ContactsList';
type ContactsProps = {
  showCountriesList: (t: boolean) => void;
  isCountriesVisible: boolean;
};

export const Contacts = ({
  showCountriesList,
  isCountriesVisible,
}: ContactsProps) => {
  const isLoading = useSelector((state: RootState) =>
    isLoadingSelector(
      AuthActions.UPDATE_ACCOUNT || ValidationActions.PHONE_VALIDATION,
      state,
    ),
  );

  const dispatch = useDispatch();

  const hasContactsPermissions = useSelector(permissionSelector('contacts'));
  const isPhoneNumberVerified = useSelector(isPhoneNumberVerifiedSelector);
  const phoneVerificationStep = useSelector(phoneVerificationStepSelector);

  const getCurrentScreen = useCallback(() => {
    if (hasContactsPermissions) {
      if (isPhoneNumberVerified) {
        return 'ContactsList';
      } else {
        if (phoneVerificationStep === 'phone') {
          return 'ConfirmPhone';
        } else {
          return 'ConfirmCode';
        }
      }
    } else {
      return 'ContactsPermissions';
    }
  }, [hasContactsPermissions, isPhoneNumberVerified, phoneVerificationStep]);

  const [visibleFlow, setVisibleFlow] = useState<TContactsFlow>(
    getCurrentScreen(),
  );

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

  const setScreen = useCallback(
    (screen: TContactsFlow) => {
      if (screen !== visibleFlow) {
        showNewFlow(screen);
      }
    },
    [showNewFlow, visibleFlow],
  );

  useEffect(() => {
    setScreen(getCurrentScreen());
  }, [getCurrentScreen, setScreen]);

  const confirmPhonePress = (phone: string) => {
    dispatch(AuthActions.UPDATE_ACCOUNT.START.create({phoneNumber: phone}));
  };

  const confirmCodePress = (code: string) => {
    dispatch(ValidationActions.PHONE_VALIDATION.START.create(code));
  };

  const requestContactsAccessPermissionPress = async () => {
    dispatch(PermissionsActions.GET_PERMISSIONS.START.create('contacts'));
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
        <ConfirmPhone
          showCountriesList={showCountriesList}
          isCountriesVisible={isCountriesVisible}
          confirmPhonePress={confirmPhonePress}
        />
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
