// SPDX-License-Identifier: ice License 1.0

import {usePickImage} from '@components/Avatar/hooks/usePickImage';
import {MainStackParamList} from '@navigation/Main';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {BinIcon} from '@svg/BinIcon';
import {CameraIcon} from '@svg/CameraIcon';
import {ImageIcon} from '@svg/ImageIcon';
import {t} from '@translations/i18n';
import {useEffect, useState} from 'react';

export type CroppedImage = {mime: string; path: string};

type Props = {
  title?: string;
  onChange: (image: CroppedImage | null) => void;
  uri?: string;
};

export const useActionSheetUpdateAvatar = ({
  title = t('settings.profile_photo.edit'),
  onChange,
  uri,
}: Props) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackParamList>>();

  const [localImage, setLocalImage] = useState<CroppedImage | null>(null);

  const {openPicker} = usePickImage({
    onImageSelected: image => {
      setLocalImage(image);
      onChange(image);
    },
  });

  const onEditPress = () => {
    navigation.navigate('ActionSheet', {
      title,
      buttons: [
        {
          icon: ImageIcon,
          label: t('settings.profile_photo.photo_gallery'),
          onPress: () => openPicker('gallery'),
        },
        {
          icon: CameraIcon,
          label: t('settings.profile_photo.camera'),
          onPress: () => openPicker('camera'),
        },
        {
          icon: BinIcon,
          label: t('settings.profile_photo.delete'),
          onPress: () => {
            setLocalImage(null);
            onChange(null);
          },
        },
      ],
    });
  };

  useEffect(() => {
    setLocalImage(null);
  }, [uri]);

  return {localImage, onEditPress};
};
