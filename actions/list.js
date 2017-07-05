import * as types from '../constants/ActionTypes';

export function requestArticleList(isRefreshing,loading,isLoadMore,token) {
  return {
    type: types.REQUEST_ARTICLE_LIST,
    isRefreshing,
    loading,
    isLoadMore,
    token
  };
}

export function fetchArticleList(isRefreshing,loading,isLoadMore=false) {
  return {
    type: types.FETCH_ARTICLE_LIST,
    isRefreshing,
    loading,
    isLoadMore
  };
}

export function receiveArticleList(articleList) {
  return {
    type:types.RECEIVE_ARTICLE_LIST,
    articleList
  };
}
