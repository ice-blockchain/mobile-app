// SPDX-License-Identifier: ice License 1.0

import {PrimaryButton} from '@components/Buttons/PrimaryButton';
import {IceLabel} from '@components/Labels/IceLabel';
import {FinalizeRegistrationStep} from '@screens/Templates/FinalizeRegistrationStep';
import {BigHeader} from '@screens/Templates/FinalizeRegistrationStep/components/BigHeader';
import {CurrentBalance} from '@screens/WelcomeFlow/IceBonus/components/CurrentBalance';
import {useIceBonus} from '@screens/WelcomeFlow/IceBonus/hooks/useIceBonus';
import {replaceString, t, tagRegex} from '@translations/i18n';
import {font} from '@utils/styles';
import React, {useMemo} from 'react';
import {StyleSheet, Text} from 'react-native';
import {isAndroid, rem} from 'rn-units';

export const IceBonus = () => {
  const {currentBalance, loading, onSubmit} = useIceBonus();

  const description = useMemo(() => {
    let text = null;

    text = replaceString(
      t('ice_bonus.description'),
      tagRegex('ice'),
      (match, index) => (
        <IceLabel
          key={match + index}
          iconSize={18}
          iconOffsetY={isAndroid ? 4 : 3}
        />
      ),
    );

    text = replaceString(text, tagRegex('value'), () => currentBalance);

    text = replaceString(text, tagRegex('bold', false), (match, index) => (
      <Text key={match + index} style={styles.markedDescription}>
        {match}
      </Text>
    ));

    return text;
  }, [currentBalance]);

  return (
    <FinalizeRegistrationStep
      title={t('ice_bonus.title')}
      header={
        <BigHeader
          title={t('ice_bonus.title')}
          description={description}
          progressPercentage={90}
          containerStyle={styles.bigHeader}
          titleStyle={styles.title}
          descriptionStyle={styles.description}
        />
      }
      imageSource={require('./assets/images/ice-bonus.png')}
      info={<CurrentBalance value={currentBalance} />}
      button={
        <PrimaryButton
          text={t('button.complete')}
          onPress={onSubmit}
          loading={loading}
        />
      }
    />
  );
};

const styles = StyleSheet.create({
  bigHeader: {
    marginBottom: rem(36),
  },
  markedDescription: {
    ...font(14, 19, 'bold', 'wildSand'),
  },
  title: {
    width: rem(250),
  },
  description: {
    width: rem(244),
  },
});
