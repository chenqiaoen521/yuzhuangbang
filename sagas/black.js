import { put, take, call, fork } from 'redux-saga/effects';
import { request } from '../utils/RequestUtil';
import * as types from '../constants/ActionTypes';
import { fetchBlackList, receiveBlackList } from '../actions/black';
var url = require('../config.json').url;
var token = "19_117_1_1_36";
export function* requestArticleList(isRefreshing,loading,isLoadMore,page) {
  try {
    yield put(fetchBlackList(isRefreshing,loading,isLoadMore));
    const data = yield call(request,
       `${url}/App/Center/my_contact_defriend?token=${token}`,
      'get'
      );
    yield put(
      receiveBlackList(data.data)
    );
  } catch (error) {
    yield put(receiveBlackList([]));
  }
}

export function* watchRequestBlackList() {
  while (true) {
    const { isRefreshing, loading, isLoadMore,page} = yield take(
      types.REQUEST_BLACK_LIST
    );
    yield fork(
      requestArticleList,
      isRefreshing,
      loading,
      isLoadMore,
      page
    );
  }
}
