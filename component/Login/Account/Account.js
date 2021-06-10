
import classes from './Account.module.css'
import React,{useContext} from 'react'
import RestaurantContext from '../../../Context/DishContext.js'
import userImg from '../../../assets/icon/profile.svg'

const Account=(props)=>{
    const ctx=useContext(RestaurantContext)
    let userName="Guest"
    if(ctx.userInfo.isLoggedIn) userName=ctx.userInfo.userName;
    return(
        <div className={classes.userAccount}>
            <div className={classes.welcomeUser}><img className={classes.userProfile} src={userImg}/>{userName}</div>
            <div onClick={ctx.userInfo.isLoggedIn?ctx.onLogout :ctx.controlShowLogin} className={classes.userAccountItems}>{ctx.userInfo.isLoggedIn?"Logout":"Login"}</div>
            {(ctx.userInfo.userName).toUpperCase()=='ADMIN'?
                <div onClick={ctx.controlShowAddItem} className={classes.userAccountItems}>Add Dish</div>:""}
            <div className={classes.userAccountItems}>Cart</div>
            <div className={classes.userAccountItems}> About</div>
            <div className={classes.userAccountItems}> Contact</div>

        </div>
    )
}

export default Account