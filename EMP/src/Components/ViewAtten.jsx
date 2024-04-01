import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewAtten = () => {
    const [attendanceData, setAttendanceData] = useState([]);

    useEffect(() => {
      fetchAttendanceData();
    }, []);
  
    const fetchAttendanceData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/auth/attendances');
        setAttendanceData(response.data);
      } catch (error) {
        console.error('Error fetching attendance data:', error);
      }
    };
  
  return (
    <div className="px-5 mt-3">
    <div className="d-flex justify-content-center">
      <h3>View Attendance</h3>
    </div>
 
    <div className="mt-3">
      <table className="table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Date</th>
            <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {attendanceData.map((record, index) => (
          <tr key={index}>
            <td>{record.emp_id}</td>
            <td>{record.date}</td>
            <td>{record.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  </div>
);
  
}

export default ViewAtten





 


