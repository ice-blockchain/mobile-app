// SPDX-License-Identifier: ice License 1.0

import {User} from '@api/user/types';
import {isLiteTeam} from '@constants/featureFlags';
import {SCREEN_SIDE_OFFSET, windowWidth} from '@constants/styles';
import {MainNavigationParams} from '@navigation/Main';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {LadderItem} from '@screens/ProfileFlow/Profile/components/UserInfo/LadderBar/components/LadderItem';
import {
  isPrivacyInfoShownSelector,
  isTeamEnabledSelector,
  userSelector,
} from '@store/modules/Account/selectors';
import {AchievementsSelectors} from '@store/modules/Achievements/selectors';
import {globalRankSelector} from '@store/modules/Tokenomics/selectors';
import {t} from '@translations/i18n';
import React, {memo, useCallback} from 'react';
import {MeasureOnSuccessCallback, StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';

const LADDER_ITEMS_COUNT = 3;
const LADDER_WIDTH = windowWidth - SCREEN_SIDE_OFFSET * 2;
export const LADDER_ITEM_WIDTH = LADDER_WIDTH / LADDER_ITEMS_COUNT;

type Props = {
  isProfilePrivacyEditMode?: boolean;
  user: User;
};

export const LadderBar = memo(
  ({user, isProfilePrivacyEditMode = false}: Props) => {
    const navigation =
      useNavigation<NativeStackNavigationProp<MainNavigationParams>>();

    const authUser = useSelector(userSelector);
    const globalRank = useSelector(globalRankSelector(user.id));
    const isPrivacyInfoShown = useSelector(isPrivacyInfoShownSelector);
    const isTeamEnabled = useSelector(isTeamEnabledSelector);
    const hiddenElements = user.hiddenProfileElements || [];
    const refNumber =
      isLiteTeam && !isTeamEnabled
        ? user.t1ReferralCount ?? 0
        : (user.t1ReferralCount ?? 0) + (user.t2ReferralCount ?? 0);
    const achievements = useSelector(
      AchievementsSelectors.getAchievementsByUserId({userId: user.id}),
    );
    const isOwner = user?.id === authUser?.id;

    const onShowReferralInfo: MeasureOnSuccessCallback = useCallback(
      (x, y, width, height, pageX, pageY) => {
        navigation.navigate('ReferralCountInfo', {
          hostViewParams: {
            x,
            y,
            width,
            height,
            pageX,
            pageY,
          },
          userId: user.id,
        });
      },
      [navigation, user.id],
    );

    return (
      <View style={styles.ladder}>
        <LadderItem
          title={t('profile.global_rank').toUpperCase()}
          value={globalRank ?? 0}
          enabled={isProfilePrivacyEditMode}
          isProfilePrivacyEditMode={isProfilePrivacyEditMode}
          privacyType="globalRank"
          hidden={
            isOwner
              ? hiddenElements.includes('globalRank') &&
                (!isPrivacyInfoShown || isProfilePrivacyEditMode)
              : hiddenElements.includes('globalRank')
          }
        />
        <LadderItem
          title={t('global.referrals').toUpperCase()}
          enabled={isProfilePrivacyEditMode}
          value={refNumber}
          isProfilePrivacyEditMode={isProfilePrivacyEditMode}
          privacyType="referralCount"
          hidden={
            isOwner
              ? hiddenElements.includes('referralCount') &&
                (!isPrivacyInfoShown || isProfilePrivacyEditMode)
              : hiddenElements.includes('referralCount')
          }
          onShowInfo={isLiteTeam ? undefined : onShowReferralInfo}
        />
        <LadderItem
          title={t('global.level').toUpperCase()}
          value={achievements?.levelsAndRoles?.level ?? 0}
          enabled={isProfilePrivacyEditMode}
          isProfilePrivacyEditMode={isProfilePrivacyEditMode}
          privacyType="level"
          hidden={
            isOwner
              ? hiddenElements.includes('level') &&
                (!isPrivacyInfoShown || isProfilePrivacyEditMode)
              : hiddenElements.includes('level')
          }
        />
      </View>
    );
  },
);

const styles = StyleSheet.create({
  ladder: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});
