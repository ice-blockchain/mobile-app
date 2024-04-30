// SPDX-License-Identifier: ice License 1.0

import {User} from '@api/user/types';
import {PopUpButton} from '@components/Buttons/PopUpButton';
import {COLORS} from '@constants/colors';
import {Country} from '@constants/countries';
import {commonStyles} from '@constants/styles';
import {
  BUTTON_WIDTH,
  FOOTER_PADDING_HORIZONTAL,
} from '@screens/FaceRecognitionFlow/FaceAuthUserConsent/constants';
import {CountrySelectFeed} from '@screens/Templates/CountrySelectFeed';
import {AccountActions} from '@store/modules/Account/actions';
import {unsafeUserSelector} from '@store/modules/Account/selectors';
import {
  isFailedSelector,
  isSuccessSelector,
} from '@store/modules/UtilityProcessStatuses/selectors';
import {FaceAuthIcon} from '@svg/FaceAuthIcon';
import {t} from '@translations/i18n';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {rem} from 'rn-units';

type Props = {
  onStepComplete: () => void;
};

export function CountrySelect({onStepComplete}: Props) {
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const user = useSelector(unsafeUserSelector);
  const [isUpdateSent, setIsUpdateSent] = useState(false);
  const dispatch = useDispatch();

  const isSuccessUpdate = useSelector(
    isSuccessSelector.bind(null, AccountActions.UPDATE_ACCOUNT),
  );
  const isFailureUpdate = useSelector(
    isFailedSelector.bind(null, AccountActions.UPDATE_ACCOUNT),
  );

  useEffect(() => {
    if (isUpdateSent) {
      if (isSuccessUpdate) {
        onStepComplete();
      }
      if (isFailureUpdate) {
        setIsUpdateSent(false);
      }
    }
  }, [isFailureUpdate, isSuccessUpdate, isUpdateSent, onStepComplete]);

  return (
    <View style={commonStyles.flexOne}>
      <CountrySelectFeed
        dontShowPhoneCodes
        onSelect={(country: Country) => {
          setSelectedCountry(country);
        }}
      />
      <View style={styles.buttonsContainer}>
        <PopUpButton
          text={t('button.cancel')}
          preset={'outlined'}
          style={styles.button}
          onPress={() => setSelectedCountry(null)}
        />
        <PopUpButton
          text={t('button.continue')}
          disabled={!selectedCountry}
          icon={<FaceAuthIcon />}
          style={[selectedCountry ? styles.button : styles.disabledButton]}
          onPress={() => {
            if (selectedCountry) {
              const userInfo: Partial<User> = {
                country: selectedCountry.isoCode,
                city: user.country === selectedCountry.isoCode ? user.city : '',
              };
              dispatch(AccountActions.UPDATE_ACCOUNT.START.create(userInfo));
            }
            setIsUpdateSent(true);
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonsContainer: {
    paddingTop: rem(12),
    paddingBottom: rem(34),
    paddingHorizontal: FOOTER_PADDING_HORIZONTAL,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    width: BUTTON_WIDTH,
  },
  disabledButton: {
    width: BUTTON_WIDTH,
    backgroundColor: COLORS.primaryDark,
    opacity: 0.5,
  },
});
