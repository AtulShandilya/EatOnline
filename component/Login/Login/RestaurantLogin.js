import React,{useContext} from 'react'
import Card from "../../UI/Card/Card";
import classes from './RestaurantLogin.module.css'
import UserLogin from "./UserLogin";
import closeButton from "../../../assets/icon/cancel.svg";
import RestaurantContext from "../../../Context/DishContext";
import UserRegistration from "./UserRegistration";
const RestaurantLogin=()=>{
    const ctx=useContext(RestaurantContext);
    return(
        <Card className={classes.newLogin}>
            <div>
                <div className={classes["User__LoginHeader"]}>User Login</div>
                <div onClick={ctx.controlShowLogin} className={classes.closeButton} > <img src={closeButton}/></div>
                {ctx.control.showUserRegistration?<UserRegistration/> : <UserLogin/>}

            </div>

        </Card>
    )
}
export default RestaurantLogin