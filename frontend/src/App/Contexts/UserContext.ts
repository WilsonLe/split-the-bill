import { createContext } from "react";
import { firebase } from "../../firebase.config";

type User = firebase.User | undefined | null;
let defaultUser: User;
const UserContext = createContext(defaultUser);

export default UserContext;
