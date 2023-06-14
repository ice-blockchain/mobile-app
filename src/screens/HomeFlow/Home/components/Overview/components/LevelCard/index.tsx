// SPDX-License-Identifier: ice License 1.0

import {AnimatedNumberText} from '@components/AnimatedNumberText';
import {IceLabel} from '@components/Labels/IceLabel';
import {COLORS} from '@constants/colors';
import {Images} from '@images';
import {
  CardBase,
  CardBaseSkeleton,
} from '@screens/HomeFlow/Home/components/Overview/components/CardBase';
import {userIdSelector} from '@store/modules/Account/selectors';
import {AchievementsSelectors} from '@store/modules/Achievements/selectors';
import {isSplashHiddenSelector} from '@store/modules/AppCommon/selectors';
import {userReferralCountSelector} from '@store/modules/Referrals/selectors';
import {globalRankSelector} from '@store/modules/Tokenomics/selectors';
import {PioneerIcon} from '@svg/PioneerIcon';
import {replaceString, t, tagRegex} from '@translations/i18n';
import {formatNumber} from '@utils/numbers';
import {font} from '@utils/styles';
import React, {forwardRef, Ref} from 'react';
import {
  LayoutChangeEvent,
  StyleSheet,
  Text,
  TextProps,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';
import {rem} from 'rn-units';

interface Props {
  isCollapsed: boolean;
  onLayout?: (event: LayoutChangeEvent) => void;
}

export const LevelCard = forwardRef(
  ({isCollapsed, onLayout}: Props, forwardedRef: Ref<View>) => {
    const userReferralCount = useSelector(userReferralCountSelector);
    const userId = useSelector(userIdSelector);
    const globalRank = useSelector(globalRankSelector(userId));
    const isSplashHidden = useSelector(isSplashHiddenSelector);

    const userLevel = useSelector(
      AchievementsSelectors.getLevelByUserId({userId}),
    );

    const roleType = useSelector(
      AchievementsSelectors.getRoleTypeByUserId({userId}),
    );

    if (!isSplashHidden) {
      return null;
    }

    if (globalRank == null) {
      return <CardBaseSkeleton />;
    }

    const header = ({style}: TextProps) => (
      <AnimatedNumberText
        style={style}
        value={userLevel}
        textDecorator={animatedUserLevel =>
          `${t('global.level')} ${formatNumber(animatedUserLevel)}`
        }
      />
    );

    return (
      <CardBase
        ref={forwardedRef}
        onLayout={onLayout}
        backgroundImageSource={Images.backgrounds.levelCardBg}
        headerTitle={t(`roles.${roleType}.title`).toUpperCase()}
        headerTitleIcon={<PioneerIcon fill={COLORS.white} />}
        HeaderValue={header}
        isCollapsed={isCollapsed}>
        <View style={styles.body}>
          <View style={styles.column}>
            <Text style={styles.labelText}>{t('home.pioneer.referrals')}</Text>
            <AnimatedNumberText
              value={userReferralCount}
              style={styles.valueText}
            />
          </View>
          <View style={styles.column}>
            {globalRank != null && (
              <>
                <Text style={styles.labelText}>{t('home.pioneer.rank')}</Text>
                <AnimatedNumberText
                  value={globalRank ?? 0}
                  style={styles.valueText}
                />
              </>
            )}
          </View>
        </View>
        <Text style={styles.noteText}>
          {replaceString(
            t('home.pioneer.description'),
            tagRegex('ice'),
            (match, index) => (
              <IceLabel key={match + index} iconSize={12} />
            ),
          )}
        </Text>
      </CardBase>
    );
  },
);

const styles = StyleSheet.create({
  body: {
    flexDirection: 'row',
    marginRight: rem(24),
    flexGrow: 1,
  },
  column: {
    paddingTop: rem(6),
    flex: 1,
  },
  labelText: {
    opacity: 0.5,
    ...font(10, 12, 'regular'),
  },
  valueText: {
    marginTop: rem(4),
    ...font(24, 29, 'bold'),
  },
  noteText: {
    marginTop: rem(6),
    marginBottom: rem(12),
    ...font(11, 13, 'regular'),
  },
});
