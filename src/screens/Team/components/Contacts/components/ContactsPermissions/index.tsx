// SPDX-License-Identifier: ice License 1.0

import {IceLabel} from '@components/Labels/IceLabel';
import {TagWrapper} from '@components/TagWrapper';
import {COLORS} from '@constants/colors';
import {isLightDesign} from '@constants/featureFlags';
import {useBottomTabBarOffsetStyle} from '@navigation/hooks/useBottomTabBarOffsetStyle';
import {AllowContactsButton} from '@screens/Team/components/Contacts/components/ContactsPermissions/components/AllowContactsButton';
import {useAllowContactsWalkthrough} from '@screens/Team/components/Contacts/components/ContactsPermissions/hooks/useAllowContactsWalkthrough';
import {isRTL, replaceString, t, tagRegex} from '@translations/i18n';
import {font} from '@utils/styles';
import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {isAndroid, rem} from 'rn-units';

const icon = require('@screens/Team/assets/images/teamAgendaNotShared.png');

export const ContactsPermissions = () => {
  const tabbarOffset = useBottomTabBarOffsetStyle();

  const {onElementLayout, elementRef} = useAllowContactsWalkthrough();

  return (
    <View style={[styles.container, tabbarOffset.current]}>
      <Image source={icon} resizeMode="contain" style={styles.image} />
      <Text style={styles.title}>
        <TagWrapper>
          {replaceString(
            t('team.contacts.empty_title'),
            tagRegex('ice'),
            (match, index) => (
              <IceLabel
                key={match + index}
                iconSize={28}
                color={COLORS.primaryDark}
                iconOffsetY={isAndroid ? 5 : 2}
                reversed={isRTL}
              />
            ),
          )}
        </TagWrapper>
      </Text>
      <View style={styles.descriptionContainer}>
        <Text style={styles.description}>
          {replaceString(
            isLightDesign
              ? t('override.team.contacts.empty_description')
              : t('team.contacts.empty_description'),
            tagRegex('ice'),
            (match, index) => (
              <IceLabel
                key={match + index}
                iconSize={14}
                color={COLORS.secondary}
                iconOffsetY={isAndroid ? 2 : -1}
              />
            ),
          )}
        </Text>
        <View
          style={styles.buttonContainer}
          ref={elementRef}
          onLayout={onElementLayout}>
          <AllowContactsButton />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {width: rem(200), height: rem(170)},
  container: {
    marginTop: rem(24),
    alignItems: 'center',
    marginHorizontal: rem(38),
  },
  title: {
    marginTop: rem(16),
    ...font(24, 29, 'black', 'primaryDark', 'center'),
  },
  descriptionContainer: {
    paddingHorizontal: rem(10),
  },
  description: {
    marginTop: rem(12),
    ...font(14, 22, 'regular', 'secondary', 'center'),
  },
  buttonContainer: {
    marginTop: rem(36),
    alignItems: 'center',
  },
});
