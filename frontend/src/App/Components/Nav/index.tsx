import React, { FC, Fragment } from "react";
import { Disclosure } from "@headlessui/react";
import { BellIcon } from "@heroicons/react/outline";

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

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const Nav: FC<Props> = (props) => {
  const user = {
    name: "Tom Cook",
    email: "tom@example.com",
    imageUrl:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  };

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
                  <Profile open={open} userNavigation={userNavigation} />
                </RightContent>
              </Content>
            </Border>

            <Disclosure.Panel className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={classNames(
                      item.current
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "block px-3 py-2 rounded-md text-base font-medium"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              <div className="pt-4 pb-3 border-t border-gray-700">
                <div className="flex items-center px-5 sm:px-6">
                  <div className="flex-shrink-0">
                    <img
                      className="h-10 w-10 rounded-full"
                      src={user.imageUrl}
                      alt=""
                    />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-white">
                      {user.name}
                    </div>
                    <div className="text-sm font-medium text-gray-400">
                      {user.email}
                    </div>
                  </div>
                  <button className="ml-auto flex-shrink-0 bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="mt-3 px-2 space-y-1 sm:px-3">
                  {userNavigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Wrapper>
    </>
  );
};

export default Nav;
