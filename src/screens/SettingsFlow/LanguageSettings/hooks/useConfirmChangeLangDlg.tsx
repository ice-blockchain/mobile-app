// SPDX-License-Identifier: BUSL-1.1

import {MainStackParamList} from '@navigation/Main';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  DEFAULT_CONFIRM_NO_BUTTON,
  DEFAULT_CONFIRM_YES_BUTTON,
} from '@screens/Dialogs/Confirm';
import {DeviceActions} from '@store/modules/Devices/actions';
import {t} from '@translations/i18n';
import {useDispatch} from 'react-redux';

export const useConfirmChangeLangDlg = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackParamList>>();
  const dispatch = useDispatch();
  return {
    openConfirmationDlg: (language: string) => {
      navigation.navigate('Confirm', {
        title: t('settings.notifications_title'),
        subtitle: t('settings.notifications.enable_prompt'),
        buttons: [
          {
            ...DEFAULT_CONFIRM_YES_BUTTON,
            onPress: () => {
              dispatch(DeviceActions.UPDATE_SETTINGS.START.create({language}));
            },
          },
          DEFAULT_CONFIRM_NO_BUTTON,
        ],
      });
    },
  };
};
