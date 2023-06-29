// SPDX-License-Identifier: ice License 1.0

import {PrimaryButton} from '@components/Buttons/PrimaryButton';
import {COLORS} from '@constants/colors';
import {SCREEN_SIDE_OFFSET} from '@constants/styles';
import {MainStackParamList} from '@navigation/Main';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import teamEmptyImage from '@screens/Team/assets/images/teamEmpty.png';
import {InviteIcon} from '@svg/InviteIcon';
import {replaceString, t, tagRegex} from '@translations/i18n';
import {font} from '@utils/styles';
import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {rem} from 'rn-units';

type Props = {
  title: string;
};

export function EmptyTier({title}: Props) {
  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackParamList>>();

  return (
    <View style={styles.container}>
      <Image
        source={teamEmptyImage}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.title}>
        {replaceString(
          t('team.empty.title'),
          tagRegex('title'),
          (match, index) => (
            <Text key={match + index} style={styles.boldTitle}>
              {title}
            </Text>
          ),
        )}
      </Text>
      <PrimaryButton
        text={t('team.empty.button_title')}
        onPress={() => navigation.navigate('InviteShare')}
        style={styles.button}
        textStyle={styles.buttonText}
        icon={
          <InviteIcon fill={COLORS.white} width={rem(24)} height={rem(24)} />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: rem(24),
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: rem(200),
    height: rem(170),
  },
  title: {
    marginHorizontal: SCREEN_SIDE_OFFSET,
    marginTop: rem(16),
    ...font(14, 24, 'regular', 'primaryDark', 'center'),
  },
  boldTitle: {
    ...font(14, 24, 'bold', 'primaryDark'),
  },
  buttonText: {
    ...font(14, 19, 'black', 'white'),
  },
  button: {
    marginTop: rem(16),
    width: rem(210),
    height: rem(44),
    borderRadius: rem(12),
  },
});
