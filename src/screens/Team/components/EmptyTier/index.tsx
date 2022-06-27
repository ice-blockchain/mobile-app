// SPDX-License-Identifier: BUSL-1.1

import {PrimaryButton} from '@components/PrimaryButton';
import Text from '@components/Text';
import {FONTS} from '@constants/fonts';
import {useNavigation} from '@react-navigation/native';
import {TierType} from '@screens/Team/components/Tier';
import {translate} from '@translations/i18n';
import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {font, rem} from 'rn-units';

const icon = require('../../assets/teamTier2.png');

type EmptyTierProps = {
  type: TierType;
};

export function EmptyTier({type}: EmptyTierProps): React.ReactElement {
  const navigation = useNavigation();
  const handleOnPress = () => {
    navigation.navigate({key: 'Invite'});
  };

  return (
    <View style={styles.container}>
      <Image source={icon} style={styles.icon} />
      <Text style={styles.title}>
        <Text text="team.empty.title_part1" />
        <Text
          style={styles.boldTitle}
          text={
            type === TierType.tierOne ? 'team.tierOne_tab' : 'team.tierTwo_tab'
          }
        />
        <Text text="team.empty.title_part2" />
      </Text>
      <PrimaryButton
        text={translate('team.empty.button_title')}
        onPress={handleOnPress}
        style={styles.inviteButton}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  icon: {
    width: rem(200),
    height: rem(170),
    marginTop: rem(48),
  },
  title: {
    fontSize: font(14),
    fontFamily: FONTS.primary.regular,
    textAlign: 'center',
    marginHorizontal: 24,
    marginTop: rem(20),
    lineHeight: font(24),
  },
  boldTitle: {
    fontFamily: FONTS.primary.bold,
  },
  inviteButton: {
    marginTop: rem(35),
  },
});
