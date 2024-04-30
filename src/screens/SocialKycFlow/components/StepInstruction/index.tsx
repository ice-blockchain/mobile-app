// SPDX-License-Identifier: ice License 1.0

import {Touchable} from '@components/Touchable';
import {COLORS} from '@constants/colors';
import {replaceString, tagRegex} from '@translations/i18n';
import {font, paddingLeftRtl} from '@utils/styles';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {rem} from 'rn-units';

type Props = {
  stepNumber: number;
  description: string;
  allBordersRounded?: boolean;
  rightIcon?: React.ReactNode;
  onRightIconPress?: () => void;
  onPress?: () => void;
};

export function StepInstruction({
  stepNumber,
  description,
  allBordersRounded = true,
  rightIcon,
  onRightIconPress,
  onPress,
}: Props) {
  return (
    <Touchable
      onPress={onPress}
      style={[
        styles.container,
        allBordersRounded ? styles.borderRadius : null,
      ]}>
      <View style={styles.stepNumberContainer}>
        <Text style={styles.stepNumberText}>{stepNumber}</Text>
      </View>
      <Text style={styles.text}>
        {replaceString(description, tagRegex('bold', false), (match, index) => (
          <Text key={match + index} style={styles.boldText}>
            {match}
          </Text>
        ))}
      </Text>
      {rightIcon ? (
        <Touchable style={styles.rightIconContainer} onPress={onRightIconPress}>
          {rightIcon}
        </Touchable>
      ) : null}
    </Touchable>
  );
}

const STEP_NUMBER_SIZE = rem(30);
const BORDER_RADIUS = rem(16);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: BORDER_RADIUS,
    borderTopRightRadius: BORDER_RADIUS,
    padding: rem(12),
    backgroundColor: COLORS.paleSkyBlue,
  },
  borderRadius: {
    borderRadius: BORDER_RADIUS,
  },
  stepNumberContainer: {
    width: STEP_NUMBER_SIZE,
    height: STEP_NUMBER_SIZE,
    borderRadius: STEP_NUMBER_SIZE / 2,
    backgroundColor: COLORS.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepNumberText: {
    ...font(15, null, 'black', 'white', 'center'),
  },
  text: {
    flex: 1,
    ...paddingLeftRtl(rem(12)),
    ...font(14, 20, 'medium', 'primaryDark', 'left'),
  },
  boldText: {
    ...font(14, 20, 'bold', 'primaryDark', 'left'),
  },
  rightIconContainer: {
    ...paddingLeftRtl(rem(12)),
    borderStartWidth: rem(1),
    borderStartColor: COLORS.periwinkleGray,
  },
});
