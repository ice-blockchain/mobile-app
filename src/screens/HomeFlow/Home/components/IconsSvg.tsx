// SPDX-License-Identifier: ice License 1.0

import {backchat} from '@svg/iconsSvg/backchat';
import {check} from '@svg/iconsSvg/check';
import {city} from '@svg/iconsSvg/city';
import {city2} from '@svg/iconsSvg/city2';
import {download} from '@svg/iconsSvg/download';
import {edit} from '@svg/iconsSvg/edit';
import {error} from '@svg/iconsSvg/error';
import {eye} from '@svg/iconsSvg/eye';
import {eyeOff} from '@svg/iconsSvg/eyeOff';
import {file} from '@svg/iconsSvg/file';
import {heart} from '@svg/iconsSvg/heart';
import {help} from '@svg/iconsSvg/help';
import {loading} from '@svg/iconsSvg/loading';
import {medicine} from '@svg/iconsSvg/medicine';
import {menu} from '@svg/iconsSvg/menu';
import {pass} from '@svg/iconsSvg/pass';
import {qr} from '@svg/iconsSvg/qr';
import {replay} from '@svg/iconsSvg/replay';
import {reset} from '@svg/iconsSvg/reset';
import {shareAndroid} from '@svg/iconsSvg/shareAndroid';
import {shareAndroid2} from '@svg/iconsSvg/shareAndroid2';
import {shareIos} from '@svg/iconsSvg/shareIos';
import {sign} from '@svg/iconsSvg/sign';
import {star} from '@svg/iconsSvg/star';
import {stop} from '@svg/iconsSvg/stop';
import {team} from '@svg/iconsSvg/team';
import {up} from '@svg/iconsSvg/up';
import {userlike} from '@svg/iconsSvg/userlike';
import {verify} from '@svg/iconsSvg/verify';
import {wolrd} from '@svg/iconsSvg/wolrd';
import React from 'react';
import {StyleSheet, View} from 'react-native';

const icons = [
  backchat,
  check,
  city,
  city2,
  download,
  edit,
  error,
  eyeOff,
  eye,
  file,
  heart,
  help,
  loading,
  medicine,
  menu,
  pass,
  qr,
  replay,
  reset,
  shareAndroid,
  shareIos,
  shareAndroid2,
  sign,
  star,
  stop,
  team,
  up,
  userlike,
  verify,
  wolrd,
];

const IconsSvg = () => {
  return (
    <View style={styles.container}>
      {icons.map(icon => {
        return icon({});
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

export default IconsSvg;
