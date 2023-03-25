import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useParams, NavLink, useNavigate } from 'react-router-dom';

const Details = () => {

    const [getuserdata, setUserdata] = useState([]);
    console.log(getuserdata)

    const history = useNavigate();


    const {id} = useParams("");
    console.log(id);

    const getdata = async()=>{

        const res = await fetch(`/getuser/${id}`,{
            method:"GET",
            headers:{
                "Content-Type": "application/json"
            }        
        });

        const data = await res.json();
        console.log(data);

        if (res.status === 404 || !data) {
            console.log("error ");

        } else {
            setUserdata(data)
            console.log(" get data");
        }
    }

    useEffect(()=>{
        getdata();
    })

    const deleteuser = async (id)=>{
    
        const res2 = await fetch(`/deleteuser/${id}`,{
            method:"DELETE",
            headers:{
                "Content-Type": "application/json"
            }        
        });
        const deletedata = await res2.json();
        console.log(deletedata); 
    
        if (res2.status === 404 || !deletedata) {
            console.log("error ");
    
        } else {
            console.log(" user deleted");
            history.push("/");
        }
       }
    


    return (
        <div className="container mt-3">
            <h1 style={{ fontWeight: 400 }}>Welcome Karthik Firm</h1>
            
            <Card sx={{ maxWidth: 600 }}>
            <CardContent>
            <div className="add_btn">
              <NavLink to={`/edit/${getuserdata._id}`}><button className="btn btn-primary mx-2"><i class="fas fa-pencil"></i></button></NavLink>
              <button className="btn btn-danger" onClick={()=>deleteuser(getuserdata._id)}><i class="fas fa-trash"></i></button>
             </div>
            <div className="row">
            <div className="left_view col-lg-6 col-md-6 col-12">
                <h3 className="mt-3">name: <span style={{fontweight:400}}>{getuserdata.name}</span></h3>
                <h3 className="mt-3">Age: <span style={{fontweight:400}}>{getuserdata.age}</span></h3>
                <p className="mt-3"><i class="fas fa-envelope"></i>Email: <span>{getuserdata.email}</span></p>
                <p className="mt-3"><i class="fas fa-briefcase"></i>Occuption: <span>{getuserdata.work}</span></p>
                </div>
                <div className="right_view  col-lg-6 col-md-6 col-12">
                
                <p className="mt-5"><i class="fas fa-mobile"></i>mobile: <span>+91 {getuserdata.mobile} </span></p>
                <p className="mt-3"><i class="fas fa-location"></i>location: <span>{getuserdata.add}</span></p>
                <p className="mt-3">Description: <span>{getuserdata.desc}</span></p>
                </div>
                </div>
            </CardContent>
            </Card>
        </div>
    )
}

export default Details