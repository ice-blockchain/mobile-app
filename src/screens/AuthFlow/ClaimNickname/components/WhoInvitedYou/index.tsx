// SPDX-License-Identifier: BUSL-1.1

import {CommonInput} from '@components/CommonInput';
import {COLORS} from '@constants/colors';
import {FONTS} from '@constants/fonts';
import {InfoIconSvg} from '@svg/InfoIcon';
import {TicketIconSvg} from '@svg/Ticket';
import {TipTriangleIconSvg} from '@svg/TipTriangle';
import {WhoInvitedYouSvg} from '@svg/WhoInvitedYou';
import {translate} from '@translations/i18n';
import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {font, rem, screenHeight} from 'rn-units';

interface WhoInvitedYouProps {
  inputValue: string;
  onInputChange: (v: string) => void;
}

const h = (screenHeight * 275) / 811;
const w = (h * 236) / 275;

export const WhoInvitedYou = ({
  inputValue,
  onInputChange,
}: WhoInvitedYouProps) => {
  const [isTipVisible, setTipVisibility] = useState(false);
  const showTip = () => {
    setTipVisibility(true);
  };
  const hideTip = () => {
    setTipVisibility(false);
  };
  return (
    <View style={styles.container}>
      <WhoInvitedYouSvg width={h} height={w} />
      <View>
        <Text style={styles.title}>{translate('whoInvitedYou.title')}</Text>
        <Text style={styles.description}>
          {translate('whoInvitedYou.description')}
        </Text>

        <CommonInput
          placeholder={translate('whoInvitedYou.inputPlaceholder')}
          value={inputValue}
          onChangeText={onInputChange}
          icon={<TicketIconSvg />}
          containerStyle={styles.input}
        />

        <View style={styles.dontHaveCodeContainer}>
          <TouchableOpacity style={styles.infoButton} onPress={showTip}>
            <InfoIconSvg />
          </TouchableOpacity>
          <Text style={styles.dontHaveCodeText}>
            {translate('whoInvitedYou.dontHaveInvitationCode')}
          </Text>

          <TouchableOpacity>
            <Text style={styles.tapHere}>
              {translate('whoInvitedYou.tapHere')}
            </Text>
          </TouchableOpacity>
        </View>
        {isTipVisible ? (
          <View style={styles.tipWrapper}>
            <View style={styles.tipContainer}>
              <Text style={styles.tipText}>
                {translate('whoInvitedYou.dontHaveCodeTip')}
              </Text>
            </View>
            <View style={styles.tipTriangle}>
              <TipTriangleIconSvg />
            </View>
          </View>
        ) : null}
      </View>

      {isTipVisible ? (
        <TouchableOpacity
          style={StyleSheet.absoluteFill}
          onPress={hideTip}
          activeOpacity={1}>
          <View />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: rem(80),
  },
  title: {
    marginTop: rem(24),
    marginBottom: rem(23),
    fontFamily: FONTS.primary.black,
    color: COLORS.darkBlue,
    fontSize: font(28),
    textAlign: 'center',
  },
  description: {
    fontFamily: FONTS.primary.regular,
    color: COLORS.greyText,
    fontSize: font(14),
    lineHeight: rem(24),
    textAlign: 'center',
  },
  input: {
    marginTop: rem(30),
    width: rem(247),
  },
  dontHaveCodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoButton: {
    padding: rem(9),
  },
  dontHaveCodeText: {
    fontFamily: FONTS.primary.regular,
    color: COLORS.darkBlue,
    fontSize: font(12.5),
    lineHeight: rem(24),
  },
  tapHere: {
    fontFamily: FONTS.primary.bold,
    color: COLORS.darkBlue,
    fontSize: font(12.5),
    lineHeight: rem(24),
  },
  tipText: {
    fontFamily: FONTS.primary.regular,
    color: COLORS.white,
    fontSize: font(11.5),
    lineHeight: rem(18),
    textAlign: 'center',
  },
  tipContainer: {
    backgroundColor: COLORS.darkBlue,
    paddingHorizontal: rem(17.5),
    paddingTop: rem(9),
    paddingBottom: rem(13),
    borderRadius: rem(13),
  },
  tipTriangle: {
    marginLeft: rem(15),
  },
  tipWrapper: {
    position: 'absolute',
    bottom: rem(20),
  },
});
