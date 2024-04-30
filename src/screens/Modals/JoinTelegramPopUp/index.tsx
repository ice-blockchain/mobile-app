// SPDX-License-Identifier: ice License 1.0

import {PopUpButton} from '@components/Buttons/PopUpButton';
import {CommonInput} from '@components/Inputs/CommonInput';
import {KeyboardAvoider} from '@components/KeyboardAvoider';
import {stopPropagation} from '@components/KeyboardDismiss';
import {COLORS} from '@constants/colors';
import {LINKS} from '@constants/links';
import {SCREEN_SIDE_OFFSET} from '@constants/styles';
import {Images} from '@images';
import {useNavigation} from '@react-navigation/native';
import {Message} from '@screens/Modals/PopUp/components/Message';
import {Title} from '@screens/Modals/PopUp/components/Title';
import {AchievementsActions} from '@store/modules/Achievements/actions';
import {ManIcon} from '@svg/ManIcon';
import {t} from '@translations/i18n';
import {openLinkWithInAppBrowser} from '@utils/device';
import React, {useEffect, useState} from 'react';
import {
  BackHandler,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {rem} from 'rn-units';

export const JoinTelegramPopUp = () => {
  const navigation = useNavigation();
  const [text, setText] = useState('@');
  const dispatch = useDispatch();

  const onPressOutside = () => {
    navigation.goBack();
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      /**
       * When true is returned the event will not be bubbled up
       * & no other back action will execute
       */
      () => true,
    );
    return () => backHandler.remove();
  }, []);

  const onChangeText = (inputText: string) => {
    if (inputText === '') {
      setText('@');
    } else if (!inputText.startsWith('@')) {
      setText(`@${inputText}`);
    } else {
      setText(inputText);
    }
  };

  const handleConfirmation = () => {
    const tgUsername = text.replace('@', '');
    dispatch(
      AchievementsActions.TASK_MARK_COMPLETED.TELEGRAM.create({
        telegramUserHandle: tgUsername,
      }),
    );
    openLinkWithInAppBrowser({
      url: LINKS.TELEGRAM_PROFILE_URL,
    });
    navigation.goBack();
  };

  return (
    <KeyboardAvoider>
      <TouchableWithoutFeedback onPress={onPressOutside}>
        <View style={styles.background}>
          <View style={styles.container} {...stopPropagation}>
            <Image
              resizeMode={'contain'}
              style={styles.image}
              source={Images.social.telegram}
            />
            <View style={styles.titleContainer}>
              <Title text={t('home.tasks.popup.title')} />
            </View>
            <Message text={t('home.tasks.popup.description')} />

            <CommonInput
              label={t('home.tasks.popup.placeholder')}
              onChangeText={onChangeText}
              icon={
                <ManIcon
                  color={COLORS.secondary}
                  width={rem(16)}
                  height={rem(16)}
                />
              }
              value={text}
              containerStyle={styles.textInputStyle}
            />

            <View style={styles.buttons}>
              <PopUpButton
                text={t('button.cancel')}
                preset="outlined"
                onPress={() => {
                  navigation.goBack();
                }}
              />
              <PopUpButton
                text={t('button.confirm')}
                onPress={handleConfirmation}
                disabled={text.length < 2}
              />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoider>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: COLORS.transparentBackground,
  },
  container: {
    marginHorizontal: SCREEN_SIDE_OFFSET,
    backgroundColor: COLORS.white,
    borderRadius: rem(20),
    paddingBottom: rem(25),
    paddingTop: rem(30),
    alignItems: 'center',
  },
  titleContainer: {
    paddingHorizontal: SCREEN_SIDE_OFFSET,
  },
  image: {
    width: rem(54),
    height: rem(54),
  },
  buttons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: rem(15),
    justifyContent: 'center',
  },
  textInputStyle: {
    marginHorizontal: rem(20),
    marginTop: rem(20),
  },
});
