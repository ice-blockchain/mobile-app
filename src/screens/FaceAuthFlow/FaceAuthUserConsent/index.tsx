// SPDX-License-Identifier: ice License 1.0

import {CountrySelect} from '@screens/FaceAuthFlow/FaceAuthUserConsent/CountrySelect';
import {UserConsent} from '@screens/FaceAuthFlow/FaceAuthUserConsent/UserConsent';
import React, {useState} from 'react';

type Props = {
  updateKycStepPassed: () => void;
};

export function FaceAuthUserConsent({updateKycStepPassed}: Props) {
  const [consentPassed, setConsentPassed] = useState(false);

  if (consentPassed) {
    return <CountrySelect onContinue={updateKycStepPassed} />;
  }

  return (
    <UserConsent
      updateKycStepPassed={() => {
        setConsentPassed(true);
        // TODO: update BE
      }}
    />
  );
}
