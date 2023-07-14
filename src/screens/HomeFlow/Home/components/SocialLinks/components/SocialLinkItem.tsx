// SPDX-License-Identifier: ice License 1.0

import {Touchable} from '@components/Touchable';
import {COLORS} from '@constants/colors';
import {openLinkWithInAppBrowser} from '@utils/device';
import React, {memo, useCallback} from 'react';
import {Image, Linking} from 'react-native';
import {ImageSourcePropType, StyleSheet} from 'react-native';
import {rem} from 'rn-units';

interface Props {
  icon: ImageSourcePropType;
  linkScheme: string | undefined;
  linkUrl: string;
}

const openSchemeOrUrl = async ({
  linkScheme,
  linkUrl,
}: {
  linkScheme?: string;
  linkUrl: string;
}) => {
  try {
    if (linkScheme) {
      const supported = await Linking.openURL(linkScheme);

      if (supported) {
        return Linking.openURL(linkScheme);
      }
    }
  } catch (error) {
    /**
     * Ignore. We will try to open linkUrl
     */
  }

  openLinkWithInAppBrowser({
    url: linkUrl,
  });
};

export const SocialLinkItem = memo(({icon, linkScheme, linkUrl}: Props) => {
  const onPress = useCallback(() => {
    openSchemeOrUrl({
      linkScheme,
      linkUrl,
    });
  }, [linkScheme, linkUrl]);

  return (
    <Touchable style={styles.container} onPress={onPress}>
      <Image style={styles.icon} source={icon} resizeMode={'contain'} />
    </Touchable>
  );
});

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: rem(36),
    height: rem(36),
    borderRadius: rem(12),
    backgroundColor: COLORS.dodgerBlue,
  },
  icon: {
    width: rem(16),
    height: rem(16),
  },
});
