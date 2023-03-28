// SPDX-License-Identifier: ice License 1.0

import {Touchable} from '@components/Touchable';
import {COLORS} from '@constants/colors';
import {SMALL_BUTTON_HIT_SLOP} from '@constants/styles';
import {AccountActions} from '@store/modules/Account/actions';
import {isPrivacyInfoShownSelector} from '@store/modules/Account/selectors';
import {ClosedEyeIcon} from '@svg/ClosedEyeIcon';
import {OpenedEyeIcon} from '@svg/OpenedEyeIcon';
import React, {useCallback} from 'react';
import {StyleProp, View, ViewStyle} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

type Props = {
  containerStyle?: StyleProp<ViewStyle>;
  color?: string;
};

export const ShowPrivacyButton = ({
  containerStyle,
  color = COLORS.primaryDark,
}: Props) => {
  const isPrivacyInfoShown = useSelector(isPrivacyInfoShownSelector);
  const dispatch = useDispatch();
  const showPrivacyHandler = useCallback(() => {
    dispatch(
      AccountActions.SET_PRIVACY_INFO_SHOW.STATE.create(!isPrivacyInfoShown),
    );
  }, [dispatch, isPrivacyInfoShown]);
  return (
    <View style={containerStyle}>
      <Touchable onPress={showPrivacyHandler} hitSlop={SMALL_BUTTON_HIT_SLOP}>
        {isPrivacyInfoShown ? (
          <ClosedEyeIcon color={color} />
        ) : (
          <OpenedEyeIcon color={color} />
        )}
      </Touchable>
    </View>
  );
};
