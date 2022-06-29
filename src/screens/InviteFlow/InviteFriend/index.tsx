// SPDX-License-Identifier: BUSL-1.1

import {PrimaryButton} from '@components/PrimaryButton';
import {COLORS} from '@constants/colors';
import {FONTS} from '@constants/fonts';
import {useScrollShadow} from '@hooks/useScrollShadow';
import {Header} from '@navigation/components/Header';
import {useFocusStatusBar} from '@navigation/hooks/useFocusStatusBar';
// import {InviteStackParamList} from '@navigation/Main';
// import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import InviteAva from '@screens/InviteFlow/InviteFriend/components/InviteAva';
import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {font, rem, screenWidth} from 'rn-units';

const icon = require('./assets/images/inviteFromAgendaGrafik.png');
const ICON_WIDTH = screenWidth - 14;
const ICON_HEIGHT = ICON_WIDTH * 0.685;

interface InviteFriendProps {
  profileUrl?: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  //   navigation: NativeStackNavigationProp<InviteStackParamList, 'InviteShare'>;
}
export const InviteFriend = ({}: InviteFriendProps) => {
  useFocusStatusBar({style: 'light-content'});
  const {shadowStyle} = useScrollShadow();

  const onInvite = () => {
    // navigation.navigate('InviteShare');
  };

  return (
    <View style={styles.container}>
      <Header containerStyle={shadowStyle} color={COLORS.white} />
      <View style={styles.card}>
        <Text style={styles.name}>Johnny Knoxville</Text>
        <Text style={styles.number}>+40720750874</Text>
        <Image source={icon} style={styles.icon} />
        <Text style={styles.description}>
          {"Your friend dosen't have ice.\nSend him an invitation!"}
        </Text>
        <PrimaryButton onPress={onInvite} text="Invite Friend" />
      </View>
      <InviteAva profileUrl="" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.persianBlue,
  },
  card: {
    marginTop: rem(90),
    borderTopLeftRadius: rem(20),
    borderTopRightRadius: rem(20),
    backgroundColor: COLORS.white,
    alignItems: 'center',
    flex: 1,
  },
  name: {
    fontFamily: FONTS.primary.semibold,
    fontSize: font(20),
    marginTop: rem(87),
    color: COLORS.darkBlue,
    textAlign: 'center',
  },
  number: {
    fontFamily: FONTS.primary.medium,
    fontSize: font(16),
    color: COLORS.emperor,
    textAlign: 'center',
  },
  icon: {
    width: ICON_WIDTH,
    height: ICON_HEIGHT,
    alignSelf: 'center',
  },
  description: {
    fontFamily: FONTS.primary.regular,
    fontSize: font(12),
    color: COLORS.greyText,
    textAlign: 'center',
    marginBottom: rem(70),
  },
});
