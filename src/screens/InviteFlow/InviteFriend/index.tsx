// SPDX-License-Identifier: ice License 1.0

import {PrimaryButton} from '@components/Buttons/PrimaryButton';
import {IceLabel} from '@components/Labels/IceLabel';
import {LinesBackground} from '@components/LinesBackground';
import {COLORS} from '@constants/colors';
import {commonStyles, smallHeightDevice, windowWidth} from '@constants/styles';
import {useSafeAreaInsets} from '@hooks/useSafeAreaInsets';
import {useScrollShadow} from '@hooks/useScrollShadow';
import {Header} from '@navigation/components/Header';
import {useFocusStatusBar} from '@navigation/hooks/useFocusStatusBar';
import {MainStackParamList} from '@navigation/Main';
import {RouteProp, useRoute} from '@react-navigation/native';
import InviteAvatar, {
  AVATAR_CONTAINER_SIDE_DIMENSION,
} from '@screens/InviteFlow/InviteFriend/components/InviteAvatar';
import {
  AnalyticsEventLogger,
  EVENT_NAMES,
} from '@store/modules/Analytics/constants';
import {ContactsActions} from '@store/modules/Contacts/actions';
import {InviteIcon} from '@svg/InviteIcon';
import {replaceString, t, tagRegex} from '@translations/i18n';
import {getContactName} from '@utils/contacts';
import {font} from '@utils/styles';
import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {isAndroid, rem} from 'rn-units';

const icon = require('./assets/images/inviteFromAgendaGrafik.png');
export const INVITE_CARD_TOP_OFFSET = rem(63);

export const InviteFriend = () => {
  useFocusStatusBar({style: 'dark-content'});
  const {bottom: bottomInset} = useSafeAreaInsets();
  const dispatch = useDispatch();
  const route = useRoute<RouteProp<MainStackParamList, 'InviteFriend'>>();
  const contact = route.params?.contact;
  const {shadowStyle} = useScrollShadow();

  const onInvite = () => {
    dispatch(ContactsActions.INVITE_CONTACT.START.create(contact?.recordID));
    AnalyticsEventLogger.trackEvent({
      eventName: EVENT_NAMES.INVITE_CONTACT_BY_SMS,
    });
  };

  const nameToDisplay = getContactName({
    givenName: contact.givenName,
    familyName: contact.familyName,
  });

  const phoneNumbers = contact.phoneNumbers.map(n => n.number);

  return (
    <View style={styles.container}>
      <Header
        containerStyle={shadowStyle}
        color={COLORS.primaryDark}
        title={t('invite_share.title')}
      />
      <View style={[styles.bgCard, commonStyles.baseSubScreen]}>
        <LinesBackground />
        <Text style={styles.name}>{nameToDisplay}</Text>
        {phoneNumbers && <Text style={styles.number}>{phoneNumbers[0]}</Text>}
        <View style={[styles.card, commonStyles.baseSubScreen]}>
          <View style={styles.cardContent}>
            <Image source={icon} style={styles.icon} resizeMode="contain" />
            <View style={styles.buttonContainer}>
              <View style={styles.descriptionContainer}>
                <Text style={styles.description}>
                  {replaceString(
                    t('invite_friend.description'),
                    tagRegex('ice'),
                    (match, index) => (
                      <IceLabel
                        key={match + index}
                        color={COLORS.primaryDark}
                        iconOffsetY={isAndroid ? 2 : -1}
                      />
                    ),
                  )}
                </Text>
              </View>
              <View style={styles.button}>
                <PrimaryButton
                  onPress={onInvite}
                  text={t('invite_friend.button_title')}
                  icon={
                    <InviteIcon
                      width={rem(24)}
                      height={rem(23)}
                      fill={COLORS.white}
                    />
                  }
                  style={[styles.inviteButton, {marginBottom: bottomInset}]}
                />
              </View>
            </View>
          </View>
        </View>
      </View>
      <InviteAvatar contact={contact} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  bgCard: {
    marginTop: INVITE_CARD_TOP_OFFSET,
    alignItems: 'center',
    flex: 1,
    overflow: 'hidden',
  },
  icon: {
    alignSelf: 'center',
    width: smallHeightDevice ? rem(234) : rem(336),
    height: smallHeightDevice ? rem(160) : rem(230),
  },
  card: {
    alignItems: 'center',
    flex: 1,
    marginTop: rem(26),
  },
  cardContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    marginTop: AVATAR_CONTAINER_SIDE_DIMENSION / 2 + rem(12),
    ...font(17, 22, 'semibold', 'white', 'center'),
  },
  number: {
    ...font(13, 17, 'medium', 'secondaryFaint', 'center'),
    marginTop: rem(4),
  },
  descriptionContainer: {
    paddingHorizontal: smallHeightDevice ? rem(54) : rem(70),
  },
  description: {
    ...font(17, 22, 'medium', 'primaryDark', 'center'),
  },
  buttonContainer: {
    paddingTop: smallHeightDevice ? rem(6) : rem(24),
  },
  button: {
    width: windowWidth,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: smallHeightDevice ? rem(20) : rem(24),
  },
  inviteButton: {
    width: windowWidth - rem(100),
    backgroundColor: COLORS.primaryLight,
    height: rem(56),
    borderRadius: rem(16),
  },
});
