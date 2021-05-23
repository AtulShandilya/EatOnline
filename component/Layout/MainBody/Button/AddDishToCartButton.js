
import React,{useContext} from 'react'
import RestaurantContext from '../../../../Context/DishContext'
import classes from './AddDishToCartButton.module.css'
const AddDishToCartButton=(props)=>{
    const ctx=useContext(RestaurantContext);
    // Function definition for add and delete to Cart
    const addToCart=()=>{
        ctx.onAddToCart(props.dishName.toString())
    }
    const delFromCart=()=>{
        ctx.onDelFromCart(props.dishName.toString())
    }

    let TempButton=undefined;
    if(ctx.userInfo.Cart[props.dishName]==undefined){
        TempButton=<button onClick={addToCart} className={classes.defaultButton}>Add</button>
    }else{
        TempButton=<div className={classes.outerButton}>
            <button onClick={delFromCart} className={classes.smallButton}>-</button>
            <div className={classes.foodCount}>{ctx.userInfo.Cart[props.dishName]}</div>
            <button onClick={addToCart} className={classes.smallButton}>+</button>
        </div>
    }

    return(
        <div className={classes.buttonContainer}>
            {TempButton}
        </div>

    )
}
export default AddDishToCartButton