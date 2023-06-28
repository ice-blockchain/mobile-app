// SPDX-License-Identifier: ice License 1.0

import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {statusNoticeHeightSelector} from '@store/modules/StatusNotice/selectors';
import {useCallback} from 'react';
import {Keyboard, StatusBar, StatusBarStyle} from 'react-native';
import {useSelector} from 'react-redux';
import {isAndroid, isIOS} from 'rn-units';

type Props = {
  style: StatusBarStyle;
  animated?: boolean | undefined;
};

export const useFocusStatusBar = ({style, animated}: Props) => {
  const statusNoticeHeight = useSelector(statusNoticeHeightSelector);
  const navigation = useNavigation();
  const isRootLevelScreen = !navigation.getParent();
  const isStatusNoticeRendered = !!statusNoticeHeight && !isRootLevelScreen;
  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle(
        isStatusNoticeRendered ? 'light-content' : style,
        animated,
      );

      if (isAndroid) {
        StatusBar.setBackgroundColor('transparent', animated);
        StatusBar.setTranslucent(true);
      }

      if (isIOS) {
        // the status-bar changes color to default on iOS when the keyboard is shown
        const subscription = Keyboard.addListener('keyboardWillShow', () => {
          StatusBar.setBarStyle(style, animated);
        });

        return () => {
          subscription.remove();
        };
      }
    }, [animated, isStatusNoticeRendered, style]),
  );
};
