// SPDX-License-Identifier: ice License 1.0

import {PrimaryButton} from '@components/Buttons/PrimaryButton';
import {Touchable} from '@components/Touchable';
import {COLORS} from '@constants/colors';
import {smallHeightDevice} from '@constants/styles';
import {PermissionsActions} from '@store/modules/Permissions/actions';
import {canAskPermissionSelector} from '@store/modules/Permissions/selectors';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {rem} from 'rn-units';

type Props = {
  isLastPage: boolean;
  goNextPage: () => void;
  finishOnboarding: () => void;
};

export const Controls = ({isLastPage, goNextPage, finishOnboarding}: Props) => {
  const dispatch = useDispatch();

  const canAskNotificationPermission = useSelector(
    canAskPermissionSelector('pushNotifications'),
  );

  const showNotNow = isLastPage && canAskNotificationPermission;

  return (
    <View style={styles.container}>
      <View style={styles.buttons}>
        {showNotNow && (
          <Touchable onPress={finishOnboarding}>
            <Text style={styles.linkText}>{t('welcome.page6.not_now')}</Text>
          </Touchable>
        )}
        <PrimaryButton
          text={t('button.next_step')}
          onPress={() => {
            if (showNotNow) {
              dispatch(
                PermissionsActions.GET_PERMISSIONS.START.create(
                  'pushNotifications',
                ),
              );
            } else if (isLastPage && !canAskNotificationPermission) {
              finishOnboarding();
            } else {
              goNextPage();
            }
          }}
          style={[styles.button, showNotNow && styles.button_small]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    paddingTop: smallHeightDevice ? rem(0) : rem(28),
    paddingHorizontal: rem(48),
    paddingBottom: 2000,
    marginBottom: -2000,
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: rem(32),
  },
  button: {
    width: '100%',
  },
  button_small: {
    width: rem(154),
  },
  linkText: {
    marginHorizontal: rem(8),
    marginVertical: rem(10),
    ...font(14, 17, 'medium', 'primaryDark'),
  },
});
