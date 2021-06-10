import React,{useContext} from 'react'
import classes from './RestaurantCart.module.css'
import RestaurantCartProceed from './RestaurantCartProceed'
import RestaurantContext from '../../../Context/DishContext.js'
import ShowCartItem from './ShowCartItem'
import closeButton from '../../../assets/icon/cancel.svg'
const RestaurantCart=()=>{
    const ctx=useContext(RestaurantContext)
    return(
        <div className={classes.CartContainer}>
            <div className={classes.CartDetails}>
                <div className={classes.cartHeader}>
                    <div className={classes.dummy}></div>
                    <div className={classes.cartItems}>Items</div>
                    <div className={classes.qty}>Quantity</div>
                    <div className={classes.price}>Price</div>
                </div>

                { Object.keys(ctx.userInfo.Cart).map(item=>
                        <ShowCartItem name={item}/>
                )}
            </div>
            <div>
                {   Object.keys(ctx.userInfo.Cart).length==0 ? <div className={classes.noItemInCart}>No Item Added to the Cart</div>
                    :<RestaurantCartProceed/>
                }
            </div>
            <div onClick={ctx.controlShowCart} className={classes.closeButton} > <img src={closeButton}/></div>

        </div>
    )
}
export default RestaurantCart