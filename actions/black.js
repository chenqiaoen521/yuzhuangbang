import * as types from '../constants/ActionTypes';

export function requestBlackList(isRefreshing,loading,isLoadMore,url,token,page=1) {
  return {
    type: types.REQUEST_BLACK_LIST,
    isRefreshing,
    loading,
    isLoadMore,
    url,
    token,
    page
  };
}

export function fetchBlackList(isRefreshing,loading,isLoadMore=false) {
  return {
    type: types.FETCH_BLACK_LIST,
    isRefreshing,
    loading,
    isLoadMore
  };
}

export function receiveBlackList(articleList) {
  return {
    type:types.RECEIVE_BLACK_LIST,
    articleList
  };
}
