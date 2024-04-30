// SPDX-License-Identifier: ice License 1.0

import {ContactAvatar} from '@components/ContactAvatar';
import {Tooltip} from '@components/Tooltip';
import {COLORS} from '@constants/colors';
import {windowWidth} from '@constants/styles';
import {useSafeAreaInsets} from '@hooks/useSafeAreaInsets';
import {AVATAR_SIZE} from '@screens/ProfileFlow/Profile/components/AvatarHeader';
import {font} from '@utils/styles';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Contact} from 'react-native-contacts';
import {rem} from 'rn-units';

const MIN_TOOLTIP_WIDTH = rem(220);
const CHEVRON_LEFT_OFFSET = MIN_TOOLTIP_WIDTH / 2 + AVATAR_SIZE / 2 - rem(23);

type AgendaContactTooltipProps = {
  contact: Contact;
};

export const AgendaContactTooltip = ({contact}: AgendaContactTooltipProps) => {
  const {top: topInset} = useSafeAreaInsets();
  const topOffset = topInset + rem(160);

  const fullName = `${contact?.givenName || ''} ${
    contact?.familyName || ''
  }`.trim();

  const numbers = contact.phoneNumbers.map(phone => phone.number).join('\n');

  return (
    <Tooltip
      animated={false}
      style={[styles.container, {top: topOffset}]}
      chevronStyle={styles.chevron}>
      <View style={styles.avatarContainer}>
        <ContactAvatar
          sideSize={rem(36)}
          borderRadius={rem(12)}
          textStyle={styles.avatarText}
          contact={contact}
        />
      </View>
      <View style={styles.popUpTextWrapper}>
        <Text style={styles.popUpName} numberOfLines={2}>
          {fullName}
        </Text>
        <Text style={styles.popUpPhone}>{numbers}</Text>
      </View>
    </Tooltip>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    maxWidth: windowWidth - rem(100),
    minWidth: MIN_TOOLTIP_WIDTH,
    alignSelf: 'center',
    flexDirection: 'row',
    backgroundColor: COLORS.downriver,
    borderRadius: 12,
    paddingHorizontal: rem(19),
    paddingVertical: rem(8),
  },
  avatarContainer: {
    justifyContent: 'center',
    marginLeft: rem(19),
    marginVertical: rem(5),
  },
  popUpTextWrapper: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: rem(27),
  },
  popUpName: {
    ...font(16, 21, 'bold', 'white'),
  },
  popUpPhone: {
    ...font(14, 19, 'medium', 'white'),
    marginTop: rem(4),
  },
  chevron: {
    position: 'absolute',
    top: -rem(9),
    left: CHEVRON_LEFT_OFFSET,
    alignSelf: 'center',
  },
  avatarText: {
    ...font(17, 22, 'regular', 'white'),
  },
});
