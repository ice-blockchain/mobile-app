// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {FONTS} from '@constants/fonts';
import {SCREEN_SIDE_OFFSET} from '@constants/styles';
import {BackButton} from '@navigation/components/Header/components/BackButton';
import React, {ReactNode, useMemo} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {font, rem} from 'rn-units';

type Props = {
  color?: string;
  title?: string;
  hasBackButton?: boolean;
  titleOffset?: number;
  rightButtons?: ReactNode;
};

export const Header = ({
  title,
  rightButtons,
  color = COLORS.darkBlue,
  hasBackButton = true,
  titleOffset = rem(20),
}: Props) => {
  const {top: topInset} = useSafeAreaInsets();
  const dynamicStyle = useMemo(
    () =>
      StyleSheet.create({
        titleText: {
          color,
          marginHorizontal: titleOffset,
        },
      }),
    [color, titleOffset],
  );
  return (
    <View style={[styles.container, {marginTop: topInset}]}>
      <Text
        style={[styles.titleText, dynamicStyle.titleText]}
        numberOfLines={2}>
        {title}
      </Text>
      {hasBackButton && (
        <BackButton containerStyle={styles.backButton} color={color} />
      )}
      {Boolean(rightButtons) && (
        <View style={styles.rightButtons}>{rightButtons}</View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: SCREEN_SIDE_OFFSET,
    height: rem(54),
  },
  titleText: {
    fontFamily: FONTS.primary.black,
    fontSize: font(22),
    flex: 1,
    textAlign: 'center',
  },
  backButton: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
  },
  rightButtons: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
  },
});
