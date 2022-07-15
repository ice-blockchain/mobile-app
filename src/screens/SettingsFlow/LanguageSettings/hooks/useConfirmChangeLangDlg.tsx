// SPDX-License-Identifier: BUSL-1.1

import {MainStackParamList} from '@navigation/Main';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {DEFAULT_CONFIRM_NO_BUTTON} from '@screens/Dialogs/Confirm';
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
        title: t('settings.change_lang_confirm.title'),
        subtitle: t('settings.change_lang_confirm.prompt'),
        buttons: [
          {
            label: t('button.change'),
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
