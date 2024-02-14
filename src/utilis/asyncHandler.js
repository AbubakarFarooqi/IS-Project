import ApiError from "./ApiError";

// its a HOF which handles our controllers try catch
const asyncHandler = (fn) => async (req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (error) {
    throw new ApiError(500, error.message);
  }
};

export default asyncHandler;
