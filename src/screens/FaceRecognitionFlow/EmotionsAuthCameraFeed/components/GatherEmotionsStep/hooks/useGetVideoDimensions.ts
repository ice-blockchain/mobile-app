// SPDX-License-Identifier: ice License 1.0

import {getVideoDimensionsWithFFmpeg, VideoDimensions} from '@utils/ffmpeg';
import {useCallback, useRef} from 'react';

export function useGetVideoDimensions() {
  const videoDimensionsRef = useRef<VideoDimensions | null>(null);

  return useCallback(async (videoUri: string) => {
    if (!videoDimensionsRef.current) {
      videoDimensionsRef.current = await getVideoDimensionsWithFFmpeg(videoUri);
    }
    return videoDimensionsRef.current;
  }, []);
}
