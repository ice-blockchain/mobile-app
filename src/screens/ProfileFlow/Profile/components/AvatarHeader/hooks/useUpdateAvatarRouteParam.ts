// SPDX-License-Identifier: ice License 1.0

import {MainNavigationParams} from '@navigation/Main';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useEffect} from 'react';

export const useUpdateAvatarRouteParams = (onUpdateAvatar: () => void) => {
  const route = useRoute<RouteProp<MainNavigationParams, 'UserProfile'>>();
  const navigation =
    useNavigation<NativeStackNavigationProp<MainNavigationParams>>();
  const {userId, actionType} = route.params ?? {};

  useEffect(() => {
    if (actionType === 'updatePhoto') {
      navigation.navigate({
        name: 'MyProfile',
        params: {
          actionType: undefined,
        },
        merge: true,
      });
      setTimeout(() => {
        onUpdateAvatar();
      }, 500);
    }
  }, [actionType, navigation, onUpdateAvatar, userId]);
};
