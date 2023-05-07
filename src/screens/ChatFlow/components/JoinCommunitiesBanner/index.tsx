// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import {JoinCommunitiesBackgroundIcon} from '@svg/JoinCommunitiesBackgroundIcon';
import {JoinCommunitiesIcon} from '@svg/JoinCommunitiesIcon';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {rem} from 'rn-units';

type Props = {
  isDark?: boolean;
};

export function JoinCommunitiesBanner({isDark}: Props) {
  return (
    <View style={[styles.container, isDark && styles.darkContainer]}>
      {isDark ? (
        <View style={styles.darkImageContainer}>
          <JoinCommunitiesIcon color={COLORS.primaryLight} />
        </View>
      ) : (
        <View style={styles.imageContainer}>
          <JoinCommunitiesIcon />
        </View>
      )}
      <View style={styles.messageContainer}>
        <Text style={[styles.title, isDark && styles.darkModeTextColor]}>
          {t('chat.messages.banner.title')}
        </Text>
        <Text style={[styles.subtitle, isDark && styles.darkModeTextColor]}>
          {t('chat.messages.banner.subtitle')}
        </Text>
      </View>
      {isDark ? (
        <View style={styles.backgroundIconContainer}>
          <JoinCommunitiesBackgroundIcon />
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: rem(16),
    backgroundColor: COLORS.white,
  },
  darkContainer: {
    backgroundColor: COLORS.primaryLight,
    borderRadius: 15,
  },
  messageContainer: {
    flex: 1,
    paddingLeft: rem(12),
  },
  title: {
    ...font(15, 18, 'black', 'primaryDark'),
  },
  subtitle: {
    paddingTop: rem(4),
    ...font(12, 14, 'medium', 'secondary'),
  },
  imageContainer: {
    width: rem(46),
    height: rem(46),
    borderRadius: 15,
    backgroundColor: COLORS.primaryDark,
    justifyContent: 'center',
    alignItems: 'center',
  },
  darkImageContainer: {
    width: rem(36),
    height: rem(36),
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    margin: rem(14),
    marginRight: 0,
  },
  darkModeTextColor: {
    color: COLORS.white,
  },
  backgroundIconContainer: {
    position: 'absolute',
    right: rem(8),
    top: rem(2),
  },
});
