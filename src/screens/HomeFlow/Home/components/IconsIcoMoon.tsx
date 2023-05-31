// SPDX-License-Identifier: ice License 1.0
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {createIconSetFromIcoMoon} from 'react-native-vector-icons';

import icoMoonConfig from './selection.json';

const Icon = createIconSetFromIcoMoon(icoMoonConfig, 'icomoon', 'icomoon.ttf');

const icons = [
  'backchat',
  'check',
  'city',
  'city2',
  'download',
  'edit',
  'error',
  'eyeOff',
  'eye',
  'file',
  'heart',
  'help',
  'loading',
  'medicine',
  'menu',
  'pass',
  'qr',
  'replay',
  'reset',
  'shareAndroid',
  'shareIos',
  'shareAndroid2',
  'sign',
  'star',
  'stop',
  'team',
  'up',
  'userlike',
  'verify',
  'wolrd',
];

const IconsIcoMoon = () => {
  return (
    <View style={styles.container}>
      {icons.map(icon => {
        return <Icon name={icon} size={22} />;
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'grey',
    flexWrap: 'wrap',
    flexDirection: 'row',
    width: '100%',
  },
});

export default IconsIcoMoon;
