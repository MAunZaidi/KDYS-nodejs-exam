import UserSchema from "../model/Usermodel.js"

//Register Logic
const UserRegister = async (req, res, next) => {
  const { name, password } = req.body
  if (!name || !password) {
    next("please fill all the fields")
  }
  const user = await UserSchema.create({ name, password })
  return res.status(202).json({
    message: 'User has been Registered',
    success: true,
    user: {
      name: user.name,
      password: user.password,
    }
  })
}

//Login Logic  
export const UserLogin = async (req, res, next) => {
  const { name, password } = req.body;

  if (!name || !password) {
    next("Fill all the fields")
  }

  const user = await UserSchema.findOne({ name });

  if (!user) {
    next("User not found")
  }

  const isPasswordValid = await user.Compared(password);
  if (!isPasswordValid) {
    return res.status(404).json({ message: "Password is incorrect", success: false });
  }

  const token = user.createJWT();
  return res
    .status(202)
    .json({ 
      message: "User has been logged in", 
      success: true, 
      user, 
      token });
};

export default UserRegister;