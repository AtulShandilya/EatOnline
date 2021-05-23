import React,{useState,useContext} from 'react'
import Header from './component/Layout/Header/Header'
import RestaurantContext,{RestaurantContextProvider} from "./Context/DishContext";
import MainBody from "./component/Layout/MainBody/MainBody";
import "./EatOnline.css"

const EatOnline=(props)=>{
    const ctx=useContext(RestaurantContext);

    return(
        <React.Fragment>
            <RestaurantContextProvider>
                <Header/>
                <MainBody/>
            </RestaurantContextProvider>
        </React.Fragment>
    )
}

export default EatOnline;