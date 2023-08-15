// SPDX-License-Identifier: ice License 1.0

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
import {DEFAULT_DIALOG_NO_BUTTON} from '@screens/Modals/PopUp/components/PopUpButton';
import {usePreStaking} from '@screens/Staking/hooks/usePreStaking';
import {CoinsStackIcon} from '@svg/CoinsStackIcon';
import {YearsOutlineIcon} from '@svg/YearsOutlineIcon';
import {isRTL, replaceString, t, tagRegex} from '@translations/i18n';
import {openLinkWithInAppBrowser} from '@utils/device';
import {font} from '@utils/styles';
import React, {memo, ReactNode, RefObject, useMemo, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {SvgProps} from 'react-native-svg';
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

    return replaceString(text, tagRegex('link', false), (match, index) => (
      <Text key={match + index} style={styles.termsLink} onPress={onTermsPress}>
        {match}
      </Text>
    ));
  }, []);

  if (maxValuesSet) {
    const renderInfoRow = ({
      Icon,
      label,
      value,
      currency,
    }: {
      Icon: React.FC<SvgProps>;
      label: string;
      value: string | number;
      currency: string | ReactNode;
    }) => {
      return (
        <View key={label} style={styles.infoRowContainer}>
          <Icon width={rem(24)} height={rem(24)} color={COLORS.primaryLight} />
          <Text style={styles.infoRowText}>
            {`${label.toLocaleUpperCase()}: `}
            <Text style={styles.infoRowValue}>
              {value} {currency}
            </Text>
          </Text>
        </View>
      );
    };

    return (
      <>
        {renderInfoRow({
          Icon: YearsOutlineIcon,
          label: t('staking.period_label'),
          value: preStakingSummary?.years ?? '',
          currency: t('global.years').toLowerCase(),
        })}

        {renderInfoRow({
          Icon: CoinsStackIcon,
          label: t('staking.balance_label'),
          value: preStakingSummary?.allocation ?? '',
          currency: <IceLabel reversed={isRTL} color={COLORS.primaryLight} />,
        })}
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
    paddingVertical: rem(8),
    paddingHorizontal: rem(10),
    minHeight: rem(50),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: rem(16),
    backgroundColor: COLORS.aliceBlue,
  },
  infoRowText: {
    marginLeft: rem(6),
    ...font(14, 16.8, 'medium', 'primaryLight'),
  },
  infoRowValue: {
    ...font(17, 20.4, 'bold', 'primaryLight'),
  },
});
