// SPDX-License-Identifier: ice License 1.0

import {PrimaryButton} from '@components/Buttons/PrimaryButton';
import {stopPropagation} from '@components/KeyboardDismiss';
import {Touchable} from '@components/Touchable';
import {COLORS} from '@constants/colors';
import {MIDDLE_BUTTON_HIT_SLOP} from '@constants/styles';
import {useBottomOffsetStyle} from '@navigation/hooks/useBottomOffsetStyle';
import {MainStackParamList} from '@navigation/Main';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {
  Calendar,
  CalendarMethods,
} from '@screens/Modals/DateSelector/components/Calendar';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import React, {useCallback, useRef} from 'react';
import {StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';
import Animated, {SlideInDown} from 'react-native-reanimated';
import {rem} from 'rn-units';

export const DateSelect = () => {
  const {
    params: {onSelect},
  } = useRoute<RouteProp<MainStackParamList, 'DateSelect'>>();
  const navigation = useNavigation();
  const bottomOffsetStyle = useBottomOffsetStyle({extraOffset: rem(30)});
  const calendarRef = useRef<CalendarMethods>(null);
  const rangeRef = useRef<{
    start: string | null;
    end: string | null;
  }>({start: null, end: null});

  const onPeriodSelect = useCallback(
    (start: string | null, end: string | null) => {
      rangeRef.current = {start, end};
    },
    [],
  );

  const onResetPress = () => {
    calendarRef.current?.reset();
  };

  const onApplyPress = () => {
    navigation.goBack();
    onSelect(rangeRef.current);
  };

  return (
    <TouchableWithoutFeedback onPress={navigation.goBack}>
      <View style={styles.background}>
        <Animated.View
          {...stopPropagation}
          entering={SlideInDown}
          style={[styles.container, bottomOffsetStyle.current]}>
          <View style={styles.header}>
            <Text style={styles.titleText}>{t('date_select.title')}</Text>
            <Touchable hitSlop={MIDDLE_BUTTON_HIT_SLOP} onPress={onResetPress}>
              <Text style={styles.resetButtonText}>{t('button.reset')}</Text>
            </Touchable>
          </View>
          <Calendar ref={calendarRef} onPeriodSelect={onPeriodSelect} />
          <View style={styles.footer}>
            <Touchable
              hitSlop={MIDDLE_BUTTON_HIT_SLOP}
              onPress={navigation.goBack}
              style={styles.footerButton}>
              <Text style={styles.cancelButtonText}>{t('button.cancel')}</Text>
            </Touchable>
            <PrimaryButton
              text={t('button.apply')}
              style={styles.footerButton}
              textStyle={styles.applyButtonText}
              onPress={onApplyPress}
            />
          </View>
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: COLORS.transparentBackground,
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: COLORS.white,
    paddingHorizontal: rem(16),
    borderTopLeftRadius: rem(20),
    borderTopRightRadius: rem(20),
    paddingTop: rem(20),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleText: {
    ...font(14, 19, 'semibold', 'primaryDark'),
    textTransform: 'uppercase',
  },
  resetButtonText: {
    ...font(14, 19, 'semibold', 'primaryLight'),
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: rem(40),
  },
  footerButton: {
    marginHorizontal: rem(12),
    height: rem(40),
    width: rem(130),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: rem(12),
  },
  applyButtonText: {
    ...font(14, 19, 'black'),
  },
  cancelButtonText: {
    ...font(14, 19, 'black', 'secondary'),
  },
});
