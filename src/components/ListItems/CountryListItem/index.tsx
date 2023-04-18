// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import {CountryFlagAbbreviation, flags} from '@flags';
import {TierTwoIcon} from '@svg/TierTwoIcon';
import {getCountryByCode} from '@utils/country';
import {formatNumber} from '@utils/numbers';
import {font} from '@utils/styles';
import React, {memo, ReactNode} from 'react';
import {
  Image,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import {rem} from 'rn-units';

type Props = {
  code: string;
  userCount?: number | null;
  AdditionalInfoComponent?: ReactNode;
  nameStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
};

const FLAG_WIDTH = rem(24);
const FLAG_HEIGHT = (FLAG_WIDTH / 20) * 14;

export const CountryListItem = memo(
  ({
    code,
    userCount,
    AdditionalInfoComponent,
    nameStyle,
    containerStyle,
  }: Props) => {
    const {current: country} = getCountryByCode(code);

    if (!country) {
      return null;
    }

    return (
      <View style={[styles.container, containerStyle]}>
        <Image
          style={styles.flag}
          source={
            flags[country.isoCode.toLowerCase() as CountryFlagAbbreviation]
          }
        />
        <Text style={[styles.nameText, nameStyle]} numberOfLines={1}>
          {country.name}
        </Text>
        {userCount ? (
          <View style={styles.users}>
            <TierTwoIcon
              color={COLORS.secondary}
              width={rem(22)}
              height={rem(22)}
            />
            <Text style={styles.usersText}> {formatNumber(userCount)}</Text>
          </View>
        ) : (
          AdditionalInfoComponent
        )}
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: rem(20),
    height: rem(30),
  },
  nameText: {
    flex: 1,
    marginLeft: rem(12),
    ...font(15, 20, 'semibold', 'primaryDark'),
  },
  flag: {
    width: FLAG_WIDTH,
    height: FLAG_HEIGHT,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: COLORS.black01opacity,
  },
  users: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  usersText: {
    ...font(12, 20, 'bold', 'secondary'),
  },
});
