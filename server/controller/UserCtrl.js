import bcrypt from "bcrypt";
const SALT_ROUND = 10;

const findAllUser = async (req, res) => {
  const result = await req.context.models.users.findAll();
  return res.send(result);
};

const signup = async (req, res, next) => {
  const { username, email, user_password, user_handphone, user_roles, pin } =
    req.body;

  let hashPassword = user_password;
  hashPassword = await bcrypt.hash(hashPassword, SALT_ROUND);

  try {
    const result = await req.context.models.users.create({
      user_name: username,
      user_email: email,
      user_password: hashPassword,
      user_handphone: user_handphone,
      user_roles: user_roles,
    });
    /* const { user_name, user_email } = result.dataValues;
    return res.send({ user_name, user_email }); */
    req.pin = pin;
    req.user = result.dataValues;
    return next();
  } catch (error) {
    return res.sendStatus(404).send(error);
  }
};

const signin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await req.context.models.users.findOne({
      where: { user_name: username },
    });
    const { user_name, user_email, user_password } = result.dataValues;
    const compare = await bcrypt.compare(password, user_password);
    if (compare) {
      return res.send({ user_name, user_email });
    } else {
      return res.send("Wrong Username or Password");
    }
  } catch (error) {
    return res.sendStatus(404);
  }
};

export default {
  findAllUser,
  signup,
  signin,
};
