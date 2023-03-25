import React, { useContext, useEffect, useState } from 'react';
import { NavLink, useParams, useNavigate } from 'react-router-dom';
import { updatedata } from './context/ContextProvider.js';

const Edit = () => {

    // const [getuserdata, setUserdata] = useState([]);
    // console.log(getuserdata)

    const history = useNavigate("");
    const {updata, setUPdata} = useContext(updatedata);

    const [inpval, setINP] = useState({
        name: "",
        email: "",
        age: "",
        mobile: "",
        work: "",
        add: "",
        desc: ""
    })

    const setdata = (e) => {
        console.log(e.target.value);
        const { name, value } = e.target;
        setINP((preval) => {
            return {
                ...preval,
                [name]: value
            }
        })
    }


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
            setINP(data)
            console.log(" get data added");
        }
    }

    useEffect(()=>{
        getdata();
    },[])

    const updateuser = async(e)=>{
        e.preventDefault();

        const {name,email,work,add,mobile,desc,age} = inpval; 

        const res2 =  await fetch(`/updateuser/${id}`,{
            method:"PATCH",
            headers:{
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                name,email,work,add,mobile,desc,age
            })  
        });

        const data3 = await res2.json();
        console.log(data3);

        if(res2.status === 404 || !data3){
            alert("fill the data")
        }else{
            alert("data added");
            history.push("/");
            setUPdata(data3);
        }
    }


    return (
        <div className="container">
            <NavLink to="/">home2</NavLink>
            <form className="mt-4">
            <div className="row">
                 
            <div class="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputEmail1" class="form-label">Name</label>
            <input type="text" name="name" value={inpval.name} onChange={setdata} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
            <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
            </div>

            <div class="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputPassword1" class="form-label">email</label>
            <input type="email" value={inpval.email} onChange={setdata} name="email" class="form-control" id="exampleInputPassword1" />
            </div>
            
            <div class="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputPassword1" class="form-label">age</label>
            <input type="text" value={inpval.age} onChange={setdata} name="age" class="form-control" id="exampleInputPassword1" />
            </div>
            
            <div class="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputPassword1" class="form-label">Mobile</label>
            <input type="number" value={inpval.mobile} onChange={setdata} name="mobile" class="form-control" id="exampleInputPassword1" />
            </div>
            
            <div class="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputPassword1" class="form-label">Work</label>
            <input type="text" value={inpval.work} onChange={setdata} name="work" class="form-control" id="exampleInputPassword1" />
            </div>
            
            <div class="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputPassword1" class="form-label">Address</label>
            <input type="text" value={inpval.add} onChange={setdata} name="add" class="form-control" id="exampleInputPassword1" />
            </div>

            <div class="mb-3 col-lg-12 col-md-12 col-12">
            <label for="exampleInputPassword1" class="form-label">Description</label>
            <textarea name="desc" value={inpval.desc} onChange={setdata} className="form-control" id="" cols="30" rows="5"></textarea>
            </div>
            <button type="submit" onClick={updateuser} class="btn btn-primary">Submit</button>
            </div>
            </form>
        </div>
        )
}

export default Edit