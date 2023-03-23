// SPDX-License-Identifier: ice License 1.0

import {font} from '@utils/styles';
import React, {ReactNode} from 'react';
import {Image, ImageSourcePropType, StyleSheet, Text, View} from 'react-native';
import Animated, {useAnimatedStyle, withTiming} from 'react-native-reanimated';
import {rem} from 'rn-units';

type Props = {
  backgroundImageSource: ImageSourcePropType;
  headerTitle?: string;
  headerTitleIcon?: ReactNode;
  headerValue?: string;
  headerValueIcon?: ReactNode;
  isCollapsed?: boolean;
  children: ReactNode;
};

export const CARDS_TOTAL_HEIGHT = rem(140);
export const CARDS_COLLAPSED_HEIGHT = rem(42);
export const CARD_WIDTH = rem(274);

export const CardBase = ({
  backgroundImageSource,
  headerTitle,
  headerTitleIcon,
  headerValue,
  headerValueIcon,
  isCollapsed = false,
  children,
}: Props) => {
  const animatedChildrenContainerStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(isCollapsed ? 0 : 1, {
        duration: 200,
      }),
    };
  }, [isCollapsed]);

  return (
    <View style={styles.container}>
      <Image
        source={backgroundImageSource}
        resizeMode={'cover'}
        style={styles.backgroundImage}
      />
      <View style={styles.header}>
        <View style={styles.title}>
          {headerTitleIcon}
          <Text style={styles.titleText}>{headerTitle}</Text>
        </View>
        {headerValueIcon}
        <Text style={styles.valueText}>{headerValue}</Text>
      </View>
      <Animated.View style={[styles.body, animatedChildrenContainerStyle]}>
        {children}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: CARD_WIDTH,
    marginRight: rem(16),
    borderRadius: rem(20),
    paddingHorizontal: rem(15),
    overflow: 'hidden',
    flexGrow: 1,
  },
  backgroundImage: {
    position: 'absolute',
    width: CARD_WIDTH,
    height: CARDS_TOTAL_HEIGHT,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    height: CARDS_COLLAPSED_HEIGHT,
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  titleText: {
    textTransform: 'uppercase',
    marginLeft: rem(4),
    ...font(12, 15, 'black'),
  },
  valueText: {
    textTransform: 'uppercase',
    marginLeft: rem(4),
    ...font(12, 15, 'black'),
  },
  body: {
    flexGrow: 1,
    flexShrink: 0,
  },
});
