// SPDX-License-Identifier: ice License 1.0

import {PrimaryButton} from '@components/Buttons/PrimaryButton';
import {CheckBox} from '@components/CheckBox';
import {IceLabel} from '@components/Labels/IceLabel';
import {COLORS} from '@constants/colors';
import {LINKS} from '@constants/links';
import {STAKING_ALLOCATION_MAX, STAKING_YEARS_MAX} from '@constants/staking';
import {MainNavigationParams} from '@navigation/Main';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {DEFAULT_DIALOG_NO_BUTTON} from '@screens/Modals/PopUp/components/PopUpButton';
import {usePreStaking} from '@screens/Staking/hooks/usePreStaking';
import {CoinsStackIcon} from '@svg/CoinsStackIcon';
import {replaceString, t, tagRegex} from '@translations/i18n';
import {openLinkWithInAppBrowser} from '@utils/device';
import {font} from '@utils/styles';
import React, {memo, RefObject, useMemo, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {isAndroid, rem} from 'rn-units';

type Props = {
  parameters: RefObject<{years: number; allocation: number} | null>;
};

export const Footer = memo(({parameters}: Props) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<MainNavigationParams>>();
  const {preStakingSummary, preStakingLoading, confirmPreStaking} =
    usePreStaking();
  const [termsAccepted, setTermsAccepted] = useState(false);
  const maxValuesSet =
    preStakingSummary?.years === STAKING_YEARS_MAX &&
    preStakingSummary.allocation === STAKING_ALLOCATION_MAX;
  const buttonDisabled = !termsAccepted || maxValuesSet;

  const onStakePress = () => {
    navigation.navigate('PopUp', {
      title: t('staking.confirm_title'),
      message: t('staking.confirm_subtitle'),
      buttons: [
        DEFAULT_DIALOG_NO_BUTTON,
        {
          text: t('button.confirm'),
          onPress: () => {
            if (parameters.current) {
              confirmPreStaking(parameters.current);
            }
          },
        },
      ],
    });
  };

  const termsAgreeText = useMemo(() => {
    const onTermsPress = () => {
      openLinkWithInAppBrowser({url: LINKS.TERMS});
    };

    const text = replaceString(
      t('staking.terms_agree'),
      tagRegex('ice'),
      (match, index) => (
        <IceLabel
          key={match + index}
          iconSize={14}
          color={COLORS.primaryDark}
          iconOffsetY={isAndroid ? 3 : 1}
        />
      ),
    );

    return replaceString(text, tagRegex('link'), (match, index) => (
      <Text key={match + index} style={styles.termsLink} onPress={onTermsPress}>
        {t('staking.staking_terms')}
      </Text>
    ));
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.checkboxRow}>
        <CheckBox checked={termsAccepted} onValueChange={setTermsAccepted} />
        <Text style={styles.noteText}>{termsAgreeText}</Text>
      </View>
      <PrimaryButton
        onPress={onStakePress}
        disabled={buttonDisabled}
        text={t('staking.stake_now')}
        textStyle={styles.buttonText}
        style={[styles.button, buttonDisabled && styles.button_disabled]}
        icon={
          <CoinsStackIcon
            color={COLORS.white}
            width={rem(18)}
            height={rem(18)}
          />
        }
        loading={preStakingLoading}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    marginTop: rem(41),
    marginHorizontal: rem(38),
  },
  noteText: {
    marginLeft: rem(14),
    ...font(12, 19, 'medium', 'primaryDark'),
  },
  termsLink: {
    color: COLORS.primaryLight,
  },
  button: {
    height: rem(48),
    marginTop: rem(40),
    backgroundColor: COLORS.primaryLight,
    borderRadius: rem(16),
  },
  button_disabled: {
    opacity: 0.5,
  },
  buttonText: {
    ...font(14, 18, 'black', 'white'),
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
