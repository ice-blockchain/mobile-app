// SPDX-License-Identifier: BUSL-1.1

import * as React from 'react';
import {Text, StyleSheet} from 'react-native';
import {font, rem, isAndroid} from 'rn-units';

import {COLORS} from '@constants/colors';
import {FONTS, WEIGHTS} from '@constants/fonts';
import LogoIconSvg from '@svg/logoIcon';
import {translate} from '@utils/i18n';

interface WelcomeItemDescriptionProps {
  items: Array<String | number>; // where 1 is icon with text 'ice'
}

const WelcomeItemDescription = ({items}: WelcomeItemDescriptionProps) => {
  return (
    <Text style={styles.textContainerWithIcon}>
      {items.map(item => {
        if (typeof item === 'string') {
          return <Text style={styles.text}>{item}</Text>;
        } else {
          return item === 1 ? (
            <Text style={styles.mediumText}>{`${translate(
              'global.project_name',
            )} `}</Text>
          ) : (
            <>
              <LogoIconSvg />
            </>
          );
        }
      })}
    </Text>
  );
};

export default WelcomeItemDescription;

const styles = StyleSheet.create({
  textContainerWithIcon: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    textAlign: 'center',
  },
  text: {
    lineHeight: rem(24),
    fontSize: font(14),
    textAlign: 'center',
    fontFamily: FONTS.primary.regular,
    color: COLORS.greyText,
  },
  mediumText: {
    fontWeight: WEIGHTS.medium,
    lineHeight: rem(24),
    fontFamily: isAndroid ? FONTS.primary.bold : FONTS.primary.regular,
    fontSize: font(14),
    color: COLORS.greyText,
  },
});
