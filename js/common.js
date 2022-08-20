
const userSettingApi = 'https://script.google.com/macros/s/AKfycbxcqaZ5yiYjCsV2qP79ixtETrlbOy_Lr41bqz4I_NA99lN7r2FszKnKZHY5IVX6hVfj7g/exec';

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