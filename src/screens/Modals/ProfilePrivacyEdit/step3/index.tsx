// SPDX-License-Identifier: ice License 1.0

import {User} from '@api/user/types';
import {COLORS} from '@constants/colors';
import {Images} from '@images';
import {useNavigation} from '@react-navigation/native';
import {CancelButton} from '@screens/Modals/ProfilePrivacyEdit/components/CancelButton';
import {Description} from '@screens/Modals/ProfilePrivacyEdit/components/Description';
import {NextButton} from '@screens/Modals/ProfilePrivacyEdit/components/NextButton';
import {BadgeSummariesList} from '@screens/ProfileFlow/Profile/components/Badges/components/BadgeSummariesList';
import {userSelector} from '@store/modules/Account/selectors';
import {AchievementsSelectors} from '@store/modules/Achievements/selectors';
import {t} from '@translations/i18n';
import React from 'react';
import {ImageBackground, StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';
import {rem, screenWidth} from 'rn-units';

export const ProfilePrivacyEditStep3 = () => {
  const navigation = useNavigation();
  const authUser = useSelector(userSelector) as User;
  const badgesSummary = useSelector(
    AchievementsSelectors.getBadgesSummary({userId: authUser.id}),
  );

  return (
    <View style={styles.background}>
      <CancelButton style={styles.cancelButton} />
      <ImageBackground
        resizeMode={'contain'}
        style={styles.container}
        source={Images.backgrounds.privacyBgBottom}>
        <Description
          style={styles.descriptionContainer}
          title={t('profile_privacy_edit.step3.title')}
          description={t('profile_privacy_edit.step3.description')}
        />
        <View style={styles.badgesContainer}>
          <BadgeSummariesList
            isProfilePrivacyEditMode
            loading={false}
            data={badgesSummary}
          />
        </View>
        <NextButton
          text={t('button.finish')}
          style={styles.finishButton}
          onPress={navigation.goBack}
        />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: COLORS.transparentBackground,
    justifyContent: 'space-between',
  },
  container: {
    width: screenWidth,
    height: rem(565),
  },
  badgesContainer: {
    marginTop: rem(44),
    height: rem(210),
    marginBottom: rem(40),
  },
  descriptionContainer: {
    marginTop: rem(50),
  },
  cancelButton: {
    marginTop: rem(140),
  },
  finishButton: {
    marginBottom: rem(72),
  },
});
