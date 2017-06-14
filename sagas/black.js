import { put, take, call, fork } from 'redux-saga/effects';

import * as types from '../constants/ActionTypes';
import { fetchBlackList, receiveBlackList } from '../actions/black';

export function* requestArticleList(isRefreshing,loading,isLoadMore,page) {
  try {
    yield put(fetchBlackList(isRefreshing,loading,isLoadMore));
    const data = yield call(request,page)
    
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

function request (pages) {
  return new Promise((resolve,reject)=>{
    const black = require('../data/black.js')
    setTimeout(()=>{
      resolve(black)
    },1500)
  })
}
