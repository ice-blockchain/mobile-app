// SPDX-License-Identifier: ice License 1.0

import {BackButton} from '@components/BackButton';
import {PrivacyTerms} from '@components/PrivacyTerms';
import {Touchable} from '@components/Touchable';
import {COLORS} from '@constants/colors';
import {MIDDLE_BUTTON_HIT_SLOP, SCREEN_SIDE_OFFSET} from '@constants/styles';
import {AuthStackParamList} from '@navigation/Auth';
import {useBottomOffsetStyle} from '@navigation/hooks/useBottomOffsetStyle';
import {useFocusStatusBar} from '@navigation/hooks/useFocusStatusBar';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Header} from '@screens/AuthFlow/ConfirmEmailLink/components/Header';
import {BackButtonIcon} from '@svg/BackButtonIcon';
import {PenWithFrameIcon} from '@svg/PenWithFrameIcon';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {rem} from 'rn-units';

export const ResetPasswordLink = () => {
  useFocusStatusBar({style: 'light-content'});

  const bottomOffsetStyle = useBottomOffsetStyle();

  const {params} =
    useRoute<RouteProp<AuthStackParamList, 'ResetPasswordLink'>>();

  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParamList>>();

  const goBack = () => {
    navigation.navigate('SignIn', {flow: 'main'});
  };

  return (
    <View style={[styles.container, bottomOffsetStyle.current]}>
      <Header />
      <BackButton onPress={goBack} />
      <View style={styles.body}>
        <View>
          <Text style={styles.descriptionText}>
            {t('confirm_email.emailed_steps_to')}
          </Text>
          <View style={styles.email}>
            <Text style={styles.emailText} numberOfLines={1}>
              {params.email}
            </Text>
            <Touchable hitSlop={MIDDLE_BUTTON_HIT_SLOP} onPress={goBack}>
              <PenWithFrameIcon
                width={rem(14)}
                height={rem(14)}
                style={styles.emailIcon}
              />
            </Touchable>
          </View>
        </View>
        <Text style={styles.instructionText}>
          {t('confirm_email.reset_link_instruction')}
        </Text>
        <Touchable
          hitSlop={MIDDLE_BUTTON_HIT_SLOP}
          onPress={goBack}
          style={styles.backBodyButton}>
          <BackButtonIcon
            color={COLORS.primaryDark}
            width={rem(14)}
            height={rem(12)}
          />
          <Text style={styles.backBodyButtonText}>
            {t('button.back_to_login')}
          </Text>
        </Touchable>
        <PrivacyTerms containerStyle={styles.privacy} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  descriptionText: {
    marginTop: rem(24),
    marginHorizontal: rem(12),
    textAlign: 'center',
    ...font(16, 26, 'medium', 'secondary'),
  },
  email: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emailText: {
    textAlign: 'center',
    ...font(16, 26, 'black', 'secondary'),
  },
  emailIcon: {
    marginLeft: rem(14),
  },
  instructionText: {
    textAlign: 'center',
    ...font(16, 26, 'medium', 'secondary'),
    marginHorizontal: SCREEN_SIDE_OFFSET,
    alignSelf: 'center',
  },
  backBodyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  privacy: {
    flex: 0,
    marginBottom: rem(20),
  },
  backBodyButtonText: {
    ...font(15, 18, 'medium', 'primaryDark'),
    marginLeft: rem(12),
  },
});
