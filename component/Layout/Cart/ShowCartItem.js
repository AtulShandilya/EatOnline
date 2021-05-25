
import RestaurantContext from '../../../Context/DishContext.js'
import React,{useContext} from 'react'
import classes from './ShowCartItem.module.css'
const ShowCartItem=(props)=>{
    const ctx=useContext(RestaurantContext)
    return(
            <div className={classes.showCartItem}>
                <div className={classes["showCartItem__pic"]}></div>
                <div className={classes["showCartItem__name"]}>{props.name}</div>
                <div className={classes["showCartItem__price"]}>{ctx.userInfo.Cart[props.name]["qty"]}</div>
                <div className={classes["showCartItem__price"]}>{"$"+ctx.userInfo.Cart[props.name]["price"]}</div>
            </div>
    )
}
export default ShowCartItem