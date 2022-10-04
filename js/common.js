
const userSettingApi = 'https://script.google.com/macros/s/AKfycbz0YRDAy_gLUCNqurE177zzjRz9MP5uS-BEt7qmD1_YvnKOBEtV40Jbj1tn_4NwSSEOUw/exec';

/**
 * 設定 LocalStorage 參數
 * @param {{
  * key: string,
  * value: string,
 * }} item 送入的參數與值
 */
function setItemToLocalStorage(item) {
  localStorage.setItem(item.key, JSON.stringify(item.value));
}

/**
 * 移除 LocalStorage 參數
 * @param {string} key 要移除的 key
 */
function removeItemFromLocalStorage(key) {
  localStorage.removeItem(key);
}