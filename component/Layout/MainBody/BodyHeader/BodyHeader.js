import React,{useContext} from 'react'
import RestaurantContext from '../../../../Context/DishContext.js'
import classes from './BodyHeader.module.css'
const BodyHeader=(props)=>{
    const ctx=useContext(RestaurantContext);
    return (
        <div onClick={ctx.controlHideAll} className={classes['dish-type-container']}>
            {
                Object.keys(ctx.dishList).map(dType=>
                    <div className={classes['dish-type']}>{dType}</div>
                )
            }
        </div>
    )
}

export default BodyHeader