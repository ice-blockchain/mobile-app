// SPDX-License-Identifier: ice License 1.0

import {logError} from '@services/logging';
import Sound from 'react-native-sound';

const loadedAudio: {[path: string]: Promise<Sound>} = {};

// Do not interrupt sound from another app if any
Sound.setCategory('Ambient', true);

export const playLocalAudio = async (audioPath: string) => {
  const sound = await loadLocalAudio(audioPath);
  return new Promise(resolve => sound.play(resolve));
};

export const loadLocalAudio = (audioPath: string) => {
  if (!loadedAudio[audioPath]) {
    loadedAudio[audioPath] = new Promise((resolve, reject) => {
      const sound = new Sound(audioPath, Sound.MAIN_BUNDLE, error => {
        if (error) {
          logError(error);
          reject(error);
        } else {
          resolve(sound);
        }
      });
    });
  }
  return loadedAudio[audioPath];
};
