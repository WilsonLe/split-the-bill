import React, { FC, useContext } from "react";
import { Redirect, useLocation } from "react-router-dom";
import { AiOutlineGoogle } from "react-icons/ai";
import UserContext from "../../Contexts/UserContext";
import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
import { auth } from "../../../firebase.config";

interface Props {}

const Login: FC<Props> = () => {
  const user = useContext(UserContext);
  const query = new URLSearchParams(useLocation().search);
  const eventCode = query.get("code");

  const sign_in = () => {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider);
    // signInWithPopup(auth, provider);
  };

  return (
    <>
      {user && !eventCode && <Redirect to="/" />}
      {user && eventCode && <Redirect to={`/event?code=${eventCode}`} />}
      <div className="bg-gray-50 w-screen h-screen fixed">
        <div className="max-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <img
              className="mx-auto h-24 w-auto"
              src="https://i.ibb.co/zGK9TVQ/unnamed.png"
              alt="Split The Bill logo"
            />
            <h2 className="text-center text-3xl font-extrabold text-gray-900">
              Sign in to your account
            </h2>
          </div>

          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 top-7 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">
                      Continue with
                    </span>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-3 gap-3">
                  <div></div>

                  <div>
                    <button
                      onClick={sign_in}
                      className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                    >
                      <span className="sr-only">Sign in with Google</span>
                      <AiOutlineGoogle size={36} />
                    </button>
                  </div>

                  <div></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
