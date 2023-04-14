// SPDX-License-Identifier: ice License 1.0

import {Touchable} from '@components/Touchable';
import {COLORS} from '@constants/colors';
import {ChevronIcon} from '@svg/ChevronIcon';
import {font, mirrorTransform} from '@utils/styles';
import React, {ReactNode, useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {SvgProps} from 'react-native-svg';
import {rem} from 'rn-units';

type Props = {
  title: string;
  description: string | ReactNode;
  renderIcon: (props: SvgProps) => ReactNode;
  onPress: () => void;
  confirmation?: {
    title: string;
    yesText: string;
    noText: string;
  };
};

const CONFIRM_HEIGHT = rem(60);

export const MenuItem = ({
  renderIcon,
  title,
  description,
  confirmation,
  onPress,
}: Props) => {
  const [expanded, setExpanded] = useState(false);
  const animatedHeight = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => ({
    height: animatedHeight.value,
  }));

  useEffect(() => {
    animatedHeight.value = withTiming(expanded ? CONFIRM_HEIGHT : 0);
  }, [animatedHeight, expanded]);

  return (
    <>
      <Touchable onPress={confirmation ? () => setExpanded(e => !e) : onPress}>
        <View style={styles.container}>
          <View style={styles.iconWrapper}>
            {renderIcon({style: styles.icon})}
          </View>
          <View style={styles.body}>
            <Text
              style={styles.titleText}
              numberOfLines={1}
              adjustsFontSizeToFit>
              {title}
            </Text>
            <Text style={styles.descriptionText} numberOfLines={2}>
              {expanded ? confirmation?.title : description}
            </Text>
          </View>
          <ChevronIcon
            color={COLORS.primaryDark}
            width={rem(9)}
            height={rem(16)}
            style={[
              styles.chevron,
              expanded ? styles.chevron_left : styles.chevron_right,
            ]}
          />
        </View>
      </Touchable>
      {!!confirmation && (
        <Animated.View style={[styles.buttons, animatedStyle]}>
          <Touchable
            onPress={() => {
              setExpanded(false);
              onPress();
            }}
            style={[styles.button, styles.yesButton]}>
            <Text style={styles.yesText}>{confirmation.yesText}</Text>
          </Touchable>
          <Touchable
            onPress={() => setExpanded(false)}
            style={[styles.button, styles.noButton]}>
            <Text style={styles.noText}>{confirmation.noText}</Text>
          </Touchable>
        </Animated.View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: rem(21),
    marginRight: rem(25),
    marginVertical: rem(10),
    height: rem(44), // fixed height to remove content jumping when the text length changes on expand / collapse
  },
  body: {
    flex: 1,
    marginLeft: rem(12),
  },
  iconWrapper: {
    width: rem(44),
    height: rem(44),
    borderRadius: rem(12),
    backgroundColor: COLORS.secondaryFaint,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: rem(24),
    height: rem(24),
  },
  titleText: {
    ...font(16, 19.2, 'black', 'primaryDark'),
    marginBottom: rem(4),
    textAlign: 'left',
  },
  descriptionText: {
    ...font(12, 14.4, 'medium', 'secondary'),
    textAlign: 'left',
  },
  chevron: {
    marginLeft: rem(10),
  },
  chevron_left: {
    ...mirrorTransform(true),
  },
  chevron_right: {
    ...mirrorTransform(),
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    height: CONFIRM_HEIGHT,
    overflow: 'hidden',
  },
  button: {
    width: rem(96),
    height: rem(34),
    marginHorizontal: rem(6),
    alignItems: 'center',
    justifyContent: 'center',
  },
  yesButton: {
    borderWidth: 1,
    borderColor: COLORS.attentionDark,
    borderRadius: rem(11),
  },
  yesText: {
    ...font(12, null, 'black', 'attentionDark'),
  },
  noButton: {
    borderRadius: rem(11),
    backgroundColor: COLORS.primary,
  },
  noText: {
    ...font(12, null, 'black'),
  },
});
