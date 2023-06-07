// SPDX-License-Identifier: ice License 1.0

import {Touchable} from '@components/Touchable';
import {COLORS} from '@constants/colors';
import {commonStyles, HIT_SLOP} from '@constants/styles';
import {useTopOffsetStyle} from '@navigation/hooks/useTopOffsetStyle';
import {MainStackParamList} from '@navigation/Main';
import {MaterialTopTabBar} from '@react-navigation/material-top-tabs';
import {MaterialTopTabBarProps} from '@react-navigation/material-top-tabs/lib/typescript/src/types';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {activeChatTabSelector} from '@store/modules/ActiveTab/selectors';
import {SearchIcon} from '@svg/SearchIcon';
import {WriteMessageIcon} from '@svg/WriteMessageIcon';
import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';
import {rem} from 'rn-units';

export const CHAT_TAB_BAR_PADDING = rem(16);

export function ChatTabBar(props: MaterialTopTabBarProps) {
  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackParamList>>();
  const topOffset = useTopOffsetStyle();

  const activeChatTab = useSelector(activeChatTabSelector);

  const onSearch = () => {
    navigation.navigate({
      name: 'MainTabs',
      params: {
        screen: 'ChatTab',
        params: {
          screen: activeChatTab === 'chatlist' ? 'ChatListTab' : 'ExploreTab',
          params: {searchVisible: true},
        },
      },
      merge: true,
    });
  };
  const onWriteMessage = () => {
    navigation.navigate('NewChatSelector');
  };

  return (
    <View style={[styles.container, topOffset.current]}>
      <View style={styles.body}>
        <View style={commonStyles.flexOne}>
          <MaterialTopTabBar {...props} />
        </View>
        <View style={styles.actionsContainer}>
          <Touchable hitSlop={HIT_SLOP} onPress={onSearch}>
            <SearchIcon color={COLORS.primaryDark} strokeWidth={2} />
          </Touchable>
          <Touchable
            hitSlop={HIT_SLOP}
            onPress={onWriteMessage}
            style={styles.writeMessageContainer}>
            <WriteMessageIcon color={COLORS.primaryDark} />
          </Touchable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
  },
  body: {
    marginBottom: -rem(4),
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionsContainer: {
    flexDirection: 'row',
    padding: CHAT_TAB_BAR_PADDING,
  },
  writeMessageContainer: {
    marginLeft: rem(24),
  },
});
