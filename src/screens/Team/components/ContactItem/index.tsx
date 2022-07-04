// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {FONTS} from '@constants/fonts';
import {IFormattedContact} from '@store/modules/Team/sagas/getContactsSaga';
import React, {ReactNode, useState} from 'react';
import {
  LayoutAnimation,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {font, rem} from 'rn-units';

export const ContactItem = ({
  index,
  item,
  backgroundColor,
  rightSideButton,
  leftIconContent,
  indicatorContent,
}: {
  index: number;
  item: IFormattedContact;
  backgroundColor: string;
  rightSideButton?: ReactNode;
  leftIconContent?: ReactNode;
  indicatorContent?: ReactNode;
}) => {
  const [activeIndex, setActiveIndex] = useState<number | undefined>(undefined);
  const [height, setActiveHeight] = useState<number | undefined>(0);
  const showAllNumbers = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    if (activeIndex === index) {
      setActiveIndex(undefined);
      setActiveHeight(0);
    } else {
      setActiveIndex(index);
      setActiveHeight(item.phoneNumbers.length * 14);
    }
  };
  return (
    <TouchableWithoutFeedback>
      <View style={styles.contactContainer}>
        <View style={styles.contactInfo}>
          <View style={[styles.contactIcon, {backgroundColor}]}>
            {leftIconContent}
            <TouchableOpacity
              disabled={item.phoneNumbers.length === 1}
              onPress={showAllNumbers}
              style={styles.indicator}>
              {indicatorContent}
            </TouchableOpacity>
          </View>
          <View>
            <Text
              style={styles.name}>{`${item.firstName} ${item.lastName}`}</Text>
            <Text style={styles.phoneNumber}>{item.phoneNumbers[0]}</Text>

            {item.phoneNumbers.length === 1 ? null : (
              <View style={{height}}>
                {[...item.phoneNumbers.slice(1, item.phoneNumbers.length)].map(
                  num => {
                    return <Text style={styles.phoneNumber}>{num}</Text>;
                  },
                )}
              </View>
            )}
          </View>
        </View>
        <View style={styles.rightButtonContainer}>{rightSideButton}</View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  contactContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: rem(14),
  },
  contactInfo: {
    flexDirection: 'row',
  },
  contactIcon: {
    width: rem(46),
    height: rem(46),
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: rem(14),
  },
  name: {
    fontSize: font(16),
    fontFamily: FONTS.primary.bold,
    color: COLORS.darkBlue,
    paddingBottom: rem(3),
  },
  phoneNumber: {
    fontSize: font(14),
    fontFamily: FONTS.primary.medium,
    color: COLORS.scorpion,
  },
  rightButtonContainer: {alignSelf: 'flex-start', marginTop: rem(12)},
  indicator: {
    position: 'absolute',
    right: -2,
    bottom: -2,
    zIndex: 10,
  },
});
