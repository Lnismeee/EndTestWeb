/**
 * operate like async/await
 * any error will next to error-handler function
 */
// @ts-ignore
const asyncHandler = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

export default asyncHandler

