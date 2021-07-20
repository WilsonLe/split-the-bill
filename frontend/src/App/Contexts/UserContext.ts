import { createContext } from "react";
import { firebase } from "../../firebase.config";

type DummyUser = firebase.User | undefined | null;
let user: DummyUser;
const UserContext = createContext(user);

export default UserContext;
