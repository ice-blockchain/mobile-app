// SPDX-License-Identifier: ice License 1.0

import {Touchable} from '@components/Touchable';
import {COLORS} from '@constants/colors';
import {SMALL_BUTTON_HIT_SLOP} from '@constants/styles';
import {AccountActions} from '@store/modules/Account/actions';
import {isPrivacyInfoShownSelector} from '@store/modules/Account/selectors';
import {ClosedPrivacyIcon} from '@svg/ClosedPrivacyIcon';
import {OpenedPrivacyIcon} from '@svg/OpenedPrivacyIcon';
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
          <ClosedPrivacyIcon color={color} />
        ) : (
          <OpenedPrivacyIcon color={color} />
        )}
      </Touchable>
    </View>
  );
};
