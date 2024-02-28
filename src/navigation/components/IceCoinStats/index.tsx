// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import {Images} from '@images';
import {iceCoinStatsSelector} from '@store/modules/Stats/selectors';
import {font} from '@utils/styles';
import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {rem} from 'rn-units';

export const IceCoinStats = () => {
  const config = useSelector(iceCoinStatsSelector);

  return (
    <View style={styles.container}>
      <Image
        resizeMode={'contain'}
        style={styles.image}
        source={Images.popUp.error}
      />
      <Text>{config?.team?.enabled.toString()}</Text>
      <Text style={styles.messageText}>:(</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: rem(40),
  },
  image: {
    width: rem(250),
    height: rem(230),
  },
  messageText: {
    ...font(14, 20, 'medium', 'secondary', 'center'),
    marginTop: rem(16),
  },
});
