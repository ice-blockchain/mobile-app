// SPDX-License-Identifier: ice License 1.0

import {Touchable} from '@components/Touchable';
import {COLORS} from '@constants/colors';
import {SMALL_BUTTON_HIT_SLOP} from '@constants/styles';
import {AccountActions} from '@store/modules/Account/actions';
import {isPrivacyInfoShownSelector} from '@store/modules/Account/selectors';
import {ClosedPrivacyIcon} from '@svg/ClosedPrivacyIcon';
import {OpenedPrivacyIcon} from '@svg/OpenedPrivacyIcon';
import React, {useCallback} from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

type Props = {
  style?: StyleProp<ViewStyle>;
  color?: string;
};

export const ShowPrivacyActionButton = ({
  style,
  color = COLORS.primaryDark,
}: Props) => {
  const dispatch = useDispatch();

  const isPrivacyInfoShown = useSelector(isPrivacyInfoShownSelector);

  const showPrivacyHandler = useCallback(() => {
    dispatch(
      AccountActions.SET_PRIVACY_INFO_SHOW.STATE.create(!isPrivacyInfoShown),
    );
  }, [dispatch, isPrivacyInfoShown]);

  return (
    <Touchable
      style={style}
      onPress={showPrivacyHandler}
      hitSlop={SMALL_BUTTON_HIT_SLOP}>
      {isPrivacyInfoShown ? (
        <ClosedPrivacyIcon color={color} />
      ) : (
        <OpenedPrivacyIcon color={color} />
      )}
    </Touchable>
  );
};
