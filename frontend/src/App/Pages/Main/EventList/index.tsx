import React, { FC } from "react";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";
import { firebase } from "../../../../firebase.config";
import { Event } from "../../../interfaces";

interface Props {
  eventList: Event[];
}

const EventList: FC<Props> = ({ eventList }) => {
  return (
    <div className="flex flex-col">
      <div className="my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 w-1/3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell"
                  >
                    Creator
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Event
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 w-36 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Time created
                  </th>
                  <th scope="col" className="relative px-6 py-3 w-10">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {eventList.map((event) => (
                  <tr key={uuidv4()}>
                    <td className="px-6 py-4 w-1/3 whitespace-nowrap hidden md:table-cell">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img
                            className="h-10 w-10 rounded-full"
                            src={event.creator.photoURL}
                            alt={`Profile picture of ${event.creator.displayName}`}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {event.creator.displayName}
                          </div>
                          <div className="text-sm text-gray-500">
                            {event.creator.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-md text-gray-900">{event.name}</div>
                    </td>
                    <td className="px-6 py-4 w-36 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {event.createdAt.toDate().toLocaleDateString()}
                      </div>
                      <div className="text-sm text-gray-900">
                        {event.createdAt.toDate().toLocaleTimeString()}
                      </div>
                    </td>

                    {/* <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        round green status bubble
                      </span>
                    </td> */}

                    <td className="px-6 py-4 w-10 whitespace-nowrap text-right text-sm font-medium">
                      <Link
                        to={`/event?code=${event.code}`}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
export default EventList;
