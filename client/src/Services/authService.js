import { userLogin, userRegister } from "../Redux/features/auth/authActions";
import store from "../Redux/store";

export const handleLogin = (e, email, password, role) => {
  e.preventDefault();
  try {
    if (!role || !email || !password) {
      return ("Please Privde All Feilds");
    }
    store.dispatch(userLogin({ email, password, role }));
  } catch (error) {
    console.log(error);
  }
};

export const handleRegister = (
  e,
  name,
  role,
  email,
  password,
  phone,
  bloodGroup,
  organisationName,
  address,
  hospitalName,
) => {
  e.preventDefault();
  try {
    
    store.dispatch(
      userRegister({
        name,
        role,
        email,
        password,
        phone,
        bloodGroup,
        organisationName,
        address,
        hospitalName,
      })
    );
  } catch (error) {
    console.log(error);
  }
};