import { put, take, call, fork } from 'redux-saga/effects';

import * as types from '../constants/ActionTypes';
import { fetchArticleList, receiveArticleList } from '../actions/list';

export function* requestArticleList(isRefreshing,loading,isLoadMore) {
  try {
    yield put(fetchArticleList(isRefreshing,loading,isLoadMore));
    const data = yield call(request,'aa')
    
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

function request (aa) {
  return new Promise((resolve,reject)=>{
    const data = require('../pages/message.json')
    setTimeout(()=>{
      resolve(data)
    },1500)
  })
}
