// import API from './config';
import axios from 'axios';

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

const getSiteSearchApiData = async (
  id = process.env.NUNUNI_ID,
  version,
  params,
) => {
  // const url = `${process.env.NUNUNI_DOMAIN}/search/${version}/${id}/products`;
  const url = 'http://minerva.chase.awoo.org/search/v1/1177060613/products';
  // const headers = {
  //   "Content-Type": "application/json",
  //   Authorization: 'Bearer 0999491db0588353958f204479ee5237a74f786b'
  // };

  try {
    const { status, data: response } = await axios.get(url, { params });

    if (status !== 200) {
      return getPayload(status, response.error_description, response);
    }
    return response;
  } catch (e) {
    return getPayload(ERROR_REQUEST_FAILED);
  }
};

export { getSiteSearchApiData };
