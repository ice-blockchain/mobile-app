// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import {SCREEN_SIDE_OFFSET} from '@constants/styles';
import {useSafeAreaInsets} from '@hooks/useSafeAreaInsets';
import {BackButton} from '@navigation/components/Header/components/BackButton';
import {font, mirrorTransform} from '@utils/styles';
import React, {memo, ReactNode, useMemo} from 'react';
import {StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native';
import Animated from 'react-native-reanimated';
import {rem} from 'rn-units';

type Props = {
  color?: string;
  backgroundColor?: string;
  title?: string;
  backLabel?: string;
  titleOffset?: number;
  renderRightButtons?: () => ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  topMargin?: number;
  showBackButton?: boolean;
  onGoBack?: () => void;
  preventDefaultAction?: boolean;
  children?: ReactNode;
};

export const HEADER_HEIGHT = rem(56);

/**
 * Using absolute positioned View to make "elevation" display properly
 * And add static View with the same height to add offset for the rest of content
 */
export const Header = memo(
  ({
    title,
    backLabel,
    renderRightButtons,
    color = COLORS.primaryDark,
    backgroundColor = COLORS.white,
    titleOffset = rem(20),
    containerStyle,
    topMargin,
    showBackButton = true,
    onGoBack,
    preventDefaultAction,
    children,
  }: Props) => {
    const {top: topNotchHeight} = useSafeAreaInsets();
    const topInset = topMargin ?? topNotchHeight;
    const dynamicStyle = useMemo(
      () =>
        StyleSheet.create({
          titleText: {
            color,
            marginHorizontal: titleOffset,
          },
          container: {
            paddingTop: topInset,
            backgroundColor,
          },
          offset: {height: HEADER_HEIGHT + topInset},
        }),
      [color, titleOffset, topInset, backgroundColor],
    );

    return (
      <>
        <View style={dynamicStyle.offset} />
        <Animated.View
          style={[dynamicStyle.container, styles.container, containerStyle]}>
          <View style={styles.body}>
            <Text
              style={[styles.titleText, dynamicStyle.titleText]}
              numberOfLines={2}>
              {title}
            </Text>
            {showBackButton && (
              <BackButton
                containerStyle={styles.backButton}
                color={color}
                label={backLabel}
                onGoBack={onGoBack}
                preventDefaultAction={preventDefaultAction}
              />
            )}
            {!!renderRightButtons && (
              <View style={styles.rightButtons}>{renderRightButtons()}</View>
            )}
          </View>
          {children}
        </Animated.View>
      </>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    zIndex: 1,
  },
  body: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: SCREEN_SIDE_OFFSET,
    height: HEADER_HEIGHT,
  },
  titleText: {
    flex: 1,
    ...font(17, 22, 'semibold', 'white', 'center'),
  },
  backButton: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    ...mirrorTransform(),
  },
  rightButtons: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
  },
});
