// SPDX-License-Identifier: ice License 1.0

import {buildParamsType, COUNT_TYPE} from './buildParamsType.mjs';
import {getParamsFromString} from './getParamsFromString.mjs';
import {isPluralizationNode} from './isPluralizationNode.mjs';

export const buildFlatTranslationsType = (node, parentPath = '') => {
  return Object.entries(node).reduce((results, [nodeKey, nodeContent]) => {
    const currentPath = parentPath ? `${parentPath}.${nodeKey}` : nodeKey;

    if (typeof nodeContent === 'string') {
      results[currentPath] = buildParamsType(getParamsFromString(nodeContent));
    } else if (isPluralizationNode(nodeContent)) {
      results[currentPath] =
        buildParamsType(
          getParamsFromString(Object.values(nodeContent).join('')),
        ) ?? {};
      results[currentPath].count = COUNT_TYPE;
    } else {
      results = {
        ...results,
        ...buildFlatTranslationsType(nodeContent, currentPath),
      };
    }

    return results;
  }, {});
};
