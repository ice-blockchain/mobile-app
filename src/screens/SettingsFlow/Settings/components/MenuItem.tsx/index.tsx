// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {FONTS} from '@constants/fonts';
import {ArrowDownIcon} from '@svg/ArrowDownIcon';
import React, {ReactNode, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {SvgProps} from 'react-native-svg';
import {font, rem} from 'rn-units';

type Props = {
  title: string;
  description: string;
  renderIcon: (props: SvgProps) => ReactNode;
  hasConfirmation?: boolean;
  onPress: () => void;
};

export const MenuItem = ({
  renderIcon,
  title,
  description,
  hasConfirmation = false,
  onPress,
}: Props) => {
  const [expanded, setExpanded] = useState(false);
  console.log('%c expanded', 'background: #ff6347', expanded);
  return (
    <TouchableOpacity
      onPress={hasConfirmation ? () => setExpanded(e => !e) : onPress}>
      <View style={styles.container}>
        <View style={styles.iconWrapper}>
          {renderIcon({style: styles.icon})}
        </View>
        <View style={styles.body}>
          <Text style={styles.titleText} numberOfLines={1} adjustsFontSizeToFit>
            {title}
          </Text>
          <Text
            style={styles.descriptionText}
            numberOfLines={1}
            adjustsFontSizeToFit>
            {description}
          </Text>
        </View>
        <ArrowDownIcon
          fill={COLORS.persianBlue}
          width={rem(11)}
          height={rem(8)}
          style={styles.chevron}
        />
      </View>
    </TouchableOpacity>
  );
};

export const MenuItemSeparator = () => <View style={styles.separator} />;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: rem(21),
    marginRight: rem(25),
    marginVertical: rem(22),
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
    transform: [{rotate: '-90deg'}],
    marginLeft: rem(10),
  },
  separator: {
    height: 1,
    backgroundColor: COLORS.linkWater,
  },
});
