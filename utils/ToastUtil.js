/**
 *
 * Copyright 2016-present reading
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
import { Alert, ToastAndroid, Platform } from 'react-native';

const showShort = (content, isAlert) => {
  if (!content) {
    return;
  }
  if (isAlert || Platform.OS === 'ios') {
    Alert.alert('提示', content.toString());
  } else {
    ToastAndroid.show(content.toString(), ToastAndroid.SHORT);
  }
};

const showLong = (content, isAlert) => {
  if (isAlert || Platform.OS === 'ios') {
    Alert.alert('提示', content.toString());
  } else {
    ToastAndroid.show(content.toString(), ToastAndroid.LONG);
  }
};
const getUserType = (index) => {
  let x = '';

    switch(index)
    {
    case "1":
      x = '普通会员';
      break;
    case "2":
      x = '设计师'
      break;
    case "3":
      x = '商家'
      break;
    }
  return x;
}

const friendType = (index) => {
  let x = '';

    switch(index)
    {
    case "1":
      x = '同意';
      break;
    case "2":
      x = '已拒绝'
      break;
    case "3":
      x = '已拉黑'
      break;
    }
  return x;
}
export default {
  showShort,
  showLong,
  getUserType,
  friendType
};
