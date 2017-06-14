import * as types from '../constants/ActionTypes';

const initialState = {
  isRefreshing:false,
  loading:false,
  isLoadMore:false,
  articleList:[]
};

export default function black(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_BLACK_LIST:
      return Object.assign({}, state, {
        isRefreshing:action.isRefreshing,
        loading:action.loading,
        isLoadMore:action.isLoadMore
      });
    case types.RECEIVE_BLACK_LIST:
      return Object.assign({}, state, {
        isRefreshing: false,
        loading:false,
        articleList:state.isLoadMore ? loadMore(state, action):combine(state,action)
      });
    default:
      return state;
  }
}
function combine(state,action){
  let articleList = action.articleList
  return articleList;
}
function loadMore(state,action){
  let articleList = state.articleList.concat(action.articleList)
  return articleList;
}
