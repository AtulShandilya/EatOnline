import React,{useState,useContext} from 'react'
import RestaurantContext from "../../../Context/DishContext";
import classes from './UserLogin.module.css'
const UserLogin=()=>{
    const ctx=useContext(RestaurantContext)
    const [userName,setUsername]=useState("");
    const [password,setPassword]=useState("");
    const userNameHandler=(event)=>{setUsername(event.target.value)}
    const passwordHandler=(event)=>{setPassword(event.target.value)}

    const userLogin=(event)=>{
        if(userName==""||password==""){
            event.preventDefault();
            alert(" One or more Fields are Empty !!");
        }else{
            event.preventDefault();
            ctx.onLogin(userName,password)
        }
    }

    return(
        <form onSubmit={userLogin}>
            <div className={classes.loginContainer}>
                <div className={classes["user__ID"]}>
                    <label>E-mail</label>
                    <input onChange={userNameHandler}
                           className={classes.userInput}
                           type={"text"}
                           value={userName}
                    />
                </div>
                <div className={classes["user__Password"]}>
                    <label>Password</label>
                    <input onChange={passwordHandler}
                           className={classes.password}
                           type={"text"}
                           value={password}
                    />
                </div>

                <div className={classes['Login__Action']}>
                    <button type={'submit'}>Login</button>
                </div>
                <div className={classes['Register__Action']}>
                    <button onClick={ctx.controlShowRegistration} type={'text'}>Register</button>
                </div>
            </div>
        </form>
    )
}

export default UserLogin