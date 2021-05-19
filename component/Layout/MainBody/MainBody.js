import React,{useContext} from 'react'
import RestaurantContext from '../../../Context/DishContext.js'
import BodyHeader from "./BodyHeader/BodyHeader";
import AddDish from "../AddDish/AddDish";
const MainBody=(props)=>{
    const ctx=useContext(RestaurantContext);
    console.log("new:",ctx);
    return (
        <React.Fragment>
            <BodyHeader/>

            {console.log('hdr:',ctx.control.showAddItem)}{ ctx.control.showAddItem?<AddDish/>:<div/>}
        </React.Fragment>
    )

}

export default MainBody