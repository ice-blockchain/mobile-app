// SPDX-License-Identifier: ice License 1.0

import {Touchable} from '@components/Touchable';
import {COLORS} from '@constants/colors';
import {openLink} from '@utils/device';
import React, {useCallback} from 'react';
import {Image, ImageSourcePropType, StyleSheet} from 'react-native';
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
  const supportedLinkScheme = linkScheme ? await openLink(linkScheme) : false;

  if (!supportedLinkScheme) {
    await openLink(linkUrl);
  }
};

const CONTAINER_SIZE = rem(36);
const ICON_SIZE = rem(20);

export const SocialLinkItem = ({icon, linkScheme, linkUrl}: Props) => {
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
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: CONTAINER_SIZE,
    height: CONTAINER_SIZE,
    borderRadius: rem(12),
    backgroundColor: COLORS.dodgerBlue,
  },
  icon: {
    width: ICON_SIZE,
    height: ICON_SIZE,
  },
});
