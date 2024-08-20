import React, { useState, useEffect } from "react";
import { getAuthorizeDefinitonEnpoints } from "../../api/application";
import { v4 as uuidv4 } from 'uuid';

const AdminAuthorizeMenu = () => {
  const [endpoints, setEndpoints] = useState([]);

  useEffect(() => {
    const fetchEndpoints = async () => {
      var datas = await getAuthorizeDefinitonEnpoints();
      setEndpoints(datas);
    };

    fetchEndpoints();
  }, []);

  return (
    <div className="mt-10 ml-10 mr-10 min-h-[calc(100vh-13rem)]">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Authorize Endpoints</h2>
      {endpoints.map((endpoint, index) => (
        <EndpointActions key={index} endpoint={endpoint} />
      ))}
    </div>
  );
};

const EndpointActions = ({ endpoint }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white rounded-md shadow-md mb-4 overflow-hidden">
      <div
        className="bg-gray-100 p-3 flex items-center justify-between cursor-pointer hover:bg-gray-200"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-lg font-medium text-gray-800">{endpoint.name}</h3>
        <button className="p-1 rounded-md focus:outline-none focus:bg-gray-300">
          <svg
            className={`w-5 h-5 text-gray-600 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      <div
        id={`hs-basic-tree-collapse-${uuidv4()}`}
        className={`w-full overflow-hidden transition-max-h duration-300 ease-in-out ${isOpen ? 'max-h-96' : 'max-h-0'}`}
        role="group"
      >
        <ul className="p-3 divide-y divide-gray-200">
          {endpoint.actions.map((action, index) => (
            <li
              key={index}
              className="py-2 flex items-center justify-between hover:bg-gray-50"
            >
              <span className="text-base text-gray-700">{action.definition}</span>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-1 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300">
                Add Role
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminAuthorizeMenu;