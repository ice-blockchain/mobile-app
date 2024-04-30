// SPDX-License-Identifier: ice License 1.0

import {BottomSheetScrollView} from '@components/BottomSheet';
import {isLinkPhoneNumberEnabled} from '@constants/featureFlags';
import {ConfirmPhoneNumber} from '@screens/Team/components/Contacts/components/ConfirmPhoneNumber';
import {ContactsList} from '@screens/Team/components/Contacts/components/ContactsList';
import {ContactsPermissions} from '@screens/Team/components/Contacts/components/ContactsPermissions';
import {ModifyPhoneNumber} from '@screens/Team/components/Contacts/components/ModifyPhoneNumber';
import {VerticalOffset} from '@screens/Team/components/Contacts/components/VerticalOffset';
import {useScreenFade} from '@screens/Team/components/Contacts/hooks/useScreenFade';
import {isPhoneNumberVerifiedSelector} from '@store/modules/Account/selectors';
import {isPermissionGrantedSelector} from '@store/modules/Permissions/selectors';
import {phoneVerificationStepSelector} from '@store/modules/Validation/selectors';
import React, {useMemo} from 'react';
import {Animated, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';

type ContactsProps = {
  focused: boolean;
  addCollapsedSnapPointListener: (key: string, listener: () => void) => void;
};

export const Contacts = ({
  focused,
  addCollapsedSnapPointListener,
}: ContactsProps) => {
  const hasContactsPermissions = useSelector(
    isPermissionGrantedSelector('contacts'),
  );

  const isPhoneNumberVerified = useSelector(isPhoneNumberVerifiedSelector);
  const temporaryPhoneVerificationStep = useSelector(
    phoneVerificationStepSelector,
  );

  const currentScreen = useMemo(() => {
    if (!hasContactsPermissions) {
      return 'ContactsPermissions';
    } else if (isLinkPhoneNumberEnabled && !isPhoneNumberVerified) {
      if (temporaryPhoneVerificationStep === 'phone') {
        return 'ModifyPhoneNumber';
      } else {
        return 'ConfirmPhoneNumber';
      }
    } else {
      return 'ContactsList';
    }
  }, [
    hasContactsPermissions,
    isPhoneNumberVerified,
    temporaryPhoneVerificationStep,
  ]);

  const {fadeStyle, visibleScreen} = useScreenFade(currentScreen);

  if (visibleScreen === 'ContactsList') {
    return (
      <ContactsList
        focused={focused}
        addCollapsedSnapPointListener={addCollapsedSnapPointListener}
      />
    );
  }

  return (
    <BottomSheetScrollView>
      <Animated.View style={[styles.container, fadeStyle]}>
        {visibleScreen === 'ContactsPermissions' && <ContactsPermissions />}
        {visibleScreen === 'ModifyPhoneNumber' && (
          <VerticalOffset>
            <ModifyPhoneNumber />
          </VerticalOffset>
        )}
        {visibleScreen === 'ConfirmPhoneNumber' && (
          <VerticalOffset>
            <ConfirmPhoneNumber />
          </VerticalOffset>
        )}
      </Animated.View>
    </BottomSheetScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
