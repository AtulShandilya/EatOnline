import React,{useState,useContext} from 'react';
import './AddDishForm.css'
import RestaurantContext from '../../../Context/DishContext.js'

const AddDishForm =(props)=>{
    const ctx=useContext(RestaurantContext);
    const dishTypeList=['Chinese','Indian','Italian','Mexican','Fast-Food']
    const [dishType,setDishType]=useState(dishTypeList[0]);
    const [newDishName,setNewDishName]=useState('');
    const [newDishCategory,setNewDishCategory]=useState('Veg');
    const [newDishPrice,setDishPrice]=useState('');
    const [newDishDescription,setDishDescription]=useState('');
    const dishTypeHandler=(event)=>{setDishType(event.target.value)}
    const newDishNameHandler=(event)=>{setNewDishName(event.target.value)};
    const newDishPriceHandler=(event)=>{setDishPrice(event.target.value)};
    const newDishCategoryHandler=(event)=>{setNewDishCategory(event.target.value)};
    const newDishDescriptionHandler=(event)=>{setDishDescription(event.target.value)};

    const insertDish=(event)=>{
        if(newDishCategory==='' || newDishPrice==='' || newDishName ==='' ||dishType===''){
            event.preventDefault();
            alert(" One or more Fields are Empty !!");
        }else {
            event.preventDefault();
            ctx.onAddToMenu(dishType,newDishName,{"price":newDishPrice,
                                                  "dishCategory":newDishCategory,
                                                  "dishDescription":newDishDescription
            })
            //reset update value
            setNewDishName("");
            setDishPrice("");

        }
    }
    return(
        <form onSubmit={insertDish}>
            <div className="new-dish__controls ">
                <div className="new-dish__control new-dish__title__dishType">
                    <label>Dish Type</label>
                    <select onChange={dishTypeHandler} className={'ne_Title'}>
                        {dishTypeList.map(dType=><option value={dType}>{dType}</option>)}
                    </select>
                </div>
                <div className="new-dish__control new-dish__other">
                    <label>Category </label>
                    <select onChange={newDishCategoryHandler} className={'ne_Title'}>
                        <option value='Veg'>Veg</option>
                        <option value='Non-Veg'>Non-Veg</option>
                    </select>
                </div>
                <div className="new-dish__control new-dish__other">
                    <label>Price</label>
                    <input onChange={newDishPriceHandler}
                           className={'ne_Other'}
                           type="Number"
                           min={0.01}
                           step={0.01}
                           value={newDishPrice}
                    />
                </div>
                <div className="new-dish__control new-dish__title">
                    <label>Dish Name</label>
                    <input onChange={newDishNameHandler}
                           className={'ne_Title'}
                           type={"text"}
                           value={newDishName}
                    />
                </div>

                <div className="new-dish__control new-dish__title__dishDescription">
                    <label>Dish Description</label>
                    <textarea onChange={newDishDescriptionHandler}
                           className={'ne_Title__Description'}
                           value={newDishDescription}
                    />
                </div>

            </div>
            <div className={'new-dish__action'}>
                <button type={'submit'}>Add Dish</button>
            </div>
        </form>
    )
}

export default AddDishForm