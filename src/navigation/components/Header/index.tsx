// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {FONTS} from '@constants/fonts';
import {SCREEN_SIDE_OFFSET} from '@constants/styles';
import {BackButton} from '@navigation/components/Header/components/BackButton';
import React, {memo, ReactNode, useMemo} from 'react';
import {StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native';
import Animated from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {font, rem} from 'rn-units';

type Props = {
  color?: string;
  backgroundColor?: string;
  title?: string;
  hasBackButton?: boolean;
  titleOffset?: number;
  renderRightButtons?: () => ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
};

export const Header = memo(
  ({
    title,
    renderRightButtons,
    color = COLORS.darkBlue,
    backgroundColor = COLORS.persianBlue,
    hasBackButton = true,
    titleOffset = rem(20),
    containerStyle,
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
      <Animated.View
        style={[{paddingTop: topInset, backgroundColor}, containerStyle]}>
        <View style={[styles.body]}>
          <Text
            style={[styles.titleText, dynamicStyle.titleText]}
            numberOfLines={2}>
            {title}
          </Text>
          {hasBackButton && (
            <BackButton containerStyle={styles.backButton} color={color} />
          )}
          {Boolean(renderRightButtons) && (
            <View style={styles.rightButtons}>{renderRightButtons?.()}</View>
          )}
        </View>
      </Animated.View>
    );
  },
);

const styles = StyleSheet.create({
  body: {
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
