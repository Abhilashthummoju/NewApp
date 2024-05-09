import React, { useState,useEffect } from "react";

const NavBar = () => {
    const userDataString = localStorage.getItem('userData');
    const userDataObject = JSON.parse(userDataString);
    console.log("abhi dataaa", userDataObject.data);

  return (
   <div>
    <div style={styles.navBar}>
        <button style={{margin:5,border:'solid',borderWidth:2,marginTop:8}}>HOME</button>
        <button style={{margin:5,border:'solid',borderWidth:2,marginTop:8}} onClick={()=>{window.location.href = '/employee';}}>Employee list</button>
        <div style={{position:"absolute",right:10,top:15}}>
        <text>{userDataObject.data.name}            </text>
        <button style={{margin:5,border:'solid',borderWidth:2,marginTop:8}} onClick={()=>{localStorage.clear(); window.location.href = '/auth'}}>Logout</button>
        </div>
    </div>
   </div>
  );
};

const styles = {
    navBar:{
        backgroundColor:'#ff4b2b',
        height:70,
        width:'100%',
        padding:5
    },
   
}

export default NavBar;















