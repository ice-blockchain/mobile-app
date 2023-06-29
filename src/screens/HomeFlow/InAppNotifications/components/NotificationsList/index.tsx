// SPDX-License-Identifier: ice License 1.0

import {Touchable} from '@components/Touchable';
import {COLORS} from '@constants/colors';
import {commonStyles, windowWidth} from '@constants/styles';
import {useScrollShadow} from '@hooks/useScrollShadow';
import {Header} from '@navigation/components/Header';
import {ClearButton} from '@navigation/components/Header/components/ClearButton';
import {DefaultNotification} from '@screens/HomeFlow/InAppNotifications/components/DefaultNotification';
import {EmptyNotifications} from '@screens/HomeFlow/InAppNotifications/components/EmptyNotifications';
import {Activity, ActivitySection} from '@services/getStream/types';
import {InAppNotificationActions} from '@store/modules/InAppNotifications/actions';
import {LinkingActions} from '@store/modules/Linking/actions';
import {ClearIcon} from '@svg/ClearIcon';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import React, {useCallback} from 'react';
import {
  Alert,
  Animated,
  SectionList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch} from 'react-redux';
import {rem} from 'rn-units';

export interface ActivityItemProps {
  activity: Activity;
  onPress: () => void;
}
interface NotificationsListProps {
  notifications: ActivitySection &
    {
      data: Activity[];
    }[];
  clearAllNotifications: () => void;
}

export const NotificationsList = ({
  notifications,
  clearAllNotifications,
}: NotificationsListProps) => {
  const {shadowStyle} = useScrollShadow();
  const dispatch = useDispatch();

  const renderHeader = useCallback(() => {
    return (
      <Header
        title={t('notifications.title')}
        renderRightButtons={() => {
          return notifications?.length > 0 ? (
            <ClearButton
              onPress={() => {
                Alert.alert(
                  t('notifications.clear_title'),
                  '',
                  [
                    {
                      text: t('button.clear'),
                      onPress: clearAllNotifications,
                    },
                    {
                      text: t('button.cancel'),
                      style: 'cancel',
                    },
                  ],
                  {
                    cancelable: true,
                  },
                );
              }}
            />
          ) : null;
        }}
        containerStyle={shadowStyle}
      />
    );
  }, [shadowStyle, clearAllNotifications, notifications]);

  const deleteAction = useCallback(
    (dragX: ReturnType<Animated.Value['interpolate']>, item: Activity) => {
      const trans = dragX.interpolate({
        inputRange: [0, 50, 100, 101],
        outputRange: [3, 0, 0, 1],
      });
      return (
        <Touchable
          style={styles.rightAction}
          onPress={() => {
            dispatch(
              InAppNotificationActions.REMOVE_IN_APP_NOTIFICATIONS.START.create(
                [item.id],
              ),
            );
          }}>
          <ClearIcon color={COLORS.white} />
          <Animated.Text
            style={[
              styles.actionText,
              {
                transform: [{translateX: trans}],
              },
            ]}>
            {t('notifications.delete')}
          </Animated.Text>
        </Touchable>
      );
    },
    [dispatch],
  );

  const handleNotificationPress = useCallback(
    (item: Activity) => {
      if (item.extra?.deeplink) {
        dispatch(LinkingActions.HANDLE_URL.STATE.create(item.extra?.deeplink));
      }
    },
    [dispatch],
  );

  const renderItem = useCallback(
    ({item}: {item: Activity}) => {
      if (!item) {
        return null;
      }

      return (
        <Swipeable
          renderRightActions={(
            _: ReturnType<Animated.Value['interpolate']>,
            dragX: ReturnType<Animated.Value['interpolate']>,
          ) => {
            return deleteAction(dragX, item);
          }}>
          <View style={styles.itemContainer}>
            <DefaultNotification
              activity={item}
              onPress={() => {
                handleNotificationPress(item);
              }}
            />
          </View>
        </Swipeable>
      );
    },
    [deleteAction, handleNotificationPress],
  );

  return (
    <>
      {renderHeader()}
      <SectionList<Activity, ActivitySection>
        style={styles.container}
        showsVerticalScrollIndicator={false}
        sections={notifications}
        renderItem={renderItem}
        stickySectionHeadersEnabled={false}
        renderSectionHeader={({section: {sectionTitle}}) => (
          <Text style={styles.sectionTitle}>{sectionTitle}</Text>
        )}
        ListEmptyComponent={<EmptyNotifications />}
      />
      {notifications?.length > 0 && (
        <LinearGradient
          pointerEvents="none"
          colors={[COLORS.transparent, COLORS.white]}
          style={styles.bottomGradient}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: windowWidth,
    marginTop: rem(15),
  },
  itemContainer: {
    backgroundColor: COLORS.white,
    marginVertical: rem(7),
    padding: rem(16),
    borderRadius: rem(16),
    flexDirection: 'row',
    marginHorizontal: rem(24),
    ...commonStyles.shadow,
    minHeight: rem(74),
  },
  rightAction: {
    backgroundColor: COLORS.attention,
    minWidth: rem(153),
    marginLeft: -rem(50),
    marginVertical: rem(7),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: rem(15),
  },
  sectionTitle: {
    width: windowWidth,
    ...font(12, 16, 'regular', 'secondary', 'center'),
    marginVertical: rem(9),
  },
  bottomGradient: {
    width: windowWidth,
    height: rem(85),
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  actionText: {
    ...font(14, 19, 'semibold', 'white'),
  },
});
