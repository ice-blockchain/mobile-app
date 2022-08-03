// SPDX-License-Identifier: BUSL-1.1

import {ConfirmPhoneNumber} from '@components/ConfirmPhoneNumber';
import {ModifyPhoneNumber} from '@components/ModifyPhoneNumber';
import {COLORS} from '@constants/colors';
import {ContactsList} from '@screens/Team/components/Contacts/components/ContactsList';
import {ContactsPermissions} from '@screens/Team/components/Contacts/components/ContactsPermissions';
import {AuthActions} from '@store/modules/Auth/actions';
import {isPhoneNumberVerifiedSelector} from '@store/modules/Auth/selectors';
import {PermissionsActions} from '@store/modules/Permissions/actions';
import {permissionSelector} from '@store/modules/Permissions/selectors';
import {isLoadingSelector} from '@store/modules/UtilityProcessStatuses/selectors';
import {ValidationActions} from '@store/modules/Validation/actions';
import {phoneVerificationStepSelector} from '@store/modules/Validation/selectors';
import {RootState} from '@store/rootReducer';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {ActivityIndicator, Animated, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

type TContactsFlow =
  | 'ContactsPermissions'
  | 'ModifyPhoneNumber'
  | 'ConfirmPhoneNumber'
  | 'ContactsList';

type ContactsProps = {
  showCountriesList: (t: boolean) => void;
  isCountriesVisible: boolean;
  focused: boolean;
};

export const Contacts = ({
  showCountriesList,
  isCountriesVisible,
  focused,
}: ContactsProps) => {
  const isLoading = useSelector(
    (state: RootState) =>
      isLoadingSelector(AuthActions.UPDATE_ACCOUNT, state) ||
      isLoadingSelector(ValidationActions.PHONE_VALIDATION, state),
  );

  const dispatch = useDispatch();

  const hasContactsPermissions = useSelector(permissionSelector('contacts'));
  const isPhoneNumberVerified = useSelector(isPhoneNumberVerifiedSelector);
  const phoneVerificationStep = useSelector(phoneVerificationStepSelector);

  const currentScreen = useMemo(() => {
    if (!hasContactsPermissions) {
      return 'ContactsPermissions';
    } else if (isPhoneNumberVerified) {
      return 'ContactsList';
    } else if (phoneVerificationStep === 'phone') {
      return 'ModifyPhoneNumber';
    } else {
      return 'ConfirmPhoneNumber';
    }
  }, [hasContactsPermissions, isPhoneNumberVerified, phoneVerificationStep]);

  const [visibleFlow, setVisibleFlow] = useState<TContactsFlow>(currentScreen);

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
    setScreen(currentScreen);
  }, [currentScreen, setScreen]);

  const onModifyPhonePress = (phone: string) => {
    dispatch(AuthActions.UPDATE_ACCOUNT.START.create({phoneNumber: phone}));
  };

  const onConfirmPhonePress = (code: string) => {
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
      {visibleFlow === 'ModifyPhoneNumber' && (
        <ModifyPhoneNumber
          showCountriesList={showCountriesList}
          isCountriesVisible={isCountriesVisible}
          onSubmitPress={onModifyPhonePress}
        />
      )}
      {visibleFlow === 'ConfirmPhoneNumber' && (
        <ConfirmPhoneNumber onSubmitPress={onConfirmPhonePress} />
      )}
      {visibleFlow === 'ContactsList' && <ContactsList focused={focused} />}

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
    backgroundColor: COLORS.black02opacity,
  },
});
