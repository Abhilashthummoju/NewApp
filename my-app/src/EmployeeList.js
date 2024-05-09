import React from "react";

const EmployeeList = ({ employees }) => {
  console.log("employee data",employees)
  return (
    <div>
      <h2>Total Count: {employees.length}</h2>
      <div>
        <input type="text" placeholder="Enter Search Keyword" />
        <select>
          <option value="name">Name</option>
          <option value="email">Email</option>
          <option value="designation">Designation</option>
          <option value="course">Course</option>
          <option value="date">Create Date</option>
        </select>
        <button>Search</button>
      </div>
      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th style={styles.th}>Unique Id</th>
            <th style={styles.th}>Image</th>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Email</th>
            <th style={styles.th}>Mobile No</th>
            <th style={styles.th}>Designation</th>
            <th style={styles.th}>Gender</th>
            <th style={styles.th}>Course</th>
            <th style={styles.th}>Action</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee, index) => (
            <tr key={index}>
              <td style={styles.td}>{index + 1}</td>
              <td style={styles.td}><img src={employee.img} alt="avatar" /></td>
              <td style={styles.td}>{employee.name}</td>
              <td style={styles.td}>{employee.email}</td>
              <td style={styles.td}>{employee.mobile}</td>
              <td style={styles.td}>{employee.Designation}</td>
              <td style={styles.td}>{employee.Gender}</td>
              <td style={styles.td}>{employee.Courses}</td>
              <td style={styles.td}>
                <button>Edit</button>
                <button>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  th: {
    border: "1px solid #ddd",
    padding: "8px",
    textAlign: "left",
  },
  td: {
    border: "1px solid #ddd",
    padding: "8px",
    textAlign: "left",
  },
};

export default EmployeeList;
