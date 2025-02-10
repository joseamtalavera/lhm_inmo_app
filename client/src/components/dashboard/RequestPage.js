import React, { useState, useEffect} from "react";
import RequestBox from "./RequestBox";
import Orders from "./Orders";

const RequestPage = () => {
    const [requests, setRequests] = useState([]);

    const fetchRequests = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/requests`);
            if (response.ok) {
                const data = await response.json();
                setRequests(data);
            } else {
                console.error("Error fetching requests:");
            }
        } catch (error) {
            console.error("Error fetching requests:", error);
        }
    }

    // Fetch requests on component mount
    useEffect(() => {
        fetchRequests();
    }, []);

    return (
        <div>
            <RequestBox />
            <Orders requests={requests} />
        </div>
    );
};

export default RequestPage;
