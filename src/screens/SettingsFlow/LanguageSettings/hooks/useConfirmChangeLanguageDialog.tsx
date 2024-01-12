// SPDX-License-Identifier: ice License 1.0

import {DEFAULT_DIALOG_NO_BUTTON} from '@components/Buttons/PopUpButton';
import {MainStackParamList} from '@navigation/Main';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AccountActions} from '@store/modules/Account/actions';
import {AnalyticsEventLogger} from '@store/modules/Analytics/constants';
import {t} from '@translations/i18n';
import {SupportedLocale} from '@translations/localeConfig';
import {useCallback} from 'react';
import {useDispatch} from 'react-redux';

export const useConfirmChangeLanguageDialog = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackParamList>>();
  const dispatch = useDispatch();
  return {
    openConfirmationDialog: useCallback(
      (language: SupportedLocale) => {
        navigation.navigate({
          name: 'PopUp',
          key: 'confirm-lang-popup',
          params: {
            title: t('settings.change_lang_confirm.title'),
            message: t('settings.change_lang_confirm.prompt'),
            buttons: [
              DEFAULT_DIALOG_NO_BUTTON,
              {
                text: t('button.change'),
                onPress: () => {
                  dispatch(
                    AccountActions.UPDATE_ACCOUNT.START.create({
                      language,
                    }),
                  );
                  AnalyticsEventLogger.trackChangeLanguage({
                    newLanguage: language,
                  });
                },
              },
            ],
          },
        });
      },
      [dispatch, navigation],
    ),
  };
};
