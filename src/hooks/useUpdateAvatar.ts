// SPDX-License-Identifier: ice License 1.0

import {CroppedImage} from '@hooks/useActionSheetUpdateAvatar';
import {AccountActions} from '@store/modules/Account/actions';
import {AnalyticsEventLogger} from '@store/modules/Analytics/constants';
import {isLoadingSelector} from '@store/modules/UtilityProcessStatuses/selectors';
import {getFilenameFromPath} from '@utils/file';
import {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';

export const useUpdateAvatar = () => {
  const dispatch = useDispatch();

  const updateAvatar = useCallback(
    (avatar: CroppedImage | null) => {
      const userInfo = avatar
        ? {
            profilePicture: {
              uri: avatar.path,
              name: getFilenameFromPath(avatar.path),
              type: avatar.mime,
            },
          }
        : {
            resetProfilePicture: true,
          };

      dispatch(AccountActions.UPDATE_ACCOUNT.START.create(userInfo));
      AnalyticsEventLogger.trackChangeProfilePicture();
    },
    [dispatch],
  );

  const updateAvatarLoading = useSelector(
    isLoadingSelector.bind(null, AccountActions.UPDATE_ACCOUNT),
  );

  return {
    updateAvatar,
    updateAvatarLoading,
  };
};
