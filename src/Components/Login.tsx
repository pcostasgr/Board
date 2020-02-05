import React from 'react';
import {Redirect,useHistory,useLocation} from 'react-router-dom'

const Login=():any=>{

    const history=useHistory();

    const loginAction=():any=>{
        
        history.push("/board");
    };

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
                                //value={this.state.email}
                                //onChange={this.handleChange}
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
                                //value={this.state.password}
                                //onChange={this.handleChange}
                                id="password"
                                placeholder="Enter your password."
                            />
                        </td>
                    </tr>
                </tbody></table>

                    <button onClick={ ()=>{ loginAction();} } >login</button>
        </div>
};

export default Login;