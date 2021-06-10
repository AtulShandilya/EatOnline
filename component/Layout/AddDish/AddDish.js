import React,{useContext} from 'react'
import AddDishForm from "./AddDishForm";
import Card from '../../UI/Card/Card'
import classes from './AddDish.module.css'
import closeButton from '../../../assets/icon/cancel.svg'
import RestaurantContext from '../../../Context/DishContext'
const AddDish=(props)=>{
    const ctx=useContext(RestaurantContext)
    return(
        <Card className={classes['new-dish']}>
            <div className={classes["dish-note"]}>Add New Dish</div>
            <div onClick={ctx.controlShowAddItem} className={classes.closeButton} > <img src={closeButton}/></div>
            <AddDishForm />
        </Card>
    )

}
export default AddDish