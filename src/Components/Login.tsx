import React,{useState} from 'react';
import {useDispatch} from 'react-redux';

import {Redirect,useHistory,useLocation} from 'react-router-dom'
import { EROFS } from 'constants';
import {doLoginUser} from './../Api/LoginApi';
import { authenticationService } from '../Model/Users';

const Login=()=>{

    const history=useHistory();
    const dispatch=useDispatch();
    const [userMail,setUserMail]=useState("user@supermail.com");
    const [userPass,setUserPass]=useState("");
    const [errorMsg,setErrorMsg]=useState("");

    const loginAction=async ()=>{
        
        if(userMail && userPass==='123456'){
                history.push("/board");
        }else{
            const response=await doLoginUser(userMail,userPass);
            var userid=authenticationService.currentUserValue.userId;
            console.log("userid:" + userid);
            if(userid>0){
                history.push('/board');
            }else{
                setErrorMsg("Invalid password,see tip below !");
            }
            
        }
        
    };

    const onMailChange=(event:any)=>{
        setUserMail(event.target.value);
    }

    const onPassChange=(event:any)=>{
        setUserPass(event.target.value);
    }

    return <div>
                Trello Clone Yeditech 2020 pcostasgr@gmail.com
                <hr></hr>
                <table><tbody>
                    <tr>
                        <td>
                            <label >Email</label>
                        </td>
                        <td>
                            <input
                                type="text"
                                name="email"
                                value={userMail}
                                onChange={onMailChange}
                                id="email"
                                placeholder="Enter your email address."
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label >Password</label>
                        </td>
                        <td>
                            <input
                                type="password"
                                name="password"
                                value={userPass}
                                onChange={onPassChange}
                                id="password"
                                placeholder="Enter your password."
                            />
                        </td>
                    </tr>
                </tbody></table>

                    <button onClick={ ()=>{ loginAction();} } >login</button>
                    <p></p><span style={{color:"#ff0000"}} >{errorMsg}</span>
                   <p></p> <span>tip password:123456 if net server not running else use test/test</span>
                   
        </div>
};

export default Login;