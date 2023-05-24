// SPDX-License-Identifier: ice License 1.0

import {Touchable} from '@components/Touchable';
import {COLORS} from '@constants/colors';
import {AdminIcon} from '@svg/AdminIcon';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import React, {useCallback} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {rem} from 'rn-units';

interface Props {
  channelId: string | null;
}

export const AddAdministratorButton = ({}: Props) => {
  const onPress = useCallback(() => {
    // Add administrator to channelId
  }, []);

  return (
    <Touchable style={styles.container} onPress={onPress}>
      <View style={styles.iconContainer}>
        <AdminIcon
          width={rem(24)}
          height={rem(24)}
          color={COLORS.primaryLight}
        />
      </View>

      <Text style={styles.text}>
        {t('chat.channel_administrators.buttons.add_administrator')}
      </Text>
    </Touchable>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: rem(16),
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: rem(46),
    height: rem(46),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: rem(12),
    backgroundColor: COLORS.aliceBlue,
  },
  text: {
    marginLeft: rem(12),
    ...font(16, 19.2, '900', 'primaryDark'),
    flex: 1,
  },
});
