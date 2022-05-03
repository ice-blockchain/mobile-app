// SPDX-License-Identifier: BUSL-1.1

import * as React from 'react';
import {Text, Image, StyleSheet} from 'react-native';
import {font, rem} from 'rn-units';

import {COLORS} from '@constants/colors';
import {FONTS, WEIGHTS} from '@constants/fonts';
import {Images} from '@images/index';
import {translate} from '@utils/i18n';

interface WelcomeItemDescriptionProps {
  items: Array<String | Array<String | number>>; // where 1 is icon with text 'ice'
}

const WelcomeItemDescription = ({items}: WelcomeItemDescriptionProps) => {
  return (
    <Text style={styles.textContainerWithIcon}>
      {items.map(item => {
        if (typeof item === 'string') {
          return item;
        } else {
          return item === 1 ? (
            <Text style={styles.mediumText}>
              {`${translate('global.project_name')} `}
            </Text>
          ) : (
            <Image source={Images.welcome.logoIcon} style={styles.icon} />
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
    lineHeight: rem(27),
    fontSize: font(14),
    textAlign: 'center',
    fontFamily: FONTS.primary.regular,
    color: COLORS.greyText,
    textAlignVertical: 'center',
  },
  mediumText: {
    fontWeight: WEIGHTS.medium,
    lineHeight: rem(23),
    fontFamily: FONTS.primary.regular,
    fontSize: font(14),
    color: COLORS.greyText,
  },
  icon: {width: rem(23), height: rem(23)},
});
