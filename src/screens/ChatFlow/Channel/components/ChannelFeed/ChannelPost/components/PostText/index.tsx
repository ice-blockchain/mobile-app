// SPDX-License-Identifier: ice License 1.0

import {CHANNEL_POST_SIDE_OFFSET} from '@screens/ChatFlow/Channel/components/ChannelFeed/constansts';
import {ChannelPostData} from '@screens/ChatFlow/Channel/components/ChannelFeed/type';
import {
  LINK_WITH_ATTRIBUTES_REGEX,
  LINK_WITH_HREF_GROUP_REGEX,
  replaceString,
} from '@translations/i18n';
import {openLinkWithInAppBrowser} from '@utils/device';
import {font} from '@utils/styles';
import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {rem} from 'rn-units';

type Props = {
  postData: ChannelPostData;
};

export function PostText({postData}: Props) {
  if (!postData.postText) {
    return null;
  }
  return (
    <View style={styles.container}>
      <Text style={styles.postText}>
        {replaceString(
          postData.postText,
          LINK_WITH_ATTRIBUTES_REGEX,
          (match, index) => {
            const [_, link, text] =
              match.match(LINK_WITH_HREF_GROUP_REGEX) ?? [];
            return (
              <Text
                key={match + index}
                style={styles.underlineText}
                onPress={() => {
                  if (link) {
                    openLinkWithInAppBrowser({url: link});
                  }
                }}>
                {text}
              </Text>
            );
          },
        )}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingTop: rem(12),
    paddingHorizontal: CHANNEL_POST_SIDE_OFFSET,
  },
  postText: {
    ...font(14, 20, 'medium', 'emperor'),
  },
  underlineText: {
    textDecorationLine: 'underline',
    ...font(14, 20, 'medium', 'primaryLight'),
  },
});
