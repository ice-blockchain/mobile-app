// SPDX-License-Identifier: BUSL-1.1

import {Avatar} from '@components/Avatar';
import {Switch} from '@components/Switch';
import {COLORS} from '@constants/colors';
import {commonStyles} from '@constants/styles';
import {Header} from '@navigation/components/Header';
import {LangButton} from '@navigation/components/Header/components/LangButton';
import {useBottomTabBarOffsetStyle} from '@navigation/hooks/useBottomTabBarOffsetStyle';
import {useFocusStatusBar} from '@navigation/hooks/useFocusStatusBar';
import {MainStackParamList} from '@navigation/Main';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  DEFAULT_CONFIRM_NO_BUTTON,
  DEFAULT_CONFIRM_YES_BUTTON,
} from '@screens/Dialogs/Confirm';
import React, {memo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {rem} from 'rn-units';

export const Notifications = memo(() => {
  useFocusStatusBar({style: 'light-content'});
  const bottomOffset = useBottomTabBarOffsetStyle();
  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackParamList>>();
  const [value, setValue] = useState(false);

  return (
    <View style={styles.container}>
      <Header
        color={COLORS.white}
        title={'Notifications'}
        titlePreset={'small'}
        renderRightButtons={LangButton}
      />
      <View
        style={[styles.card, commonStyles.baseSubScreen, bottomOffset.current]}>
        <Avatar
          showPen
          uri="https://media.istockphoto.com/photos/millennial-male-team-leader-organize-virtual-workshop-with-employees-picture-id1300972574?b=1&k=20&m=1300972574&s=170667a&w=0&h=2nBGC7tr0kWIU8zRQ3dMg-C5JLo9H2sNUuDjQ5mlYfo="
          style={styles.avatar}
        />
        <View style={styles.body}>
          <Switch
            value={value}
            onValueChange={v => {
              setValue(v);
              navigation.navigate('Confirm', {
                title: 'Notifications',
                subtitle:
                  'Notifications are not allowed. Do you want to enable them?',
                buttons: [
                  {
                    ...DEFAULT_CONFIRM_YES_BUTTON,
                    onPress: () => console.log('confirm'),
                  },
                  DEFAULT_CONFIRM_NO_BUTTON,
                ],
              });
            }}
          />
        </View>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.persianBlue,
  },
  card: {
    marginTop: rem(80),
  },
  avatar: {
    position: 'absolute',
    top: -rem(43),
    left: '50%',
    marginLeft: -rem(43),
  },
  body: {
    alignItems: 'center',
    marginHorizontal: rem(50),
    flex: 1,
    marginTop: rem(55),
  },
});
