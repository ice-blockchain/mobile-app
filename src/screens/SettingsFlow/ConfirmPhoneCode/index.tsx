// SPDX-License-Identifier: BUSL-1.1

import {Avatar} from '@components/Avatar';
import {CommonInput} from '@components/CommonInput';
import {KeyboardDismiss, stopPropagination} from '@components/KeyboardDismiss';
import {COLORS} from '@constants/colors';
import {FONTS} from '@constants/fonts';
import {commonStyles} from '@constants/styles';
import {Images} from '@images';
import {Header} from '@navigation/components/Header';
import {LangButton} from '@navigation/components/Header/components/LangButton';
import {useBottomTabBarOffsetStyle} from '@navigation/hooks/useBottomTabBarOffsetStyle';
import {useFocusStatusBar} from '@navigation/hooks/useFocusStatusBar';
import {TicketIconSvg} from '@svg/Ticket';
import {t} from '@translations/i18n';
import React, {memo} from 'react';
import {
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {font, isIOS, rem} from 'rn-units';

export const ConfirmPhoneCode = memo(() => {
  useFocusStatusBar({style: 'light-content'});
  const bottomOffset = useBottomTabBarOffsetStyle();

  return (
    <KeyboardDismiss>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={isIOS ? 'padding' : undefined}>
        <Header
          color={COLORS.white}
          title={t('personal_information.title')}
          titlePreset={'small'}
          renderRightButtons={LangButton}
        />
        <View
          style={[
            styles.card,
            commonStyles.baseSubScreen,
            bottomOffset.current,
          ]}>
          <Avatar
            showPen
            uri="https://media.istockphoto.com/photos/millennial-male-team-leader-organize-virtual-workshop-with-employees-picture-id1300972574?b=1&k=20&m=1300972574&s=170667a&w=0&h=2nBGC7tr0kWIU8zRQ3dMg-C5JLo9H2sNUuDjQ5mlYfo="
            style={styles.avatar}
          />
          <View style={styles.body}>
            <View style={styles.imageWrapper}>
              <Image
                source={Images.phone.confirmPhone}
                style={styles.image}
                resizeMode={'contain'}
              />
            </View>
            <View>
              <Text style={styles.titleText}>
                {t('team.confirm_code.title')}
              </Text>
              <Text style={styles.noteText}>
                {t('team.confirm_code.description')}
              </Text>
              <View style={styles.controlWrapper} {...stopPropagination}>
                <CommonInput
                  icon={<TicketIconSvg />}
                  placeholder={t('team.confirm_code.placeholder')}
                />
                <TouchableOpacity style={styles.button} onPress={() => {}}>
                  <Text style={styles.buttonText}>
                    {t('team.confirm_code.button')}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </KeyboardDismiss>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.persianBlue,
  },
  card: {
    marginTop: rem(80),
  },
  avatar: {
    position: 'absolute',
    top: -rem(43),
    left: '50%',
    marginLeft: -rem(43),
  },
  body: {
    alignItems: 'center',
    marginHorizontal: rem(50),
    flex: 1,
    marginTop: rem(55),
  },
  imageWrapper: {
    flex: 1,
    maxWidth: rem(200),
  },
  image: {
    flex: 1,
  },
  titleText: {
    fontFamily: FONTS.primary.black,
    fontSize: font(24),
    lineHeight: font(28),
    color: COLORS.darkBlue,
    textAlign: 'center',
  },
  noteText: {
    fontFamily: FONTS.primary.regular,
    fontSize: font(14),
    lineHeight: font(24),
    color: COLORS.darkBlue,
    textAlign: 'center',
    marginTop: rem(7),
  },
  controlWrapper: {
    alignSelf: 'stretch',
    marginTop: rem(25),
  },
  phoneNumberSearch: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  button: {
    marginTop: rem(20),
    height: rem(45),
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: rem(10),
    backgroundColor: COLORS.primary,
    borderRadius: rem(11),
  },
  buttonText: {
    fontFamily: FONTS.primary.black,
    fontSize: font(14),
    color: COLORS.white,
  },
});
