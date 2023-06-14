// SPDX-License-Identifier: ice License 1.0

//import liraries
import {Images} from '@images';
import React from 'react';
import {Image} from 'react-native';
import {StyleSheet, View} from 'react-native';

const icons = [
  Images.icons.backchat,
  Images.icons.check,
  Images.icons.city,
  Images.icons.city2,
  Images.icons.download,
  Images.icons.edit,
  Images.icons.error,
  Images.icons.eyeOff,
  Images.icons.eye,
  Images.icons.file,
  Images.icons.heart,
  Images.icons.help,
  Images.icons.loading,
  Images.icons.medicine,
  Images.icons.menu,
  Images.icons.pass,
  Images.icons.qr,
  Images.icons.replay,
  Images.icons.reset,
  Images.icons.shareAndroid,
  Images.icons.shareIos,
  Images.icons.shareAdnroid2,
  Images.icons.sign,
  Images.icons.star,
  Images.icons.stop,
  Images.icons.team,
  Images.icons.up,
  Images.icons.userlike,
  Images.icons.verify,
  Images.icons.wolrd,
];

const Icons = () => {
  return (
    <View style={styles.container}>
      {icons.map(icon => {
        return <Image style={styles.icon} source={icon} />;
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
  icon: {
    width: 22,
    height: 22,
  },
});

export default Icons;
