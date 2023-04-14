// SPDX-License-Identifier: ice License 1.0

import {AchievementsActions} from '@store/modules/Achievements/actions';
import {TokenomicsActions} from '@store/modules/Tokenomics/actions';
import {UsersActions} from '@store/modules/Users/actions';
import {isLoadingSelector} from '@store/modules/UtilityProcessStatuses/selectors';
import {hapticFeedback} from '@utils/device';
import {useCallback, useRef} from 'react';
import {
  interpolate,
  runOnJS,
  SharedValue,
  useAnimatedReaction,
  useDerivedValue,
} from 'react-native-reanimated';
import {useDispatch, useSelector} from 'react-redux';

type Props = {
  animatedIndex: SharedValue<number>;
  userId: string;
  isOwner: boolean;
};

export const useOnRefresh = ({animatedIndex, userId, isOwner}: Props) => {
  const dispatch = useDispatch();

  const refreshingUserById = useSelector(
    isLoadingSelector.bind(null, UsersActions.GET_USER_BY_ID),
  );

  const refreshingUserAchievements = useSelector(
    isLoadingSelector.bind(null, AchievementsActions.USER_ACHIEVEMENTS_LOAD),
  );

  const refreshingSummary = useSelector(
    isLoadingSelector.bind(null, TokenomicsActions.GET_RANKING_SUMMARY),
  );

  const refreshing =
    refreshingUserById || refreshingUserAchievements || refreshingSummary;

  const onRefresh = useCallback(() => {
    if (!refreshing) {
      dispatch(UsersActions.GET_USER_BY_ID.START.create(userId));
      dispatch(AchievementsActions.USER_ACHIEVEMENTS_LOAD.START.create(userId));
      if (!isOwner) {
        dispatch(
          TokenomicsActions.GET_RANKING_SUMMARY.START.create({
            userId,
          }),
        );
      }
    }
  }, [dispatch, isOwner, userId, refreshing]);

  const canBeActivatedRef = useRef(false);
  const hapticOnRefresh = () => {
    if (canBeActivatedRef.current) {
      hapticFeedback();
      onRefresh();
      canBeActivatedRef.current = false;
    }
  };

  const resetHapticOnRefresh = () => {
    canBeActivatedRef.current = true;
  };

  const translateY = useDerivedValue(() =>
    interpolate(animatedIndex.value, [0, 0.1], [0, 100]),
  );

  useAnimatedReaction(
    () => {
      return animatedIndex.value <= -0.18;
    },
    (result, previousResult) => {
      if (result && result !== previousResult) {
        runOnJS(hapticOnRefresh)();
      }
    },
    [animatedIndex],
  );

  useAnimatedReaction(
    () => {
      return animatedIndex.value <= -0.05 && animatedIndex.value >= -0.1;
    },
    reset => {
      if (reset) {
        runOnJS(resetHapticOnRefresh)();
      }
    },
    [animatedIndex],
  );

  return {onRefresh, refreshing, translateY};
};
