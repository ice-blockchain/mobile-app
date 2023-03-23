// SPDX-License-Identifier: ice License 1.0

import {Badge} from '@components/Badge';
import {Touchable} from '@components/Touchable';
import {COLORS} from '@constants/colors';
import {LINKS} from '@constants/links';
import {MIDDLE_BUTTON_HIT_SLOP} from '@constants/styles';
import {HomeTabStackParamList, MainStackParamList} from '@navigation/Main';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {CandyBoxMenuIcon} from '@svg/CandyBoxMenuIcon';
import {ChatBubblesIcon} from '@svg/ChatBubblesIcon';
import {CoinsStackIcon} from '@svg/CoinsStackIcon';
import {StatsIcon} from '@svg/StatsIcon';
import {t} from '@translations/i18n';
import {openLinkWithInAppBrowser} from '@utils/device';
import React, {memo, useRef} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {rem, screenWidth} from 'rn-units';

export const MenuButton = memo(() => {
  const navigation =
    useNavigation<
      NativeStackNavigationProp<MainStackParamList & HomeTabStackParamList>
    >();

  // TODO: Hide until functionality is ready
  // const badgeCount = useSelector(notificationsCountSelector);
  const badgeCount = 0;

  const buttonRef = useRef<TouchableOpacity>(null);
  const onMenuPress = () => {
    buttonRef.current?.measure((_, __, width, height, x, y) => {
      navigation.navigate('ContextualMenu', {
        coords: {
          top: y + height + rem(16),
          right: screenWidth - x - rem(16),
        },
        buttons: [
          // TODO: Hide until functionality is ready
          //
          // import {BellIcon} from '@svg/BellIcon';
          //
          // {
          //   icon: <BellIcon color={COLORS.downriver} />,
          //   label: t('home.menu.notifications'),
          //   onPress: () => navigation.navigate('Notifications'),
          // },
          {
            icon: (
              <CoinsStackIcon
                width={rem(20)}
                height={rem(20)}
                color={COLORS.downriver}
              />
            ),
            label: t('home.menu.staking'),
            onPress: () => navigation.navigate('Staking'),
          },
          {
            icon: <StatsIcon color={COLORS.downriver} />,
            label: t('home.menu.stats'),
            onPress: () => navigation.navigate('Stats'),
          },
          {
            icon: <ChatBubblesIcon color={COLORS.downriver} />,
            label: t('home.menu.help'),
            onPress: () => {
              openLinkWithInAppBrowser({
                url: LINKS.KNOWLEDGE_BASE,
              });
            },
          },
        ],
      });
    });
  };

  return (
    <Touchable
      hitSlop={MIDDLE_BUTTON_HIT_SLOP}
      ref={buttonRef}
      onPress={onMenuPress}>
      <CandyBoxMenuIcon stroke={COLORS.downriver} />
      {badgeCount > 0 && (
        <Badge
          value={badgeCount >= 10 ? '9+' : `${badgeCount}`}
          style={styles.badge}
        />
      )}
    </Touchable>
  );
});

const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    top: -6,
    right: -5,
  },
});
