import ApiError from "./ApiError";

// its a HOF which handles our controllers try catch
const asyncHandler = (fn) => async (req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

export default asyncHandler;
