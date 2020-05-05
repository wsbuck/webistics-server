const jwtSecret = process.env.JWT_SECRET;
const expiresIn = 3600 * 8; // 8 hours

const jwtConfig = {
  jwtSecret,
  expiresIn,
};

export default jwtConfig;
