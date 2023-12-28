// SPDX-License-Identifier: ice License 1.0

import {Touchable} from '@components/Touchable';
import {LINKS} from '@constants/links';
import {SMALL_BUTTON_HIT_SLOP} from '@constants/styles';
import {unsafeUserSelector} from '@store/modules/Account/selectors';
import {balanceSummarySelector} from '@store/modules/Tokenomics/selectors';
import {ArrowLink} from '@svg/ArrowLink';
import {openLinkWithInAppBrowser} from '@utils/device';
import React from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import {useSelector} from 'react-redux';

type Props = {
  style?: StyleProp<ViewStyle>;
};

export const ExternalLink = ({style}: Props) => {
  const user = useSelector(unsafeUserSelector);
  const balanceSummary = useSelector(balanceSummarySelector);

  const onLinkPress = () => {
    if (
      user.miningBlockchainAccountAddress &&
      balanceSummary &&
      balanceSummary.totalMiningBlockchain !== '0.00'
    ) {
      openLinkWithInAppBrowser({
        url: `${LINKS.BSCSCAN}/${user.miningBlockchainAccountAddress}`,
      });
    }
  };

  return (
    <Touchable
      onPress={onLinkPress}
      style={style}
      hitSlop={SMALL_BUTTON_HIT_SLOP}>
      <ArrowLink />
    </Touchable>
  );
};
