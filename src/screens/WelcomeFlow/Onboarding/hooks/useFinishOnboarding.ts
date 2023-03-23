// SPDX-License-Identifier: ice License 1.0

import {User} from '@api/user/types';
import {
  OnboardingSlide,
  onboardingSlides,
} from '@screens/WelcomeFlow/Onboarding/slides';
import {AccountActions} from '@store/modules/Account/actions';
import {userSelector} from '@store/modules/Account/selectors';
import {PermissionsActions} from '@store/modules/Permissions/actions';
import {canAskPermissionSelector} from '@store/modules/Permissions/selectors';
import {UsersActions} from '@store/modules/Users/actions';
import {
  isFinishedSelector,
  isLoadingSelector,
} from '@store/modules/UtilityProcessStatuses/selectors';
import {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

export const useFinishOnboarding = () => {
  const [slides, setSlides] = useState<OnboardingSlide[]>([]);

  const dispatch = useDispatch();
  const user = useSelector(userSelector) as User;

  const canAskNotificationPermission = useSelector(
    canAskPermissionSelector('pushNotifications'),
  );

  const loading = useSelector(
    isLoadingSelector.bind(null, AccountActions.UPDATE_ACCOUNT),
  );

  const permissionsAskFinished = useSelector(
    isFinishedSelector.bind(null, PermissionsActions.GET_PERMISSIONS),
  );

  const finishOnboarding = useCallback(() => {
    dispatch(UsersActions.UPDATE_VIEWED_ONBOARDINGS.STATE.create(user.id));
  }, [user.id, dispatch]);

  const getProgressPercentage = (currentPage: number) => {
    let progress = 0;
    if (currentPage === 0) {
      progress = 10;
    } else if (currentPage === slides.length - 1) {
      progress = 95;
    } else {
      progress = (currentPage / (slides.length - 1)) * 100;
    }

    return progress;
  };

  useEffect(() => {
    if (permissionsAskFinished) {
      finishOnboarding();
    }
  }, [permissionsAskFinished, finishOnboarding]);

  useEffect(() => {
    let slidesToShow: OnboardingSlide[] = [...onboardingSlides];
    if (!canAskNotificationPermission) {
      slidesToShow = slidesToShow.filter(slide => {
        return slide.key !== 'notifications';
      });
    }
    setSlides(slidesToShow);
  }, [canAskNotificationPermission]);

  return {
    finishOnboarding,
    loading,
    slides,
    getProgressPercentage,
  };
};
