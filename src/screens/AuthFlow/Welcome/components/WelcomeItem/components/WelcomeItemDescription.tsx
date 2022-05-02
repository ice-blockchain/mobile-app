// SPDX-License-Identifier: BUSL-1.1

import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {font, rem} from 'rn-units';

import {COLORS} from '@constants/colors';
import {FONTS, WEIGHTS} from '@constants/fonts';
import LogoIconSvg from '@svg/logoIcon';
import {translate} from '@utils/i18n';

interface WelcomeItemDescriptionProps {
  items: Array<String | Array<String | number>>; // where 1 is icon with text 'ice'
}

const WelcomeItemDescription = ({items}: WelcomeItemDescriptionProps) => {
  return (
    <>
      {items.map((item, i) =>
        Array.isArray(item) ? (
          <View style={styles.textContainerWithIcon} key={`${i}-line`}>
            {item.map((v, j) =>
              typeof v === 'string' ? (
                <Text style={styles.text} key={`${j}-icon`}>
                  {v}
                </Text>
              ) : (
                <View style={styles.icon} key={`${j}-icon`}>
                  <LogoIconSvg />
                  {v === 1 ? (
                    <Text style={styles.mediumText}>
                      {translate('global.project_name')}
                    </Text>
                  ) : null}
                </View>
              ),
            )}
          </View>
        ) : (
          <Text style={styles.text} key={`${i}-line`}>
            {item}
          </Text>
        ),
      )}
    </>
  );
};

export default WelcomeItemDescription;

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    lineHeight: rem(24),
    fontFamily: FONTS.primary.regular,
    fontSize: font(14),
    color: COLORS.greyText,
  },
  textContainerWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mediumText: {
    fontWeight: WEIGHTS.medium,
    textAlign: 'center',
    lineHeight: rem(24),
    fontFamily: FONTS.primary.regular,
    fontSize: font(14),
    color: COLORS.greyText,
  },
  icon: {
    flexDirection: 'row',
  },
});
