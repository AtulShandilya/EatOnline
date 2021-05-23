import React,{useContext} from 'react'
import classes from './MainBodyMenuDetails.module.css'
import RestaurantContext from '../../../../Context/DishContext.js'
import AddDishToCartButton from "../Button/AddDishToCartButton";
const MainBodyMenuDetails=(props)=>{
    const ctx=useContext(RestaurantContext);

    return(
        <div className={classes.dishTopContainer}>
            {ctx.dishList[props.DishType][props.DishName]["dishCategory"]=="Veg" ? <div className={classes["dish-veg-ind"]}/>
                :  <div className={classes["dish-nonVeg-ind"]}/>
            }
            <div className={classes.dishImage}/>
            <div className={classes.dishDetails}>
                    <div className={classes["dishDetails-name"]}>
                        {props.DishName}
                    </div>
                    <div className={classes["dishDetails-prise"]}>
                        {"$"+ctx.dishList[props.DishType][props.DishName]["price"]}
                    </div>
                    <div className={classes["dishDetails-description"]}>
                        {ctx.dishList[props.DishType][props.DishName]["dishDescription"]}
                    </div>
            </div>
            <div>
                <AddDishToCartButton dishName={props.DishName}/>
            </div>

        </div>
    )
}

export default MainBodyMenuDetails