import { put, take, call, fork } from 'redux-saga/effects';
import { request } from '../utils/RequestUtil';
import * as types from '../constants/ActionTypes';
import { fetchBlackList, receiveBlackList } from '../actions/black';
const host = require('../config.json').url;

export function* requestArticleList(isRefreshing,loading,isLoadMore,url,token,page) {
  try {
    yield put(fetchBlackList(isRefreshing,loading,isLoadMore));
      const res = yield call(request,
         `${host}${url}?token=${token}`,
        'get'
        );
      yield put(
        receiveBlackList(res.data)
      );
  } catch (error) {
    yield put(receiveBlackList([]));
  }
}

export function* watchRequestBlackList() {
  while (true) {
    const { isRefreshing, loading, isLoadMore,url,token,page} = yield take(
      types.REQUEST_BLACK_LIST
    );
    yield fork(
      requestArticleList,
      isRefreshing,
      loading,
      isLoadMore,
      url,
      token,
      page
    );
  }
}
