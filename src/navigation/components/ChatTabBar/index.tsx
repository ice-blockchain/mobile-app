// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import {commonStyles, HIT_SLOP} from '@constants/styles';
import {useTopOffsetStyle} from '@navigation/hooks/useTopOffsetStyle';
import {MainStackParamList} from '@navigation/Main';
import {MaterialTopTabBar} from '@react-navigation/material-top-tabs';
import {MaterialTopTabBarProps} from '@react-navigation/material-top-tabs/lib/typescript/src/types';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ChatActions} from '@store/modules/Chat/actions';
import {SearchIcon} from '@svg/SearchIcon';
import {WriteMessageIcon} from '@svg/WriteMessageIcon';
import * as React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {rem} from 'rn-units';

export const CHAT_TAB_BAR_PADDING = rem(16);

export function ChatTabBar(props: MaterialTopTabBarProps) {
  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackParamList>>();
  const topOffset = useTopOffsetStyle();

  const dispatch = useDispatch();
  const onSearch = () => {
    dispatch(
      ChatActions.SET_MESSAGES_SEARCH_VISIBLE.STATE.create({
        visible: true,
      }),
    );
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
          <TouchableOpacity hitSlop={HIT_SLOP} onPress={onSearch}>
            <SearchIcon color={COLORS.primaryDark} strokeWidth={2} />
          </TouchableOpacity>
          <TouchableOpacity
            hitSlop={HIT_SLOP}
            onPress={onWriteMessage}
            style={styles.writeMessageContainer}>
            <WriteMessageIcon color={COLORS.primaryDark} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    overflow: 'visible',
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
