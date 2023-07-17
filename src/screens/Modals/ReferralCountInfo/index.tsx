// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import {commonStyles} from '@constants/styles';
import {HomeTabStackParamList, MainStackParamList} from '@navigation/Main';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {userIdSelector, userSelector} from '@store/modules/Account/selectors';
import {userByIdSelector} from '@store/modules/Users/selectors';
import {RoundedTriangle} from '@svg/RoundedTriangle';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import React, {useCallback, useMemo, useState} from 'react';
import {LayoutChangeEvent, Text} from 'react-native';
import {StyleSheet, TouchableWithoutFeedback, View} from 'react-native';
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

  const onLayoutContainer = useCallback(
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
    return {
      top: hostViewParams.pageY + hostViewParams.height + rem(4),
      left:
        hostViewParams.pageX +
        hostViewParams.width / 2 -
        ROUNDED_TRIANGLE_SIZE / 2,
    };
  }, [
    hostViewParams.height,
    hostViewParams.pageX,
    hostViewParams.pageY,
    hostViewParams.width,
  ]);

  return (
    <TouchableWithoutFeedback onPress={onClose}>
      <View style={commonStyles.flexOne}>
        <RoundedTriangle
          style={[styles.arrow, arrowStyle]}
          width={ROUNDED_TRIANGLE_SIZE}
          height={ROUNDED_TRIANGLE_SIZE}
          fill={COLORS.downriver}
        />
        <View
          style={[styles.container, containerStyle]}
          onLayout={onLayoutContainer}>
          <View style={styles.cell}>
            <Text style={styles.label}>{t('users.referralType.T1')}</Text>
            <Text style={styles.value}>{user?.t1ReferralCount ?? 0}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.cell}>
            <Text style={styles.label}>{t('users.referralType.T2')}</Text>
            <Text style={styles.value}>{user?.t2ReferralCount ?? 0}</Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
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
