// SPDX-License-Identifier: ice License 1.0

import {TaskType} from '@api/tasks/types';
import {LINKS} from '@constants/links';
import {MainNavigationParams} from '@navigation/Main';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {TASKS} from '@screens/HomeFlow/Home/components/Tasks/tasks';
import {logError} from '@services/logging';
import {userIdSelector} from '@store/modules/Account/selectors';
import {AchievementsActions} from '@store/modules/Achievements/actions';
import {TokenomicsActions} from '@store/modules/Tokenomics/actions';
import {t} from '@translations/i18n';
import {openLinkWithInAppBrowser} from '@utils/device';
import {useCallback} from 'react';
import {Linking} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

export function useTaskItem(type: TaskType) {
  const navigation =
    useNavigation<NativeStackNavigationProp<MainNavigationParams>>();

  const userId = useSelector(userIdSelector);
  const dispatch = useDispatch();

  const onPress = useCallback(() => {
    switch (type) {
      case 'start_mining':
        dispatch(TokenomicsActions.START_MINING_SESSION.START.create());
        break;
      case 'upload_profile_picture':
        navigation.navigate('ProfileTab', {
          screen: 'MyProfile',
          params: {actionType: 'updatePhoto', userId: userId},
        });
        break;
      case 'follow_us_on_twitter':
        Linking.canOpenURL(LINKS.TWITTER_SCHEME)
          .then(supported => {
            dispatch(AchievementsActions.TASK_MARK_COMPLETED.TWITTER.create());
            if (supported) {
              return Linking.openURL(LINKS.TWITTER_APP_URL);
            } else {
              openLinkWithInAppBrowser({
                url: LINKS.TWITTER_PROFILE_URL,
              });
            }
          })
          .catch(logError);
        break;
      case 'join_telegram':
        navigation.navigate('JoinTelegramPopUp');
        break;
      case 'invite_friends':
        navigation.navigate('InviteShare');
        break;
    }
  }, [type, dispatch, navigation, userId]);

  return {
    title: t(`home.tasks.${type}.title`),
    description: t(`home.tasks.${type}.description`),
    iconBgColor: TASKS[type].iconBgColor,
    activeBgColor: TASKS[type].activeBgColor,
    onPress,
  };
}
