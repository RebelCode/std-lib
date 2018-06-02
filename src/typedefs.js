/**
 * Http promise-based client.
 *
 * @since [*next-version*]
 *
 * @typedef {Object} HttpClient
 *
 * @property {RequestHttpFunction} request Perform request to given URL
 */

/**
 * Request function in http client.
 *
 * @since [*next-version*]
 *
 * @function RequestHttpFunction
 *
 * @param {HttpRequestConfig} config Request configuration
 *
 * @return {Promise<any>}
 */

/**
 * Configuration object for request function.
 *
 * @since [*next-version*]
 *
 * @typedef {Object} HttpRequestConfig
 *
 * @property {string} method Http method
 * @property {string} url URL to send request on
 * @property {object} data Data that will be sent
 */

/**
 * Rule to apply in transformer.
 *
 * @callback TransformerRuleCallback
 *
 * @since [*next-version*]
 *
 * @param {Object} model Model to transform
 *
 * @return {Object} Transformed model
 */
