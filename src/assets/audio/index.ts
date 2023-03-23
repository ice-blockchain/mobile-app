// SPDX-License-Identifier: ice License 1.0

import {Platform} from 'react-native';

/**
 * Android: Save your sound clip files under the directory android/app/src/main/res/raw.
 * 	Note that files in this directory must be lowercase and underscored (e.g. my_file_name.mp3)
 * 	and that subdirectories are not supported by Android.
 * iOS: Open Xcode and add your sound files to the project
 * 	(Right-click the project and select Add Files to [PROJECTNAME])
 */

const subfolder = Platform.OS === 'ios' ? 'audio/' : '';

export const LocalAudio = {
  startMining: `${subfolder}start_mining.wav`,
  extendMining: `${subfolder}extend_mining.wav`,
  bonusReceived: `${subfolder}bonus_received.wav`,
};
