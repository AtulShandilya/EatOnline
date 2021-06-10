import React,{useContext} from 'react'
import RestaurantContext from '../../../Context/DishContext.js'
import BodyHeader from "./BodyHeader/BodyHeader";
import AddDish from "../AddDish/AddDish";
import classes from "./MainBody.module.css"
import MainBodyMenuDetails from "./DishDetails/MainBodyMenuDetails"
import RestaurantCart from "../Cart/RestaurantCart";
import RestaurantLogin from "../../Login/Login/RestaurantLogin";
const MainBody=(props)=>{
    const ctx=useContext(RestaurantContext);
    // console.log("new:",ctx);
    // console.log("UserCart",ctx.userInfo.Cart);
    return (
        <React.Fragment>
            <div  className={classes["mainbody-header-container"]}>
                <BodyHeader/>

                {ctx.control.showAddItem || ctx.control.showCart || ctx.control.showLogin ?
                    <div className={classes["add-menu-container"]}>
                        { ctx.control.showAddItem?<AddDish/>:""}
                        { ctx.control.showCart?<RestaurantCart/>:""}
                        {ctx.control.showLogin?<RestaurantLogin/>:""}
                    </div> : <div/>
                }
            </div>
            <div className={classes["mainbody-menu-container"]}>
                {
                    Object.keys(ctx.dishList ).map(DList=>
                        <div>
                            <div className={classes.menuDishType}>
                                {DList}
                            </div>
                            {
                                Object.keys(ctx.dishList[DList]).map(DishName=>
                                    <MainBodyMenuDetails DishName={DishName} DishType={DList}/>
                                )
                            }
                        </div>
                    )
                }

            </div>
        </React.Fragment>
    )

}

export default MainBody