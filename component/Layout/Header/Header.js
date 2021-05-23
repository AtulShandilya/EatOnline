import React,{useContext} from 'react'
import classes from './Header.module.css'
import MenuImg from '../../../assets/icon/menu_black_24dp.svg'
import CartImgFull from '../../../assets/icon/shopping-bag_full.svg'
import CartImg from '../../../assets/icon/shopping-bag_empty.svg'
import headerImg from '../../../assets/icon/header.png'
import userImg from '../../../assets/icon/user-img.png'
import empryCart from '../../../assets/icon/emptyCart.png'
import nonEmptyCart from '../../../assets/icon/nonEmptyCart.png'
import RestaurantContext from '../../../Context/DishContext.js'
import Card from '../../UI/Card/Card'
const Header=(props)=>{
    const ctx=useContext(RestaurantContext);
    // console.log("ctx.dishList:",ctx.dishList)
    // console.log("cart.length:",Object.keys(ctx.userInfo.Cart).length)
    // if(Object.keys(ctx.userInfo.Cart).length===0) {ctx.onAddToCart("aa"); console.log("cart added:",ctx.userInfo.Cart)}
    return(
        <React.Fragment>
            <header className={classes["header-container"]}>
                <div className={[classes["header--inner-top"],classes["header--inner" ]].join(' ')}>
                    <div className={classes["header--inner-element1"]}>
                        <div >
                            <button onClick={ctx.controlShowAddItem} >
                                <img src={MenuImg}/>
                            </button>
                        </div>
                    </div>
                    <div className={classes["header--inner-element2"]}>
                        <p>JazzRestaurant.</p>
                        <nav>OUR-ROOTS  OUR-BRANCHES    CONTACT   FOLLOW</nav>
                    </div>
                    <div className={classes["header--inner-element3"]}>
                            <img src={Object.keys(ctx.userInfo.Cart).length===0?CartImg:CartImgFull} />
                            {/*<img className={classes['header-element-img'] } src={(ctx.userInfo.Cart)?empryCart:nonEmptyCart}/>*/}
                    </div>
                </div>
            </header>
            {/*<div className={classes['main-image']} >*/}
            {/*    <img src={headerImg} alt={"Authentic Indian dish"}/>*/}
            {/*</div>*/}
        </React.Fragment>
    );
}

export default Header;