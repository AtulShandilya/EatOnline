import React,{useState,useContext} from 'react'
import RestaurantContext from "../../../Context/DishContext";
import classes from './UserRegistration.module.css'
const UserRegistration=()=>{
    const ctx=useContext(RestaurantContext);
    const [userName,setUsername]=useState("");
    const [password,setPassword]=useState("");
    const userNameHandler=(event)=>{setUsername(event.target.value)}
    const passwordHandler=(event)=>{setPassword(event.target.value)}

    const registerUser=(event)=>{
        if(userName==""||password==""){
            event.preventDefault();
            alert(" One or more Fields are Empty !!");
        }else{
            event.preventDefault();
            const userObj={ isAdmin:false,
                            isLoggedIn:true,
                            loginToken:'',
                            userName:userName,
                            password:password,
                            Cart:{}}
            ctx.onRegister(userObj);
        }
    }

    return(
        <form onSubmit={registerUser}>
            <div className={classes.registrationContainer}>
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
                <div className={classes['Register__Action']}>
                    <button type={'submit'}>Register</button>
                </div>
                <div className={classes['Login__Action']}>
                    <button onClick={ctx.controlShowRegistration} type={'text'}>Login</button>
                </div>

            </div>
        </form>
    )
}

export default UserRegistration