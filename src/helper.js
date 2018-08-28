/**
 * Get the page number in the props passing to App component
 * @param {Object} props
 * @param {Object} props.match
 * @param {Object} props.match.params
 * @returns {number}
 */
export const getPageFromProps = props => getParamFromProps(props, 'page');

/**
 * Get the choosed (by key) param in the props passing to App component
 * @param {Object} props
 * @param {Object} props.match
 * @param {Object} props.match.params
 * @param {string} key The key of this props we want to extract from the `props` object
 * @returns {?number} Return `null` when the param is not a valid number, such as "1a2"
 */
export const getParamFromProps = (props, key) => {
  const result = Number(props.match.params[key]);
  if (Number.isNaN(result)) {
    return null;
  }
  return result;
};

/**
 * @param {Object} params
 * @param {string} page
 * @param {string} pageSize
 */
export const isUrlParamsBad = params =>
  params.page === undefined ||
  params.pageSize === undefined ||
  Number.isNaN(Number(params.page)) === true ||
  Number.isNaN(Number(params.pageSize)) === true;
