import React,{useContext} from 'react'
import classes from './MainBodyMenuDetails.module.css'
import RestaurantContext from '../../../../Context/DishContext.js'
import AddDishToCartButton from "../Button/AddDishToCartButton";
import closeButton from "../../../../assets/icon/cancel.svg";
const MainBodyMenuDetails=(props)=>{
    const ctx=useContext(RestaurantContext);
    const delFromMenu=()=>{
        ctx.onDelFromMenu(props.DishType,props.DishName)
    }
    const tempImg=ctx.dishList[props.DishType][props.DishName]["dishImg"]
    //console.log("image:",tempImg)
    return(
        <div className={classes.dishTopContainer}>
            {ctx.dishList[props.DishType][props.DishName]["dishCategory"]=="Veg" ? <div className={classes["dish-veg-ind"]}/>
                :  <div className={classes["dish-nonVeg-ind"]}/>
            }
            <div className={classes.dishImage}>
                {
                    // Object.keys(tempImg).length!=0 ? <img src={URL.createObjectURL(tempImg)}/> : ""
                    <img src={tempImg}/>
                }
            </div>
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
                <AddDishToCartButton dishName={props.DishName} price={ctx.dishList[props.DishType][props.DishName]["price"]}/>
            </div>
            {(ctx.userInfo.userName).toUpperCase()=='ADMIN'?<div onClick={delFromMenu} className={classes.closeButton} > <img src={closeButton}/></div> :""}

        </div>
    )
}

export default MainBodyMenuDetails