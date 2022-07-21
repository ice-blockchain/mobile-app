// SPDX-License-Identifier: BUSL-1.1

import {useEffect, useRef} from 'react';

export const useCancelRequest = () => {
  const abortControllerRef = useRef<AbortController>(new AbortController());

  useEffect(() => {
    const controller = abortControllerRef.current;
    return () => {
      controller.abort();
    };
  }, []);

  return abortControllerRef.current.signal;
};
