// SPDX-License-Identifier: ice License 1.0

import {Touchable} from '@components/Touchable';
import {COLORS} from '@constants/colors';
import {LINKS} from '@constants/links';
import {LottieAnimations} from '@lottie';
import {navigate} from '@navigation/utils';
import {Message} from '@screens/Modals/PopUp/components/Message';
import {PopUpButtonProps} from '@screens/Modals/PopUp/components/PopUpButton';
import {Warning} from '@screens/Modals/PopUp/components/Warning';
import {CoinsStackIcon} from '@svg/CoinsStackIcon';
import {replaceString, t, tagRegex} from '@translations/i18n';
import {openLinkWithInAppBrowser} from '@utils/device';
import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {rem} from 'rn-units';

export const openClaimBonus = () => {
  let resultResolve: () => void;
  const resultPromise = new Promise<void>(r => (resultResolve = r));

  const message = replaceString(
    t('extra_bonus.claim_message'),
    tagRegex('bold', false),
    (match, index) => (
      <Text key={match + index} style={styles.bold}>
        {match}
      </Text>
    ),
  );

  const button: PopUpButtonProps = {
    icon: <CoinsStackIcon />,
    text: t('button.claim_bonus'),
    style: styles.button,
  };

  navigate({
    name: 'PopUp',
    params: {
      animationProps: {source: LottieAnimations.bonusClaim},
      title: t('extra_bonus.claim_title'),
      message: <Message text={message} />,
      warning: (
        <Touchable
          onPress={() => openLinkWithInAppBrowser({url: LINKS.BONUSES})}>
          <Warning text={t('extra_bonus.link')} />
        </Touchable>
      ),
      buttons: [
        {
          ...button,
          onPress: () => {
            navigate({
              name: 'PopUp',
              params: {buttons: [{...button, loading: true}]},
              merge: true,
            });
          },
        },
      ],
      dismissOnOutsideTouch: false,
      dismissOnAndroidHardwareBack: false,
      dismissOnButtonPress: false,
      onDismiss: () => resultResolve(),
    },
  });

  return resultPromise;
};

const styles = StyleSheet.create({
  bold: {
    color: COLORS.primaryLight,
  },
  button: {
    flex: 1,
    marginHorizontal: rem(52),
  },
});
