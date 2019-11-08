import API from './config';

const ERROR_NONE = 0;
const ERROR_REQUEST_FAILED = 10000;
const errMap = new Map([
  [ERROR_NONE, 'Success'],
  [ERROR_REQUEST_FAILED, 'Request to nununi API failed.']
]);

function getPayload(errCode = ERROR_NONE, errMsg = '', result = '') {
  return {
    errcode: errCode,
    errmsg: errMsg || errMap.get(errCode) || 'Undefined error.',
    result
  };
}

const getSuggestionApiData = async (
  id = process.env.NUNUNI_ID,
  version,
  params,
) => {
  const url = `/search/${version}/${id}/termSuggestions`;

  try {
    const { status, data: response } = await API.get(url, { params });
    if (status !== 200) {
      return getPayload(status, response.error_description, response);
    }
    return response;
  } catch (e) {
    return getPayload(ERROR_REQUEST_FAILED);
  }
};

const getSiteSearchApiData = async (
  id = process.env.NUNUNI_ID,
  version,
  params,
) => {
  const url = `/search/${version}/${id}/products`;

  try {
    const { status, data: response } = await API.get(url, { params });

    if (status !== 200) {
      return getPayload(status, response.error_description, response);
    }
    return response;
  } catch (e) {
    return getPayload(ERROR_REQUEST_FAILED);
  }
};

export { getSiteSearchApiData, getSuggestionApiData };
