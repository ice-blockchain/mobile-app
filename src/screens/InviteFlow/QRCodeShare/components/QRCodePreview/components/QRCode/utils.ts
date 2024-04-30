// SPDX-License-Identifier: ice License 1.0

import QRCodeMatrix, {QRCodeOptions} from 'qrcode';

export const generateQRCodeMatrix = (input: string, options: QRCodeOptions) => {
  const sequence: (1 | 0)[] = Array.prototype.slice.call(
    QRCodeMatrix.create(input, options).modules.data,
    0,
  );
  const size = Math.sqrt(sequence.length);

  const matrix = [];
  while (sequence.length) {
    matrix.push(sequence.splice(0, size));
  }
  return matrix;
};
