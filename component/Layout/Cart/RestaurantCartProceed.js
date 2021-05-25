import React,{useContext} from 'react'
import RestaurantContext from '../../../Context/DishContext'
import classes from './RestaurantCartProceed.module.css'
const RestaurantCartProceed =()=>{
    const ctx=useContext(RestaurantContext);
    let totalAmount=0
    Object.keys(ctx.userInfo.Cart).map(item=>{totalAmount += parseFloat(ctx.userInfo.Cart[item]["price"])})


    return(
        <div className={classes.CartProceed}>
            <div className={classes.CartTotalAmountText }>Total Cost:</div>
            <div className={classes.CartTotalAmount }>${totalAmount}</div>
            <button className={classes.CartProceedButton }>Proceed</button>
        </div>
    )
}
export default RestaurantCartProceed