// SPDX-License-Identifier: ice License 1.0

import {Touchable} from '@components/Touchable';
import {COLORS} from '@constants/colors';
import {SCREEN_SIDE_OFFSET} from '@constants/styles';
import {BackButtonIcon} from '@svg/BackButtonIcon';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {rem} from 'rn-units';

type Props = {
  onGetStarted: () => void;
};

export function GetStartedButton({onGetStarted}: Props) {
  return (
    <Touchable style={styles.container} onPress={onGetStarted}>
      <Text style={styles.text}>
        {t('creative_library.get_started.get_started')}
      </Text>
      <View style={styles.iconContainer}>
        <BackButtonIcon
          color={COLORS.white}
          width={rem(10)}
          style={styles.icon}
        />
      </View>
    </Touchable>
  );
}

const ICON_CONTAINER_SIZE = rem(22);

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
    marginTop: rem(16),
    paddingVertical: rem(8),
    paddingLeft: rem(16),
    paddingRight: rem(6),
    borderWidth: rem(1.2),
    borderRadius: rem(40),
    borderColor: COLORS.primaryLight,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: SCREEN_SIDE_OFFSET,
  },
  text: {
    ...font(16, 19, 'semibold', 'primaryLight'),
  },
  iconContainer: {
    width: ICON_CONTAINER_SIZE,
    height: ICON_CONTAINER_SIZE,
    borderRadius: ICON_CONTAINER_SIZE / 2,
    backgroundColor: COLORS.primaryLight,
    marginLeft: rem(16),
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    transform: [{rotate: '180deg'}],
  },
});
