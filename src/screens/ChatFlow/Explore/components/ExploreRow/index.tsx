// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import {MainStackParamList} from '@navigation/Main';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ChatTabRow} from '@screens/ChatFlow/components/ChatTabRow';
import {ExploreData} from '@store/modules/Chats/types';
import {ChevronIcon} from '@svg/ChevronIcon';
import {MembersIcon} from '@svg/MembersIcon';
import {t} from '@translations/i18n';
import {formatNumber} from '@utils/numbers';
import * as React from 'react';
import {useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import {rem} from 'rn-units';

type Props = {
  exploreData: ExploreData;
  headerMode?: boolean;
};

function getSubtitle({exploreData, headerMode}: Props) {
  const membersNumberString = formatNumber(exploreData.membersNumber);
  if (!exploreData.isSubscribed || headerMode) {
    return membersNumberString;
  }

  return `${membersNumberString} (${t('chat.explore.subscribed_indicator')})`;
}

export function ExploreRow({exploreData, headerMode}: Props) {
  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackParamList>>();
  const onPress = useCallback(() => {
    if (exploreData.type === 'channel') {
      navigation.navigate('Channel', {channelData: exploreData});
    }
  }, [navigation, exploreData]);
  return (
    <ChatTabRow
      onPress={onPress}
      icon={exploreData.icon}
      title={exploreData.displayName}
      sourceType={exploreData.type}
      subtitle={getSubtitle({
        exploreData,
        headerMode,
      })}
      subtitleIcon={
        <View style={styles.iconContainer}>
          <MembersIcon />
        </View>
      }
      isVerified={exploreData.isVerified}
      rightComponent={
        headerMode ? null : <ChevronIcon color={COLORS.secondary} />
      }
    />
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    paddingTop: rem(2),
    paddingRight: rem(4),
  },
});
