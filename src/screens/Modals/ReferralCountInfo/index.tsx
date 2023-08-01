// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import {commonStyles} from '@constants/styles';
import {HomeTabStackParamList, MainStackParamList} from '@navigation/Main';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {userIdSelector, userSelector} from '@store/modules/Account/selectors';
import {userByIdSelector} from '@store/modules/Users/selectors';
import {RoundedTriangle} from '@svg/RoundedTriangle';
import {isRTL, t} from '@translations/i18n';
import {formatNumber} from '@utils/numbers';
import {font} from '@utils/styles';
import React, {useCallback, useMemo, useState} from 'react';
import {LayoutChangeEvent, StyleSheet, Text, View} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import {runOnJS} from 'react-native-reanimated';
import {useSelector} from 'react-redux';
import {rem, screenWidth} from 'rn-units';

const ROUNDED_TRIANGLE_SIZE = rem(12);

export const ReferralCountInfo = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeTabStackParamList>>();

  const {
    params: {hostViewParams, userId},
  } = useRoute<RouteProp<MainStackParamList, 'ReferralCountInfo'>>();

  const authUserId = useSelector(userIdSelector);

  const user = useSelector(
    userId === authUserId ? userSelector : userByIdSelector(userId),
  );

  const [containerWidth, setContainerWidth] = useState(0);

  const onContainerLayout = useCallback(
    ({
      nativeEvent: {
        layout: {width},
      },
    }: LayoutChangeEvent) => {
      setContainerWidth(width);
    },
    [],
  );

  const onClose = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const containerStyle = useMemo(() => {
    return {
      top: hostViewParams.pageY + hostViewParams.height + rem(12),
      left: (screenWidth - containerWidth) / 2,
    };
  }, [containerWidth, hostViewParams.height, hostViewParams.pageY]);

  const arrowStyle = useMemo(() => {
    const offset =
      hostViewParams.pageX +
      hostViewParams.width / 2 -
      ROUNDED_TRIANGLE_SIZE / 2;
    return {
      top: hostViewParams.pageY + hostViewParams.height + rem(4),
      ...(isRTL
        ? {
            right: offset,
          }
        : {
            left: offset,
          }),
    };
  }, [
    hostViewParams.height,
    hostViewParams.pageX,
    hostViewParams.pageY,
    hostViewParams.width,
  ]);

  const tap = Gesture.Tap().onStart(() => {
    runOnJS(onClose)();
  });
  const pan = Gesture.Pan()
    .minPointers(1)
    .minDistance(0)
    .averageTouches(true)
    .onStart(() => {
      runOnJS(onClose)();
    });

  return (
    <GestureDetector gesture={Gesture.Exclusive(tap, pan)}>
      <View style={commonStyles.flexOne}>
        <RoundedTriangle
          style={[styles.arrow, arrowStyle]}
          width={ROUNDED_TRIANGLE_SIZE}
          height={ROUNDED_TRIANGLE_SIZE}
          fill={COLORS.downriver}
        />
        <View
          style={[styles.container, containerStyle]}
          onLayout={onContainerLayout}>
          <View style={styles.cell}>
            <Text style={styles.label}>{t('users.referralType.T1')}</Text>
            <Text style={styles.value}>
              {formatNumber(user?.t1ReferralCount ?? 0, {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              })}
            </Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.cell}>
            <Text style={styles.label}>{t('users.referralType.T2')}</Text>
            <Text style={styles.value}>
              {formatNumber(user?.t2ReferralCount ?? 0, {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              })}
            </Text>
          </View>
        </View>
      </View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    minWidth: rem(230),
    minHeight: rem(50),
    borderRadius: rem(12),
    backgroundColor: COLORS.downriver,
  },
  arrow: {
    position: 'absolute',
  },
  cell: {
    paddingVertical: rem(6),
    paddingHorizontal: rem(12),
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    opacity: 0.7,
    ...font(10, null, 'regular', 'white'),
    textTransform: 'uppercase',
  },
  value: {
    marginTop: rem(2),
    ...font(20, null, 'bold', 'white'),
  },
  divider: {
    marginVertical: rem(5),
    alignSelf: 'stretch',
    width: rem(1),
    backgroundColor: COLORS.periwinkleGray,
  },
});
