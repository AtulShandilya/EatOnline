import React,{useContext} from 'react'
import classes from './Header.module.css'
import headerImg from '../../../assets/header.png'
import empryCart from '../../../assets/emptyCart.png'
import nonEmptyCart from '../../../assets/nonEmptyCart.png'
import RestaurantContext from '../../../Context/DishContext.js'
import Card from '../../UI/Card/Card'
const Header=(props)=>{
    const ctx=useContext(RestaurantContext);
    console.log("ctx.dishList:",ctx.dishList)
    return(
        <React.Fragment>
            <header className={classes.header}>
                <h2>Atul's Kitchen</h2>
                <img className={classes['header-img'] } src={(ctx.userInfo.Cart)?empryCart:nonEmptyCart}/>
                <button onClick={ctx.controlShowAddItem}>click</button>
            </header>
            <div className={classes['main-image']} >
                <img src={headerImg} alt={"Authentic Indian dish"}/>
            </div>
        </React.Fragment>
    );
}

export default Header;