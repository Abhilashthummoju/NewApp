import React, { useState,useEffect } from "react";
import NavBar from "./NavBar";
import EmployeeList from "./EmployeeList";

const Employee = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [Designation, setDesignation] = useState("");
    const [Gender, setGender] = useState("");
    const [Courses, setCourses] = useState([]);
    const [img, setImg] = useState(null);
    const [showList, setShowList] = useState(true);
    const [employeeData, setEmployeeData] = useState([]);

    useEffect(() => {
        getEmployees();
    }, []);


    const handleSubmit = () => {
        console.log("RE")
        const employeeData = { name, email, mobile, Designation, Gender, Courses, img };
        console.log("abhiiii",employeeData)
        createEmployee(employeeData);
    };
    

    const getEmployees = async () => {
        try {
            const response = await fetch('http://localhost:5001/employees');
            const ResponseBody = await response.json()
            console.log("RESPONSE DARA",ResponseBody)
            if (!response.ok) {
                throw new Error('Failed to fetch employee data');
            }
            setEmployeeData(ResponseBody);
        } catch (error) {
            console.error('Error fetching employee data:', error);
        }
    };

    const createEmployee = async (employeeData) => {
        try {
            const response = await fetch('http://localhost:5001/createEmployee', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(employeeData)
            });
    
            if (!response.ok) {
                throw new Error('Failed to create employee');
            }
    
            const data = await response.json();
            console.log('Employee created successfully:', data);
        } catch (error) {
            console.error('Error creating employee:', error.message);
        }
    };
    
    return (
        <div>
            <NavBar />
            <div style={{padding:6}}>
                <button onClick={()=>{setShowList(true)}}>Employee List</button>
                <button style={{position:'absolute',right:5}} onClick={()=>{setShowList(false)}}>Create Employee</button>
            </div>
            {!showList?<div style={styles.formContainer}>
                <div>
                <div style={{flexDirection:'row',display:'flex',alignItems:'center'}}>
                    <label style={{fontFamily:'initial',fontSize:15}}>Name:</label>
                    <input style={styles.input}type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>
                </div>
                <div style={{flexDirection:'row',display:'flex',alignItems:'center'}}>
                    <label style={{fontFamily:'initial',fontSize:15}}>Email:</label>
                    <input style={styles.input} type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div style={{flexDirection:'row',display:'flex',alignItems:'center'}}>
                    <label style={{fontFamily:'initial',fontSize:15}}>Mobile No:</label>
                    <input style={styles.input} type="text" value={mobile} onChange={(e) => setMobile(e.target.value.replace(/\D/, ''))} required />
                    </div>
                    <div style={{flexDirection:'row',display:'flex',alignItems:'center'}}>
                    <label style={{fontFamily:'initial',fontSize:15}}>Designation:</label>
                    <select style={styles.input} value={Designation} onChange={(e) => setDesignation(e.target.value)} required>
                        <option value="">Select Designation</option>
                        <option value="HR">HR</option>
                        <option value="Manager">Manager</option>
                        <option value="Sales">Sales</option>
                    </select>
                    </div>
                    <div style={{flexDirection:'row',display:'flex',alignItems:'center'}}>
                    <label  style={{fontFamily:'initial',fontSize:15}}>Gender:</label>
                    <label style={{display:'flex',alignItems:'center'}}><input  style={{ width: "20px", height: "20px",margin:10  }}  type="radio" value="Male" checked={Gender === "Male"} onChange={() => setGender("Male")} /> Male</label>
                    <label style={{display:'flex',alignItems:'center'}}><input   style={{ width: "20px", height: "20px",margin:10 }}  type="radio" value="Female" checked={Gender === "Female"} onChange={() => setGender("Female")} /> Female</label>
                    </div>
                    <div style={{flexDirection:'row',display:'flex',alignItems:'center'}}>
                    <label style={{fontFamily:'initial',fontSize:15}}>Course:</label>
                    <label style={{display:'flex',alignItems:'center'}}><input style={{ width: "20px", height: "20px",margin:10  }} type="checkbox" value="MCA" checked={Courses.includes("MCA")} onChange={(e) => setCourses([...Courses, "MCA"])} /> MCA</label>
                    <label style={{display:'flex',alignItems:'center'}}><input style={{ width: "20px", height: "20px",margin:10  }} type="checkbox" value="BCA" checked={Courses.includes("BCA")} onChange={(e) => setCourses([...Courses, "BCA"])} /> BCA</label>
                    <label style={{display:'flex',alignItems:'center'}}><input style={{ width: "20px", height: "20px",margin:10  }} type="checkbox" value="BSC" checked={Courses.includes("BSC")} onChange={(e) => setCourses([...Courses, "BSC"])} /> BSC</label>
                    </div>
                    <div style={{flexDirection:'row',display:'flex',alignItems:'center'}}>
                    <label style={{fontFamily:'initial',fontSize:15}}>Img Upload:</label>
                    <input type="file" accept="image/*" onChange={(e) => setImg(e.target.files[0])} />
                    </div>
                    <button type="submit" onClick={handleSubmit}>Submit</button>
            </div>:<><EmployeeList employees={employeeData}/></>}
            
        </div>
    );
};

const styles = {
    formContainer: {
        maxWidth: 600,
        // margin: "auto",
        padding: 20
    },
    input:{flex: 1,
        padding: 10,
        border: "1px solid #ccc",
        borderRadius: 5,
        backgroundColor: "#fff",
        fontSize: 16,
        marginLeft:10,
        borderWidth:3}
};

export default Employee;
