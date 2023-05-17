// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import {ChatTabRow} from '@screens/ChatFlow/components/ChatTabRow';
import {ExploreData} from '@store/modules/Chat/types';
import {ChevronIcon} from '@svg/ChevronIcon';
import {MembersIcon} from '@svg/MembersIcon';
import {t} from '@translations/i18n';
import {formatNumber} from '@utils/numbers';
import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {rem} from 'rn-units';

type Props = {
  exploreData: ExploreData;
};

function getSubtitle(exploreData: ExploreData) {
  const membersNumberString = formatNumber(exploreData.membersNumber);
  if (!exploreData.isSubscribed) {
    return membersNumberString;
  }

  return `${membersNumberString} (${t('chat.explore.subscribed_indicator')})`;
}

export function ExploreRow({exploreData}: Props) {
  return (
    <ChatTabRow
      icon={exploreData.icon}
      title={exploreData.displayName}
      sourceType={exploreData.type}
      subtitle={getSubtitle(exploreData)}
      subtitleIcon={
        <View style={styles.iconContainer}>
          <MembersIcon />
        </View>
      }
      isVerified={exploreData.isVerified}
      rightComponent={<ChevronIcon color={COLORS.secondary} />}
    />
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    paddingTop: rem(2),
    paddingRight: rem(4),
  },
});
