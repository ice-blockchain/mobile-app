// SPDX-License-Identifier: ice License 1.0

import {ModifyPhoneNumberForm} from '@components/Forms/ModifyPhoneNumberForm';
import {useModifyPhoneNumberWalkthrough} from '@screens/Team/components/Contacts/components/ModifyPhoneNumber/hooks/useModifyPhoneNumberWalkthrough';
import {temporaryPhoneNumberSelector} from '@store/modules/Validation/selectors';
import {getCountryByPhoneNumber} from '@utils/phoneNumber';
import React from 'react';
import {useSelector} from 'react-redux';

export const ModifyPhoneNumber = () => {
  const temporaryPhoneNumber = useSelector(temporaryPhoneNumberSelector);

  const countryByPhoneNumber = getCountryByPhoneNumber(temporaryPhoneNumber);

  const {elementRef, onElementLayout} = useModifyPhoneNumberWalkthrough();

  return (
    <ModifyPhoneNumberForm
      initialPhoneNumber={countryByPhoneNumber?.nationalNumber}
      selectedCountry={countryByPhoneNumber?.country}
      phoneInputRef={elementRef}
      onPhoneInputLayout={onElementLayout}
    />
  );
};
