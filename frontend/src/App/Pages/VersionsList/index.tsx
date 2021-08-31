import { CalendarIcon } from "@heroicons/react/outline";
import React, { FC, useEffect, useState } from "react";
import { db } from "../../../firebase.config";
import Border from "../../Components/Border";
import { Versions, Version } from "../../interfaces";

interface Props {}

const VersionsList: FC<Props> = () => {
  const [versions, setVersions] = useState<Versions>([]);

  useEffect(() => {
    let isSubscribe = true;
    (async () => {
      try {
        const versionsRef = await db.collection("versions").limit(5).get();
        const versions = versionsRef.docs.map((ver) => ver.data() as Version);
        if (isSubscribe) {
          setVersions(versions);
        }
      } catch (error) {
        console.log(error);
      }
    })();
    return () => {
      isSubscribe = false;
    };
  }, []);

  return (
    <>
      <Border>
        <div className="bg-white px-4 py-5 border-b border-gray-200 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Versions
          </h3>
        </div>
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {versions.map((version) => (
              <li key={version.version}>
                <div className="block hover:bg-gray-50">
                  <div className="px-4 py-4 flex items-center sm:px-6">
                    <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                      <div className="truncate flex flex-col">
                        <div className="flex text-sm">
                          <p className="font-medium text-indigo-600 truncate">
                            {version.version}
                          </p>
                        </div>
                        <p className="text-sm text-gray-500 mt-2">
                          {version.note}
                        </p>
                        <div className="mt-2 flex">
                          <div className="flex items-center text-sm text-gray-500">
                            <CalendarIcon
                              className="flex-shrink-0 mr-1.5 h-5 w-5 text-sm text-gray-400"
                              aria-hidden="true"
                            />
                            <p>
                              Posted on{" "}
                              <time
                                dateTime={version.createdAt.toDate().toString()}
                              >
                                {version.createdAt.toDate().toDateString()}
                              </time>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Border>
    </>
  );
};

export default VersionsList;
