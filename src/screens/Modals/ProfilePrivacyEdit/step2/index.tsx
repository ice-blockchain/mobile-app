// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import {windowWidth} from '@constants/styles';
import {Images} from '@images';
import {MainNavigationParams} from '@navigation/Main';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {CancelButton} from '@screens/Modals/ProfilePrivacyEdit/components/CancelButton';
import {Description} from '@screens/Modals/ProfilePrivacyEdit/components/Description';
import {NextButton} from '@screens/Modals/ProfilePrivacyEdit/components/NextButton';
import {CurrentRoleCard} from '@screens/ProfileFlow/Profile/components/Role/components/CurrentRoleCard';
import {unsafeUserSelector} from '@store/modules/Account/selectors';
import {AchievementsSelectors} from '@store/modules/Achievements/selectors';
import {t} from '@translations/i18n';
import React from 'react';
import {ImageBackground, StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';
import {rem} from 'rn-units';

export const ProfilePrivacyEditStep2 = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<MainNavigationParams>>();

  const user = useSelector(unsafeUserSelector);

  const roleType = useSelector(
    AchievementsSelectors.getRoleTypeByUserId({userId: user.id}),
  );

  const goNext = () => {
    navigation.replace('ProfilePrivacyEditStep3');
  };

  return (
    <View style={styles.background}>
      <ImageBackground
        resizeMode={'contain'}
        style={styles.container}
        source={Images.backgrounds.privacyBgMiddle}>
        <Description
          style={styles.descriptionContainer}
          title={t('profile_privacy_edit.step2.title')}
          description={t('profile_privacy_edit.step2.description')}
        />
        <View style={styles.roleContainer}>
          <CurrentRoleCard
            imageSource={Images.roles[roleType]}
            imageSourceHidden={Images.roles[`${roleType}Inactive`]}
            title={t(`roles.${roleType}.title`)}
            description={t(`roles.${roleType}.subtitle`)}
            user={user}
            isProfilePrivacyEditMode
          />
        </View>
        <NextButton onPress={goNext} />
      </ImageBackground>
      <CancelButton style={styles.cancelButton} />
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: COLORS.transparentBackground,
  },
  container: {
    width: windowWidth,
    height: rem(461),
    paddingBottom: rem(40),
    marginTop: rem(100),
  },
  descriptionContainer: {
    marginTop: rem(120),
    paddingHorizontal: rem(78),
  },
  roleContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  cancelButton: {
    marginTop: rem(40),
  },
});
