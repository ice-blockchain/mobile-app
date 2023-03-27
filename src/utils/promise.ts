// SPDX-License-Identifier: ice License 1.0

const getChunks = <T>(input: Array<T>, chunkSize: number) => {
  let results = [];
  while (input.length) {
    results.push(input.splice(0, chunkSize));
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
    await new Promise(requestAnimationFrame);
    const chunkResult = await Promise.all(chunks[i].map(processor));
    result.push(...chunkResult);
  }

  return result;
};
