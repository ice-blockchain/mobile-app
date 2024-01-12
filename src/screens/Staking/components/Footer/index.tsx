// SPDX-License-Identifier: ice License 1.0

import {DEFAULT_DIALOG_NO_BUTTON} from '@components/Buttons/PopUpButton';
import {PrimaryButton} from '@components/Buttons/PrimaryButton';
import {CheckBox} from '@components/CheckBox';
import {IceLabel} from '@components/Labels/IceLabel';
import {COLORS} from '@constants/colors';
import {LINKS} from '@constants/links';
import {STAKING_ALLOCATION_MAX, STAKING_YEARS_MAX} from '@constants/staking';
import {SCREEN_SIDE_OFFSET} from '@constants/styles';
import {MainNavigationParams} from '@navigation/Main';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {usePreStaking} from '@screens/Staking/hooks/usePreStaking';
import {balanceSummarySelector} from '@store/modules/Tokenomics/selectors';
import {CoinsStackIcon} from '@svg/CoinsStackIcon';
import {YearsOutlineIcon} from '@svg/YearsOutlineIcon';
import {isRTL, replaceString, t, tagRegex} from '@translations/i18n';
import {openLinkWithInAppBrowser} from '@utils/device';
import {formatNumberString} from '@utils/numbers';
import {font} from '@utils/styles';
import React, {memo, RefObject, useMemo, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {isAndroid, rem} from 'rn-units';

import {InfoRow} from './components/InfoRow';

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

  const balanceSummary = useSelector(balanceSummarySelector);

  const onStakePress = () => {
    navigation.navigate({
      name: 'PopUp',
      key: 'confirm-staking-popup',
      params: {
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
      },
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

    return replaceString(text, tagRegex('link', false), (match, index) => (
      <Text key={match + index} style={styles.termsLink} onPress={onTermsPress}>
        {match}
      </Text>
    ));
  }, []);

  if (maxValuesSet) {
    return (
      <>
        <InfoRow
          key={'staking.period'}
          style={[styles.infoRowContainer, styles.infoRowContainerTop]}
          Icon={YearsOutlineIcon}
          label={t('staking.period_label')}
          value={preStakingSummary?.years ?? '0'}
          unit={t('global.years').toLowerCase()}
        />
        <InfoRow
          key={'staking.balance'}
          style={styles.infoRowContainer}
          Icon={CoinsStackIcon}
          label={t('staking.balance_label')}
          value={formatNumberString(balanceSummary?.preStaking ?? '0')}
          unit={<IceLabel reversed={isRTL} color={COLORS.primaryLight} />}
        />
      </>
    );
  }

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
    flexShrink: 1,
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
    ...font(14, 19, 'black', 'white'),
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoRowContainer: {
    marginTop: rem(16),
    marginHorizontal: SCREEN_SIDE_OFFSET,
  },
  infoRowContainerTop: {
    marginTop: rem(24),
  },
});
