// SPDX-License-Identifier: ice License 1.0

import {Badge} from '@components/Badge';
import {Touchable} from '@components/Touchable';
import {COLORS} from '@constants/colors';
import {LINKS} from '@constants/links';
import {MIDDLE_BUTTON_HIT_SLOP, windowWidth} from '@constants/styles';
import {HomeTabStackParamList, MainStackParamList} from '@navigation/Main';
import {navigate} from '@navigation/utils';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useMenuButtonWalkthrough} from '@screens/HomeFlow/Home/components/Header/components/hooks/useMenuButtonWalkthrough';
import {ContextualMenuButton} from '@screens/Modals/ContextualMenu/types';
import {CandyBoxMenuIcon} from '@svg/CandyBoxMenuIcon';
import {ChatBubblesIcon} from '@svg/ChatBubblesIcon';
import {CoinsStackIcon} from '@svg/CoinsStackIcon';
import {RocketIcon} from '@svg/RocketIcon';
import {StatsIcon} from '@svg/StatsIcon';
import {isRTL, t} from '@translations/i18n';
import {openLinkWithInAppBrowser} from '@utils/device';
import React, {memo, useMemo, useRef} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {rem} from 'rn-units';

export const MenuButton = memo(() => {
  const navigation =
    useNavigation<
      NativeStackNavigationProp<MainStackParamList & HomeTabStackParamList>
    >();

  const buttons: ContextualMenuButton[] = useMemo(() => {
    return [
      // TODO: Hide until notifications functionality is ready
      //
      // import {BellIcon} from '@svg/BellIcon';
      //
      // {
      //   icon: <BellIcon color={COLORS.downriver} />,
      //   label: t('home.menu.notifications'),
      //   onPress: () => navigation.navigate('InAppNotifications'),
      //   id: 'notifications',
      // },
      {
        id: 'staking',
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
        id: 'tips',
        icon: <RocketIcon color={COLORS.downriver} />,
        label: t('home.menu.tips'),
        onPress: () =>
          navigate({name: 'CreativeIceLibrary', params: undefined}),
      },
      {
        id: 'stats',
        icon: <StatsIcon color={COLORS.downriver} />,
        label: t('home.menu.stats'),
        onPress: () => navigation.navigate('Stats'),
      },
      {
        id: 'help',
        icon: <ChatBubblesIcon color={COLORS.downriver} />,
        label: t('home.menu.help'),
        onPress: () => {
          openLinkWithInAppBrowser({
            url: LINKS.KNOWLEDGE_BASE,
          });
        },
      },
    ];
  }, [navigation]);

  const {onElementLayout, elementRef} = useMenuButtonWalkthrough({buttons});

  // TODO: Hide until notifications functionality is ready
  // const badgeCount = useSelector(inAppNotificationsCountSelector);
  const badgeCount = 0;

  const buttonRef = useRef<TouchableOpacity>(null);
  const onMenuPress = () => {
    buttonRef.current?.measure((_, __, width, height, x, y) => {
      navigation.navigate('ContextualMenu', {
        coords: {
          top: y + height + rem(16),
          right: isRTL ? x : windowWidth - x - rem(16),
        },
        buttons,
      });
    });
  };

  return (
    <View ref={elementRef} onLayout={onElementLayout}>
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
    </View>
  );
});

const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    top: -6,
    right: -5,
  },
});
