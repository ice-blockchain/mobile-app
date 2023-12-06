// SPDX-License-Identifier: ice License 1.0

import {Touchable} from '@components/Touchable';
import {COLORS} from '@constants/colors';
import {commonStyles} from '@constants/styles';
import {Images} from '@images';
import {SocialKycMethod} from '@store/modules/SocialKyc/types';
import {font, paddingLeftRtl} from '@utils/styles';
import React from 'react';
import {Image, StyleSheet, Text} from 'react-native';
import {rem} from 'rn-units';

type Props = {
  setSocialKycMethod: (method: SocialKycMethod) => void;
  selectedSocialKycMethod: SocialKycMethod | null;
  socialKycMethod: SocialKycMethod;
};

export function SocialKycMethodSelectionTile({
  setSocialKycMethod,
  selectedSocialKycMethod,
  socialKycMethod,
}: Props) {
  const isSelected = selectedSocialKycMethod === socialKycMethod;
  return (
    <Touchable
      style={[
        styles.container,
        commonStyles.shadow,
        isSelected ? styles.selected : null,
      ]}
      onPress={() => setSocialKycMethod(socialKycMethod)}>
      <Image
        style={styles.icon}
        source={
          socialKycMethod === 'Facebook'
            ? Images.badges.socialKyc.fbLight
            : Images.badges.socialKyc.xLight
        }
      />
      <Text style={styles.title}>{socialKycMethod}</Text>
    </Touchable>
  );
}

const ICON_SIZE = rem(50);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    height: rem(70),
    backgroundColor: COLORS.white,
    borderRadius: rem(16),
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: rem(12),
    borderWidth: 1,
    borderColor: COLORS.white,
  },
  selected: {
    borderColor: COLORS.primaryLight,
  },
  icon: {
    width: ICON_SIZE,
    height: ICON_SIZE,
    borderRadius: rem(12),
    borderWidth: 1,
    borderColor: COLORS.periwinkleGray,
  },
  title: {
    flex: 1,
    ...paddingLeftRtl(rem(12)),
    justifyContent: 'center',
    ...font(17, 22, 'bold', 'primaryDark', 'left'),
    textTransform: 'capitalize',
  },
});
