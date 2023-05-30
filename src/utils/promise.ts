// SPDX-License-Identifier: ice License 1.0

import {AppState} from 'react-native';

export const getChunks = <T>(input: Array<T>, chunkSize: number) => {
  let results = [];
  const inputCopy = [...input];
  while (inputCopy.length) {
    results.push(inputCopy.splice(0, chunkSize));
  }
  return results;
};

export const runInChunks = async <T>(
  input: Array<T>,
  processor: (value: T, index: number, array: T[]) => unknown,
  chunkSize: number,
) => {
  const chunks = getChunks(input, chunkSize);

  const result = [];
  for (let i = 0; i < chunks.length; i++) {
    if (AppState.currentState === 'active') {
      await new Promise(requestAnimationFrame);
    }
    const chunkResult = await Promise.all(chunks[i].map(processor));
    result.push(...chunkResult);
  }

  return result;
};
