/* eslint no-constant-condition: ["error", { "checkLoops": false }] */
/**
 *
 * Copyright 2016-present reading
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
import { put, take, call, fork } from 'redux-saga/effects';
import * as types from '../constants/ActionTypes';
import { fetchTypeList, receiveTypeList } from '../actions/notice';

export function* requestList() {
  try {
    yield put(fetchTypeList());
    const typeList = '变革的基因：移动互联网时代的组织能力创新';
    yield put(receiveTypeList(typeList));
  } catch (error) {
    yield put(receiveTypeList([]));
  }
}

export function* watchRequestNoticeList() {
  while (true) {
    yield take(types.REQUEST_TYPE_LIST);
    yield fork(requestList);
  }
}
