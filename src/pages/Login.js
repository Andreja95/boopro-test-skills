import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import {login} from '../services/entity-service';
import 'bootstrap/dist/css/bootstrap.css';
import styles from '../assets/css/Login.module.css';

function Login() {

    const [username, setFirstName] = useState('');
    const [password, setLastName] = useState('');

    const callLoginFunc = () => {
        login(username, password)
            .then(() => {
                history.push('/dashboard-page');
            })
            .catch((error) => {
                alert(error);
            })
    }

    const history = useHistory();

    return (
    <body className={styles.wallpaper}>
        <div className="container-fluid flex-column align-items-center h-100">
            <div className="row pt-3 px-4">
                <div className="col-6 pl-4">
                    <a href="#"><img src="https://fontmeme.com/permalink/210122/1b7bd7c714395f5af50fd1fc5bd36ad6.png" alt="netflix-font" border="0"  style={{height:'60px'}}/></a>
                </div>
                
                <div className="col-6 pl-4">
                    <button className={`btn btn-rounded btn-sm mt-2 float-right ${styles.buttons}`} onClick={() => history.push('/')}>Back to Home</button>
                </div>     
            </div>

            <div className="row align-items-center h-100">   
                <div className="col-4 mx-auto">
                    <div className="form-wraper">
                        <form className={styles.formStyle}>
                            <h3>Log in</h3>
                            <div className="form-group">
                                <label>Username</label>
                                <input type="username" className="form-control username" placeholder="Enter username" value={username} onChange={event => setFirstName(event.target.value)} required/>

                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input type="password" className="form-control password" placeholder="Enter password" value={password} onChange={event => setLastName(event.target.value)} required/>

                            </div>
                            <div className="form-group">
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="customCheck1" />
                                    <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                                </div>
                            </div>
                            <button type="button" className={`btn btn-lg btn-block ${styles.buttons}`} onClick={() => callLoginFunc()}>Submit</button>
                                <p className="forgot-password small text-right">Forgot password?</p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </body>
    );
}

export default Login;