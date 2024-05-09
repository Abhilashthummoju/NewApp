import React, { useState,useEffect } from "react";
import NavBar from "./NavBar";

const Home = () => {
    const userDataString = localStorage.getItem('userData');
    const userDataObject = JSON.parse(userDataString);
    console.log("abhi dataaa", userDataObject.data);

  return (
   <div>
    <NavBar />
    <div style={styles.dashboard}>
        <text>DASHBOARD</text>
    </div>
    <div style={{height:700,width:"100%",padding:10,borderWidth:2,border:'solid',marginTop:10}}>
        
    </div>
   </div>
  );
};

const styles = {
    navBar:{
        backgroundColor:'#96EFFF',
        height:70,
        width:'100%',
        padding:5
    },
    dashboard:{
        display:'flex',
        alignItems:'center',
        alignSelf:'center',
        justifyContent:'center',
        width:500,
        height:50,
        borderRadius:10,
        backgroundColor:'#96EFFF',
        marginLeft:'35%',
        marginTop:5
    }
}

export default Home;















