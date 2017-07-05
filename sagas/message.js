import { put, take, call, fork } from 'redux-saga/effects';

import * as types from '../constants/ActionTypes';
import { request } from '../utils/RequestUtil';
import { fetchArticleList, receiveArticleList } from '../actions/list';
import store from 'react-native-simple-store';
const host = require('../config.json').url;
export function* requestArticleList(isRefreshing,loading,isLoadMore,token) {
  try {
    yield put(fetchArticleList(isRefreshing,loading,isLoadMore));

      const res = yield call(request,
      `${host}/App/Center/user_msg?token=${token}`,
      'get'
      ); 
      yield put(
      receiveArticleList(res.data)
    );          
    
    
  } catch (error) {
    yield put(receiveArticleList([]));
  }
}

export function* watchRequestArticleList() {
  while (true) {
    const { isRefreshing, loading, isLoadMore,token} = yield take(
      types.REQUEST_ARTICLE_LIST
    );
    yield fork(
      requestArticleList,
      isRefreshing,
      loading,
      isLoadMore,
      token
    );
  }
}

