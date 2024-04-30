// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import {getContactAcronym} from '@utils/contacts';
import {stringToColor} from '@utils/string';
import React from 'react';
import {
  Image,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
} from 'react-native';
import {Contact} from 'react-native-contacts';

interface ContactAvatarProps {
  contact: Contact;
  sideSize: number;
  borderRadius: number;
  textStyle: StyleProp<TextStyle>;
}

export const ContactAvatar = ({
  contact,
  sideSize,
  borderRadius,
  textStyle,
}: ContactAvatarProps) => {
  const additionalContainerStyle = {
    width: sideSize,
    height: sideSize,
    borderRadius: borderRadius,
  };
  return (
    <View style={[styles.container, additionalContainerStyle]}>
      {!contact.thumbnailPath && (
        <View
          style={[
            styles.contactIcon,
            additionalContainerStyle,
            {
              backgroundColor: stringToColor(
                contact.givenName ||
                  contact.familyName ||
                  contact.phoneNumbers[0].number,
              ),
            },
          ]}>
          <Text style={textStyle}>
            {getContactAcronym({
              givenName: contact.givenName,
              familyName: contact.familyName,
            })}
          </Text>
        </View>
      )}
      {contact.thumbnailPath !== '' && (
        <Image
          source={{uri: contact.thumbnailPath}}
          style={additionalContainerStyle}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    position: 'absolute',
    backgroundColor: COLORS.white,
  },
  contactIcon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
