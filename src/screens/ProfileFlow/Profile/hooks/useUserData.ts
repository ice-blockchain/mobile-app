// SPDX-License-Identifier: ice License 1.0

import {MainStackParamList} from '@navigation/Main';
import {RouteProp, useRoute} from '@react-navigation/native';
import {userIdSelector, userSelector} from '@store/modules/Account/selectors';
import {UsersActions} from '@store/modules/Users/actions';
import {userByIdSelector} from '@store/modules/Users/selectors';
import {isLoadingSelector} from '@store/modules/UtilityProcessStatuses/selectors';
import {useSelector} from 'react-redux';

export const useUserData = () => {
  const authUserId = useSelector(userIdSelector);
  const route = useRoute<RouteProp<MainStackParamList, 'UserProfile'>>();
  const isOwner = !route.params || route.params.userId === authUserId;
  const userId = isOwner ? authUserId : route.params?.userId;

  const user = useSelector(
    isOwner ? userSelector : userByIdSelector(route.params.userId),
  );

  const isUserLoading = useSelector(
    isLoadingSelector.bind(null, UsersActions.GET_USER_BY_ID),
  );

  return {
    userId,
    isOwner,
    user,
    isUserLoading,
  };
};
