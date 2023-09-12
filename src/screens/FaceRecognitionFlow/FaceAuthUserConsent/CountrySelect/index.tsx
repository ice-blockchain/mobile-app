// SPDX-License-Identifier: ice License 1.0

import {User} from '@api/user/types';
import {CountrySelectFeed} from '@components/CountrySelectFeed';
import {COLORS} from '@constants/colors';
import {Country} from '@constants/countries';
import {commonStyles, windowWidth} from '@constants/styles';
import {PopUpButton} from '@screens/Modals/PopUp/components/PopUpButton';
import {AccountActions} from '@store/modules/Account/actions';
import {unsafeUserSelector} from '@store/modules/Account/selectors';
import {FaceAuthIcon} from '@svg/FaceAuthIcon';
import {t} from '@translations/i18n';
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {rem} from 'rn-units';

type Props = {
  onContinue: () => void;
};

export function CountrySelect({onContinue}: Props) {
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const user = useSelector(unsafeUserSelector);
  const dispatch = useDispatch();

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
            onContinue();
          }}
        />
      </View>
    </View>
  );
}

const FOOTER_PADDING_HORIZONTAL = rem(28);

const styles = StyleSheet.create({
  buttonsContainer: {
    paddingTop: rem(12),
    paddingBottom: rem(34),
    paddingHorizontal: rem(34),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    width: windowWidth / 2 - FOOTER_PADDING_HORIZONTAL - rem(16),
  },
  disabledButton: {
    width: windowWidth / 2 - FOOTER_PADDING_HORIZONTAL - rem(16),
    backgroundColor: COLORS.primaryDark,
    opacity: 0.5,
  },
});
