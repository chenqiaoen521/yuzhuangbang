import * as types from '../constants/ActionTypes';

export function requestTypeList() {
  return {
    type: types.REQUEST_TYPE_LIST
  };
}

export function fetchTypeList() {
  return {
    type: types.FETCH_TYPE_LIST
  };
}

export function receiveTypeList(typeList) {
  return {
    type: types.RECEIVE_TYPE_LIST,
    typeList
  };
}
