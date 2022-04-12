// SPDX-License-Identifier: BUSL-1.1

import {ApiProfile} from '../utils/types';
import axios from 'src/api/utils/axios';

export default function getProfile(profileId: string) {
  return axios.get<ApiProfile>(`/profile/${profileId}`);
}
