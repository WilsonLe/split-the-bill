import { createContext } from "react";
import { User as FirebaseUser } from "firebase/auth";

type User = FirebaseUser | undefined | null;
let defaultUser: User;
const UserContext = createContext(defaultUser);

export default UserContext;
