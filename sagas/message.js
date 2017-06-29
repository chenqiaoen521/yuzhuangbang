import { put, take, call, fork } from 'redux-saga/effects';

import * as types from '../constants/ActionTypes';
import { request } from '../utils/RequestUtil';
import { fetchArticleList, receiveArticleList } from '../actions/list';
const host = require('../config.json').url;
const token = require('../config.json').token;
export function* requestArticleList(isRefreshing,loading,isLoadMore) {
  try {
    yield put(fetchArticleList(isRefreshing,loading,isLoadMore));
    const data = yield call(request,
       `${host}/App/Center/user_msg?token=${token}`,
      'get'
      );
    yield put(
      receiveArticleList(data.data)
    );
  } catch (error) {
    yield put(receiveArticleList([]));
  }
}

export function* watchRequestArticleList() {
  while (true) {
    const { isRefreshing, loading, isLoadMore} = yield take(
      types.REQUEST_ARTICLE_LIST
    );
    yield fork(
      requestArticleList,
      isRefreshing,
      loading,
      isLoadMore
    );
  }
}

