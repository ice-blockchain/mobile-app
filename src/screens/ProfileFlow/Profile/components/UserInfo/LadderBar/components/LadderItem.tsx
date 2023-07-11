// SPDX-License-Identifier: ice License 1.0

import {HiddenProfileElement} from '@api/user/types';
import {AnimatedNumberText} from '@components/AnimatedNumberText';
import {Touchable} from '@components/Touchable';
import {COLORS} from '@constants/colors';
import {MIDDLE_BUTTON_HIT_SLOP} from '@constants/styles';
import {LADDER_ITEM_WIDTH} from '@screens/ProfileFlow/Profile/components/UserInfo/LadderBar';
import {useUpdateHiddenProfileElements} from '@store/modules/Account/hooks/useUpdateHiddenProfileElements';
import {ClosedEye} from '@svg/ClosedEye';
import {InfoOutlineIcon} from '@svg/InfoOutlineIcon';
import {font} from '@utils/styles';
import React, {memo, useCallback, useRef} from 'react';
import {
  MeasureOnSuccessCallback,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, {
  FadeIn,
  FadeOut,
  ZoomInEasyDown,
  ZoomOutEasyDown,
} from 'react-native-reanimated';
import {rem} from 'rn-units';

type Props = {
  hidden?: boolean;
  title: string;
  enabled?: boolean;
  /**
   * Integer value to display with animation
   */
  value: number;
  isProfilePrivacyEditMode?: boolean;
  privacyType: HiddenProfileElement;
  onShowInfo?: MeasureOnSuccessCallback;
};

export const LadderItem = memo(
  ({
    hidden,
    title,
    value,
    enabled = false,
    isProfilePrivacyEditMode = false,
    privacyType,
    onShowInfo,
  }: Props) => {
    const refInfoButton = useRef<TouchableOpacity>(null);

    const {onUpdate} = useUpdateHiddenProfileElements();

    const handlePress = () => {
      if (enabled) {
        onUpdate(privacyType);
      }
    };

    const onInfoPress = useCallback(() => {
      if (onShowInfo) {
        refInfoButton.current?.measure(onShowInfo);
      }
    }, [onShowInfo]);

    return (
      <View
        style={[
          styles.outerContainer,
          isProfilePrivacyEditMode && styles.editModeOuterContainer,
        ]}>
        <Touchable
          onPress={handlePress}
          style={[
            styles.container,
            isProfilePrivacyEditMode && styles.editModeContainer,
          ]}>
          <View style={styles.ladderLabelTextContainer}>
            <Text style={styles.ladderLabelText}>{title}</Text>
            {onShowInfo && !hidden ? (
              <Touchable
                ref={refInfoButton}
                style={styles.infoButtonContainer}
                hitSlop={MIDDLE_BUTTON_HIT_SLOP}
                onPress={onInfoPress}>
                <InfoOutlineIcon
                  width={rem(9)}
                  height={rem(9)}
                  color={COLORS.shamrock}
                />
              </Touchable>
            ) : null}
          </View>
          <View style={styles.ladderItem}>
            {hidden ? (
              <Animated.View
                entering={ZoomInEasyDown.springify().damping(50).stiffness(200)}
                exiting={ZoomOutEasyDown.springify().damping(50).stiffness(200)}
                style={styles.hiddenView}>
                <ClosedEye />
              </Animated.View>
            ) : (
              <Animated.Text
                entering={FadeIn.springify().damping(50).stiffness(200)}
                exiting={FadeOut.springify().damping(50).stiffness(200)}>
                <AnimatedNumberText
                  style={[
                    styles.text,
                    isProfilePrivacyEditMode && styles.textPrivacyEdit,
                  ]}
                  value={value}
                />
              </Animated.Text>
            )}
          </View>
        </Touchable>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  outerContainer: {
    paddingVertical: rem(4),
    borderRadius: rem(16),
    width: LADDER_ITEM_WIDTH,
  },
  editModeOuterContainer: {
    backgroundColor: COLORS.white02opacity,
  },
  container: {
    paddingVertical: rem(8),
    borderRadius: rem(14),
    height: rem(61),
    justifyContent: 'flex-end',
  },
  editModeContainer: {
    backgroundColor: COLORS.white,
  },
  ladderItem: {
    alignItems: 'center',
    justifyContent: 'center',
    height: rem(26),
  },
  hiddenView: {
    marginTop: rem(4),
    width: rem(60),
    height: rem(24),
    borderRadius: rem(16),
    backgroundColor: COLORS.dodgerBlue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    marginTop: rem(4),
    ...font(20, 25, 'bold'),
  },
  textPrivacyEdit: {
    ...font(20, 25, 'bold', 'primaryDark'),
  },
  ladderLabelTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ladderLabelText: {
    marginHorizontal: rem(4),
    ...font(10, 14, 'regular', 'periwinkleGray', 'center'),
  },
  infoButtonContainer: {
    marginLeft: rem(1),
  },
});
