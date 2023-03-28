// SPDX-License-Identifier: ice License 1.0

import {User} from '@api/user/types';
import {LadderItem} from '@screens/ProfileFlow/Profile/components/LadderBar/components/LadderItem';
import {isPrivacyInfoShownSelector} from '@store/modules/Account/selectors';
import {AchievementsSelectors} from '@store/modules/Achievements/selectors';
import {globalRankSelector} from '@store/modules/Tokenomics/selectors';
import {t} from '@translations/i18n';
import {formatNumber} from '@utils/numbers';
import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';
import {rem} from 'rn-units';

type Props = {
  isProfilePrivacyEditMode?: boolean;
  user: User;
};

export const LadderBar = memo(
  ({user, isProfilePrivacyEditMode = false}: Props) => {
    const globalRank = useSelector(globalRankSelector(user.id));
    const isPrivacyInfoShown = useSelector(isPrivacyInfoShownSelector);
    const hiddenElements = user.hiddenProfileElements || [];
    const refNumber = (user.t1ReferralCount ?? 0) + (user.t2ReferralCount ?? 0);
    const achievements = useSelector(
      AchievementsSelectors.getAchievementsByUserId({userId: user.id}),
    );

    return (
      <View style={styles.ladder}>
        <LadderItem
          title={t('profile.global_rank').toUpperCase()}
          value={globalRank != null ? formatNumber(globalRank) : '1'}
          enabled={isProfilePrivacyEditMode}
          isProfilePrivacyEditMode={isProfilePrivacyEditMode}
          privacyType="globalRank"
          hidden={hiddenElements.includes('globalRank') && !isPrivacyInfoShown}
        />
        <LadderItem
          title={t('global.referrals').toUpperCase()}
          enabled={isProfilePrivacyEditMode}
          value={formatNumber(refNumber)}
          isProfilePrivacyEditMode={isProfilePrivacyEditMode}
          privacyType="referralCount"
          hidden={
            hiddenElements.includes('referralCount') && !isPrivacyInfoShown
          }
        />
        <LadderItem
          title={t('global.level').toUpperCase()}
          value={achievements ? `${achievements.levelsAndRoles?.level}` : ''}
          enabled={isProfilePrivacyEditMode}
          isProfilePrivacyEditMode={isProfilePrivacyEditMode}
          privacyType="level"
          hidden={hiddenElements.includes('level') && !isPrivacyInfoShown}
        />
      </View>
    );
  },
);

const styles = StyleSheet.create({
  ladder: {
    flexDirection: 'row',
    paddingHorizontal: rem(32),
    justifyContent: 'space-between',
  },
});
