//处理用户注册和登录的控制器, 不要和用户控制器混在一起
const getLogger = require("../common/logger");
const User = require("../models/user.model");
const bcrypt = require("bcrypt");

const logger = getLogger(__filename);
const { generateToken, verifyToken } = require("../common/utils/jwt");
const register = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    //check if username duplicated
    const exisitingUser = await User.findOne({ username });
    if (exisitingUser) {
      return res.formatResponse(`${username} already exists`, 409); //401表示资源不存在 409表示资源冲突
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({ username, password: hashedPassword });
    res.formatResponse({ username }, 201);
  } catch (error) {
    logger.info(error);
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.formatResponse("Incorrect username and password", 401); //401表示资源不存在 409表示资源冲突
    }
    if (!(await bcrypt.compare(password, user.password))) {
      return res.formatResponse("Incorrect username and password", 401); //401表示资源不存在 409表示资源冲突
    }
    const token = generateToken({
      sub: user.id,
      username: user.username,
    //   role: 'admin',
    });
    res.formatResponse({ username, token });
  } catch (error) {
    logger.info(error);
    next(error);
  }
};

module.exports = {
  register,
  login,
};
