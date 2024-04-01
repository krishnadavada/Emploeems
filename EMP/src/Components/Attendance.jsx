import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Attendance() {
  const [employees, setEmployees] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]); // Default to today's date
  const [attendanceData, setAttendanceData] = useState({});

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('http://localhost:3000/auth/employee');
      setEmployees(response.data.Result);
      // Initialize attendance data object with default values
      const initialAttendanceData = {};
      response.data.Result.forEach(employee => {
        initialAttendanceData[employee.id] = 'Present'; // Default to 'Present' status
      });
      setAttendanceData(initialAttendanceData);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const handleAttendanceChange = (id, status) => {
    setAttendanceData(prevAttendanceData => ({
      ...prevAttendanceData,
      [id]: status,
    }));
  };

  const handleAttendanceSubmit = async () => {
    try {
      const attendanceRecords = [];
      for (const id in attendanceData) {
        attendanceRecords.push({
          emp_id: id,
          status: attendanceData[id],
          date: selectedDate,
        });
      }
      await axios.post('http://localhost:3000/auth/attendance', attendanceRecords);
      console.log('Attendance submitted successfully');
      alert('Attendance submitted successfully!!'); // Show alert
    } catch (error) {
      console.error('Error submitting attendance:', error);
    }
  };
  

  return (
    <div className='px-5 mt-3'>
        <div className='d-flex justify-content-center'>
            <h3>Take Attendance</h3>
        </div>
      <label htmlFor="date">Select Date:</label>
      
      <input type="date" id="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
 
<span style={{ marginLeft: '700px' }}> <button onClick={handleAttendanceSubmit} className='btn btn-info'>Submit</button>
</span>

      <div className="mt-3">
        <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Present</th>
            <th>Absent</th>
            <th>Leave</th>
            <th>Holiday</th>

          </tr>
        </thead>
        <tbody>
  {employees.map(employee => (
    <tr key={employee.id}>
      <td>{employee.name}</td>
      <td className="status-buttons">
        <label>
          <input type="radio" name={`attendance-${employee.id}`} value="Present" checked={attendanceData[employee.id] === 'Present'} onChange={() => handleAttendanceChange(employee.id, 'Present')} />
          Present
        </label>
      </td>
      <td> <label>
          <input type="radio" name={`attendance-${employee.id}`} value="Absent" checked={attendanceData[employee.id] === 'Absent'} onChange={() => handleAttendanceChange(employee.id, 'Absent')} />
          Absent
          </label>
      </td>
       <td>
       <label>
          <input type="radio" name={`attendance-${employee.id}`} value="Leave" checked={attendanceData[employee.id] === 'Leave'} onChange={() => handleAttendanceChange(employee.id, 'Leave')} />
          Leave
        </label>
       </td>
       
        <td>  
          <label>
          <input type="radio" name={`attendance-${employee.id}`} value="Holiday" checked={attendanceData[employee.id] === 'Holiday'} onChange={() => handleAttendanceChange(employee.id, 'Holiday')} />
          Holiday
        </label>
        </td>
    </tr>
  ))}
</tbody>

      </table>
    </div>
    </div>
    
  );
}

export default Attendance;