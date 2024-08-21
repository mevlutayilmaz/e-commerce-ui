import React, { useState, useEffect } from "react";
import { getAuthorizeDefinitonEnpoints } from "../../api/endpoints";
import EndpointActions from "../../components/Admin/AdminEnpoint/EndpointActions";

const AdminEndpoints = () => {
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

export default AdminEndpoints;
