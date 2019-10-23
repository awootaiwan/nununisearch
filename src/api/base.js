import API from './config';

const ERROR_NONE = 0;
const ERROR_REQUEST_FAILED = 10000;
const ERROR_NO_TAGS_PROVIDED = 10001;
const errMap = new Map([
  [ERROR_NONE, 'Success'],
  [ERROR_REQUEST_FAILED, 'Request to Site Search API failed.'],
  // TODO 可能沒有tag 待確認
  [ERROR_NO_TAGS_PROVIDED, 'No tags provided.']
]);

function getPayload(errCode = ERROR_NONE, errMsg = '', result = '') {
  return {
    errcode: errCode,
    errmsg: errMsg || errMap.get(errCode) || 'Undefined error.',
    result
  };
}

/* 參考用之後可刪
const getClassifyApiData = async (
  id = process.env.NUNUNI_ID,
  version,
  productIds
) => {
  try {
    const { status, data: response } = await API.post(
      `/${version}/${id}/products/classify`,
      productIds
    );
    if (status !== 200) {
      return getPayload(status, response.error_description, response);
    }
    return response;
  } catch (e) {
    return getPayload(ERROR_REQUEST_FAILED);
  }
};*/

export { getClassifyApiData };
