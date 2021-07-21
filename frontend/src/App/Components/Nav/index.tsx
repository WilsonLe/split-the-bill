import React, { FC, Fragment } from "react";

import Wrapper from "./Wrapper";
import Border from "./Border";
import Content from "./Content";
import LeftContent from "./LeftContent";
import RightContent from "./RightContent";
import MobileMenuButton from "./MobileMenuButton";
import Logo from "./Logo";
import Navigation from "./Navigation";
import NewJob from "./NewJob";
import Profile from "./Profile";
import Bell from "./Bell";
import UserNavigation from "./UserNavigation";
import MobileMenuPanel from "./MobileMenuPanel";
import MobileNavigation from "./MobileNavigation";
import MobileProfile from "./MobileProfile";
import MobileBell from "./MobileBell";
import MobileUserNavigation from "./MobileUserNavigation";
import MobileUserInfo from "./MobileUserInfo";
import MobileUserPic from "./MobileUserPic";
import MobileUserNameEmail from "./MobileUserNameEmail";

interface Props {}

const navigation: any[] = [
  // { name: "", href: "", current: false },
  // { name: "Team", href: "#", current: false },
  // { name: "Projects", href: "#", current: false },
  // { name: "Calendar", href: "#", current: false },
];

const userNavigation: any[] = [
  { name: "Your Profile", href: "/user" },
  { name: "Settings", href: "/settings" },
  { name: "Sign out", href: "/logout" },
];

const Nav: FC<Props> = () => {
  return (
    <>
      <Wrapper>
        {({ open }: { open: Boolean }) => (
          <>
            <Border>
              <Content>
                <LeftContent>
                  <MobileMenuButton open={open} />
                  <Logo />
                  <Navigation navigation={navigation} />
                </LeftContent>
                <RightContent>
                  <NewJob />
                  <Profile>
                    <Bell />
                    <UserNavigation
                      open={open}
                      userNavigation={userNavigation}
                    />
                  </Profile>
                </RightContent>
              </Content>
            </Border>

            <MobileMenuPanel>
              <MobileNavigation navigation={navigation} />
              <MobileProfile>
                <MobileUserInfo>
                  <MobileUserPic />
                  <MobileUserNameEmail />
                  <MobileBell />
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
