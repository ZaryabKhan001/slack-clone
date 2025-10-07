export const verifyUser = async (req, res, next) => {
  try {
    if (!req?.auth().isAuthenticated) {
      return res.status(400).json({
        success: false,
        message: 'Not Authenticated',
      });
    }
    next();
  } catch (error) {
    console.log('Failed in verifying user', error);
  }
};
