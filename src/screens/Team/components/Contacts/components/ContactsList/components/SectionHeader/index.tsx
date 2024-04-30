// SPDX-License-Identifier: ice License 1.0

import {IceLabel} from '@components/Labels/IceLabel';
import {COLORS} from '@constants/colors';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import React, {ReactNode} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {isAndroid, rem} from 'rn-units';

export const IceFriendsTitle = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>
        <IceLabel
          color={COLORS.primaryLight}
          iconSize={21}
          textStyle={styles.iceText}
          iconOffsetY={isAndroid ? 4 : 3}
        />{' '}
        {t('team.contacts_list.ice_header.friends')}
      </Text>
    </View>
  );
};

type SectionHeaderProps = {
  title?: string | ReactNode;
};

export const SectionHeader = ({title}: SectionHeaderProps) => {
  if (!title) {
    return null;
  }
  return (
    <View style={styles.titleContainer}>
      {typeof title === 'string' ? (
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
        </View>
      ) : (
        title
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    backgroundColor: COLORS.white,
  },
  title: {
    paddingBottom: rem(6),
    marginBottom: rem(10),
    ...font(14, 19, 'semibold', 'primaryDark'),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: rem(10),
  },
  iceText: {
    ...font(14, 19, 'heavy', 'primaryDark'),
  },
});
