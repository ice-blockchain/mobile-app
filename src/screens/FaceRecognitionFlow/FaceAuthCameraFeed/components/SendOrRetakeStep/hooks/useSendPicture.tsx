// SPDX-License-Identifier: ice License 1.0

import {Warning} from '@components/Warning';
import {MainNavigationParams} from '@navigation/Main';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {GuidelinesCheckList} from '@screens/FaceRecognitionFlow/components/GuidelinesCheckList';
import {FaceRecognitionActions} from '@store/modules/FaceRecognition/actions';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {rem} from 'rn-units';

type Params = {
  picture: {uri: string; width: number; height: number};
  onPictureSent: () => void;
};

export const useSendPicture = ({picture, onPictureSent}: Params) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<MainNavigationParams>>();
  const dispatch = useDispatch();

  const sendPicture = () => {
    navigation.navigate({
      name: 'PopUp',
      key: 'confirm-guidelines',
      params: {
        title: t('face_auth.selfie_guidelines.popup_title'),
        message: (
          <View style={styles.body}>
            <Text style={styles.messageText}>
              {t('face_auth.selfie_guidelines.popup_body')}
            </Text>
            <GuidelinesCheckList containerStyle={styles.list} />
            <Warning
              text={t('face_auth.selfie_guidelines.warning')}
              containerStyle={styles.warning}
            />
          </View>
        ),
        buttons: [
          {
            text: t('button.cancel'),
            preset: 'outlined',
          },
          {
            text: t('button.continue'),
            onPress: () => {
              dispatch(
                FaceRecognitionActions.FACE_AUTH.START.create({
                  pictureUri: picture.uri,
                  pictureWidth: picture.width,
                  pictureHeight: picture.height,
                }),
              );
              onPictureSent();
            },
          },
        ],
      },
    });
  };

  return {
    sendPicture,
  };
};

const styles = StyleSheet.create({
  body: {
    marginHorizontal: rem(16),
  },
  messageText: {
    ...font(14, 22, 'medium', 'secondary', 'center'),
    marginTop: rem(12),
    marginHorizontal: rem(10),
  },
  list: {
    marginTop: rem(22),
    marginHorizontal: rem(14),
  },
  warning: {
    marginTop: rem(16),
  },
});
