// SPDX-License-Identifier: ice License 1.0

import {CommonInput, CommonInputProps} from '@components/Inputs/CommonInput';
import {CountryButton} from '@components/Inputs/PhoneNumberInput/components/CountryButton';
import {Country} from '@constants/countries';
import {AuthStackParamList} from '@navigation/Auth';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {deviceLocationSelector} from '@store/modules/Devices/selectors';
import {t} from '@translations/i18n';
import {getCountryByCode} from '@utils/country';
import {formatPhoneNumber} from '@utils/phoneNumber';
import {font} from '@utils/styles';
import React, {useState} from 'react';
import {StyleSheet, Text} from 'react-native';
import {useSelector} from 'react-redux';
import {rem} from 'rn-units';

export const PhoneNumberInput = ({
  value,
  selectedCountry,
  onChangePhone,
  ...props
}: Omit<CommonInputProps, 'label' | 'onChangeText'> & {
  selectedCountry?: Country | null;
  onChangePhone: (phoneBody: string, iddCode: string) => void;
}) => {
  const deviceLocation = useSelector(deviceLocationSelector);
  const deviceCountry = getCountryByCode(deviceLocation?.country);
  const [country, setCountry] = useState(
    selectedCountry ?? deviceCountry.current ?? deviceCountry.default,
  );
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
  const [prefix, setPrefix] = useState(value ? country.iddCode : '');
  const onCountrySelect = () => {
    navigation.navigate('CountrySelect', {
      onSelect: c => {
        setCountry(c);
        if (prefix) {
          setPrefix(c.iddCode);
        }
      },
    });
  };
  return (
    <CommonInput
      value={formatPhoneNumber(
        `${country.iddCode}${value}`,
        country.isoCode,
        country.iddCode,
      )}
      label={t('global.phone_number')}
      prefix={!!prefix && <Text style={styles.prefixText}>{prefix}</Text>}
      icon={<CountryButton flag={country.flag} onPress={onCountrySelect} />}
      keyboardType={'phone-pad'}
      textContentType={'telephoneNumber'}
      autoComplete={'tel'}
      autoCapitalize={'none'}
      autoCorrect={true}
      containerStyle={styles.inputContainer}
      onFocus={() => {
        setPrefix(country.iddCode);
      }}
      onBlur={() => {
        if (!value) {
          setPrefix('');
        }
      }}
      onChangeText={(text: string) => {
        onChangePhone(text, country.iddCode);
      }}
      style={styles.valueText}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    paddingLeft: 0,
  },
  prefixText: {
    ...font(16, 18, 'medium', 'secondary'),
    marginRight: rem(4),
  },
  valueText: {
    alignItems: 'center',
    ...font(16, 19, 'medium', 'codeFieldText'),
  },
});
