// SPDX-License-Identifier: ice License 1.0

import {ParsedDescription} from '@components/ParsedDescription';
import {COLORS} from '@constants/colors';
import {useSafeAreaInsets} from '@hooks/useSafeAreaInsets';
import {StatusNoticeActions} from '@store/modules/StatusNotice/actions';
import {statusNoticeDataSelector} from '@store/modules/StatusNotice/selectors';
import {MaintenanceIcon} from '@svg/MaintenanceIcon';
import {font} from '@utils/styles';
import React from 'react';
import {LayoutChangeEvent, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch, useSelector} from 'react-redux';
import {rem} from 'rn-units/index';

export function StatusNotice() {
  const statusNoticeData = useSelector(statusNoticeDataSelector);

  const {top: topInset} = useSafeAreaInsets();
  const dispatch = useDispatch();

  if (!statusNoticeData) {
    return null;
  }

  const {link, title, content} = statusNoticeData;

  return (
    <LinearGradient
      colors={[COLORS.koromiko, COLORS.neonCarrot]}
      start={{x: 0.5, y: 0}}
      end={{x: 0.5, y: 1}}
      locations={[0.24, 0.9562]}
      style={[styles.container, {paddingTop: topInset}]}
      onLayout={(event: LayoutChangeEvent) =>
        dispatch(
          StatusNoticeActions.SET_STATUS_NOTICE_HEIGHT.STATE.create(
            event.nativeEvent.layout.height,
          ),
        )
      }>
      <Text style={styles.titleText}>
        <View style={styles.icon}>
          <MaintenanceIcon color={COLORS.white} />
        </View>
        {title}
      </Text>
      <Text style={styles.contentText}>
        <ParsedDescription description={content} link={link} />
      </Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: rem(18),
    paddingTop: rem(20),
    paddingBottom: rem(12),
  },
  icon: {
    paddingRight: rem(8),
  },
  titleText: {
    justifyContent: 'center',
    ...font(15, 18, 'semibold', 'white'),
    marginBottom: rem(8),
  },
  contentText: {
    ...font(13, 18, 'regular', 'white'),
  },
});
