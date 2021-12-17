import React, { FC, useContext } from "react";

import Wrapper from "./Wrapper";

import Content from "./Content";
import LeftContent from "./LeftContent";
import RightContent from "./RightContent";
import MobileMenuButton from "./MobileMenuButton";
import Logo from "./Logo";
import Navigation from "./Navigation";
import NewEvent from "./NewEvent";
import Profile from "./Profile";
import UserNavigation from "./UserNavigation";
import MobileMenuPanel from "./MobileMenuPanel";
import MobileNavigation from "./MobileNavigation";
import MobileProfile from "./MobileProfile";
import MobileUserNavigation from "./MobileUserNavigation";
import MobileUserInfo from "./MobileUserInfo";
import MobileUserPic from "./MobileUserPic";
import MobileUserNameEmail from "./MobileUserNameEmail";
import Border from "../Border";
import UserContext from "../../Contexts/UserContext";

interface Props {}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const navigation: any[] = [
  // { name: "", href: "", current: false },
  // { name: "Team", href: "#", current: false },
  // { name: "Projects", href: "#", current: false },
  // { name: "Calendar", href: "#", current: false },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const userNavigation: any[] = [
  // { name: "Your Profile", href: "/user" },
  // { name: "Settings", href: "/settings" },
  { name: "Sign out", href: "/logout" },
];

const Nav: FC<Props> = () => {
  const user = useContext(UserContext);
  return (
    <>
      <Wrapper>
        {({ open }: { open: boolean }) => (
          <>
            <Border>
              <Content>
                <LeftContent>
                  <MobileMenuButton open={open} />
                  <Logo />
                  <h1 className=" flex flex-col justify-center items-center m-2 text-white font-bold text-2xl tracking-wide">
                    Split The Bill
                  </h1>
                  <Navigation navigation={navigation} />
                </LeftContent>
                {user && (
                  <RightContent>
                    <NewEvent />
                    <Profile>
                      <UserNavigation
                        open={open}
                        userNavigation={userNavigation}
                      />
                    </Profile>
                  </RightContent>
                )}
              </Content>
            </Border>

            <MobileMenuPanel>
              <MobileNavigation navigation={navigation} />
              <MobileProfile>
                <MobileUserInfo>
                  <MobileUserPic />
                  <MobileUserNameEmail />
                </MobileUserInfo>
                <MobileUserNavigation userNavigation={userNavigation} />
              </MobileProfile>
            </MobileMenuPanel>
          </>
        )}
      </Wrapper>
    </>
  );
};

export default Nav;
