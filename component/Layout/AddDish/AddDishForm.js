import React,{useState,useContext,useRef,useEffect} from 'react';
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
    const [newDishImg,setDishImg]=useState('');
    const [imgData,setImgData]=useState('');
    const dishTypeHandler=(event)=>{setDishType(event.target.value)}
    const newDishNameHandler=(event)=>{setNewDishName(event.target.value)};
    const newDishPriceHandler=(event)=>{setDishPrice(event.target.value)};
    const newDishCategoryHandler=(event)=>{setNewDishCategory(event.target.value)};
    const newDishDescriptionHandler=(event)=>{setDishDescription(event.target.value)};
    const newDishImgHandler=(event)=>{setDishImg(event.target.files[0])
        const reader = new FileReader();
        reader.addEventListener("load", () => {
            setImgData(reader.result);
        });
        reader.readAsDataURL(event.target.files[0]);
    };

    const insertDish=(event)=>{
        if(newDishCategory==='' || newDishPrice==='' || newDishName ==='' ||dishType===''||newDishImg===''){
            event.preventDefault();
            alert(" One or more Fields are Empty !!");
        }else {
            event.preventDefault();
            ctx.onAddToMenu(dishType,newDishName,{"price":newDishPrice,
                                                  "dishCategory":newDishCategory,
                                                  "dishDescription":newDishDescription,
                                                  "dishImg":imgData
            })
            //reset update value
            setNewDishName("");
            setDishPrice("");

        }
    }

    // const onFileChange = event => {
    //     setDishImg(event.target.files[0]);
    // };
    //
     const fileInput = useRef(null);
    // useEffect(e => {
    //     window.addEventListener("keyup", clickFileInput);
    //     return () => window.removeEventListener("keyup", clickFileInput);
    // });
    //
    // function clickFileInput(e) {
    //     if (fileInput.current.nextSibling.contains(document.activeElement)) {
    //         // Bind space to trigger clicking of the button when focused
    //         if (e.keyCode === 32) {
    //             fileInput.current.click();
    //         }
    //     }
    // }

    // const onFileUpload=(e)=>{
    //     e.preventDefault();
    //     const formData= new FormData(fileInput.current.files);
    //
    //     formData.append("my file", newDishImg, newDishImg.name)
    //     console.log("formData:",formData)
    // }

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

                <div className="new-dish__control new-dish__other">
                    <label>Upload</label>
                    <input type="file" onChange={newDishImgHandler}/>
                    {/*<button onClick={onFileUpload}>*/}
                    {/*    Upload!*/}
                    {/*</button>*/}
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
            {/*<div> <button> aaa</button></div>*/}
        </form>
    )
}

export default AddDishForm