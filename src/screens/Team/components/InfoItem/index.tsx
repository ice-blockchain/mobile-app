// SPDX-License-Identifier: BUSL-1.1

import {Text} from '@components/Text';
import {COLORS} from '@constants/colors';
import {FONTS} from '@constants/fonts';
import {TeamHeaderEarningsIcon} from '@screens/Team/assets/svg/TeamHeaderEarningsIcon';
import {TeamHeaderReferralsIcon} from '@screens/Team/assets/svg/TeamHeaderReferralsIcon';
import {t} from '@translations/i18n';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {font, rem, screenWidth} from 'rn-units';

export enum InfoItemType {
  'referrals',
  'earnings',
}

type InfoItemProps = {
  type: InfoItemType;
};

export function InfoItem({type}: InfoItemProps): React.ReactElement {
  const refsCount = 0; //TODO: get from selectors
  const earningsValue = 121985; //TODO: get from selectors

  const asset = () => {
    switch (type) {
      case InfoItemType.referrals:
        return <TeamHeaderReferralsIcon />;
      case InfoItemType.earnings:
        return <TeamHeaderEarningsIcon />;
    }
  };

  const title = () => {
    switch (type) {
      case InfoItemType.referrals:
        return 'team.header.referrals';
      case InfoItemType.earnings:
        return 'team.header.earnings';
    }
  };

  const value = () => {
    switch (type) {
      case InfoItemType.referrals:
        return <Text value={`${refsCount}`} style={styles.referrals} />;
      case InfoItemType.earnings:
        const earningsLocalized = `${earningsValue.toLocaleString()}${t(
          'team.header.earnings_token',
        )}`;
        return <Text value={earningsLocalized} style={styles.earnings} />;
    }
  };

  return (
    <View style={styles.container}>
      {asset()}
      <View style={styles.valuesContainer}>
        <Text text={title()} style={styles.title} />
        {value()}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: screenWidth / 2,
    flexDirection: 'row',
    marginVertical: rem(30),
  },
  valuesContainer: {
    flexDirection: 'column',
  },
  title: {
    fontFamily: FONTS.primary.medium,
    fontSize: font(14),
    color: COLORS.white,
    marginLeft: rem(8.5),
  },
  referrals: {
    color: COLORS.white,
    fontFamily: FONTS.primary.semibold,
    fontSize: font(22),
    marginLeft: rem(8.5),
  },
  earnings: {
    color: COLORS.white,
    fontFamily: FONTS.primary.medium,
    fontSize: font(14),
    marginLeft: rem(8.5),
    marginTop: rem(5),
  },
});
