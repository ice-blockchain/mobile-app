// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {FONTS} from '@constants/fonts';
import {ArrowDownIcon} from '@svg/ArrowDownIcon';
import React, {ReactNode, useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {SvgProps} from 'react-native-svg';
import {font, rem} from 'rn-units';

type Props = {
  title: string;
  description: string;
  renderIcon: (props: SvgProps) => ReactNode;
  onPress: () => void;
  confirmation?: {
    title: string;
    yesText: string;
    noText: string;
  };
};

const CONFIRM_HEGIHT = rem(60);

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
    animatedHeight.value = withTiming(expanded ? CONFIRM_HEGIHT : 0);
  }, [animatedHeight, expanded]);

  return (
    <>
      <TouchableOpacity
        onPress={confirmation ? () => setExpanded(e => !e) : onPress}>
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
            <Text
              style={styles.descriptionText}
              numberOfLines={2}
              adjustsFontSizeToFit>
              {expanded ? confirmation?.title : description}
            </Text>
          </View>
          <ArrowDownIcon
            fill={COLORS.persianBlue}
            width={rem(11)}
            height={rem(8)}
            style={[
              styles.chevron,
              expanded ? styles.chevron_left : styles.chevron_right,
            ]}
          />
        </View>
      </TouchableOpacity>
      {!!confirmation && (
        <Animated.View style={[styles.buttons, animatedStyle]}>
          <TouchableOpacity
            onPress={() => {
              setExpanded(false);
              onPress();
            }}
            style={[styles.button, styles.yesButton]}>
            <Text style={styles.yesText}>{confirmation.yesText}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setExpanded(false)}
            style={[styles.button, styles.noButton]}>
            <Text style={styles.noText}>{confirmation.noText}</Text>
          </TouchableOpacity>
        </Animated.View>
      )}
    </>
  );
};

export const MenuItemSeparator = () => <View style={styles.separator} />;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: rem(21),
    marginRight: rem(25),
    height: rem(74), // fixed height to remove content jumping when the text length changes on expand / collapse
  },
  body: {
    flex: 1,
    marginLeft: rem(9),
  },
  iconWrapper: {
    width: rem(36),
    height: rem(36),
    borderRadius: rem(12),
    backgroundColor: COLORS.linkWater,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {},
  titleText: {
    fontFamily: FONTS.primary.black,
    fontSize: font(14),
    lineHeight: font(17),
    color: COLORS.darkBlue,
  },
  descriptionText: {
    fontFamily: FONTS.primary.regular,
    fontSize: font(12),
    lineHeight: font(15),
    color: COLORS.greyText,
  },
  chevron: {
    marginLeft: rem(10),
  },
  chevron_left: {
    transform: [{rotate: '90deg'}],
  },
  chevron_right: {
    transform: [{rotate: '-90deg'}],
  },
  separator: {
    height: 1,
    backgroundColor: COLORS.linkWater,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    height: CONFIRM_HEGIHT,
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
    borderColor: COLORS.pomegranate,
    borderRadius: rem(11),
  },
  yesText: {
    fontSize: font(12),
    color: COLORS.pomegranate,
    fontFamily: FONTS.primary.black,
  },
  noButton: {
    borderRadius: rem(11),
    backgroundColor: COLORS.primary,
  },
  noText: {
    fontSize: font(12),
    color: COLORS.white,
    fontFamily: FONTS.primary.black,
  },
});
