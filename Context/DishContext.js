import React,{useState} from 'react'
import {readUserInfo,writeUserInfo,readDishInfo,writeDishInfo,verifyUserLogin} from '../IO/FileAPI'
const dotProp= require('dot-prop');

const RestaurantContext = React.createContext(null);
// const RestaurantContext = React.createContext({
//     // Restaurant Menu
//     dishList: {},
//     onAddToMenu:()=>{},
//     onDelFromMenu:()=>{},
//     // Cart
//     onAddToCart:()=>{},
//     onDelFromCart:()=>{},
//     //User
//     userInfo:{
//         isAdmin:false,
//         isLoggedIn:false,
//         loginToken:'',
//         userName:"",
//         password:'',
//         Cart:{}
//     },
//     onLogout: ()=>{},
//     onLogin:()=>{},
//     onRegister:()=>{},
//     onDelAccount:()=>{},
//     control:{
//         showAddItem:true,
//         showCart:false,
//         controlShowAddItem:()=>{},
//         controlShowCart:()=>{}
//     }
//
// })



export const RestaurantContextProvider=(props)=>{

    const [userInfo,setUserInfo]=useState({isAdmin:false,
                                                        isLoggedIn:false,
                                                        loginToken:'',
                                                        userName:"",
                                                        password:'',
                                                        Cart:{}})
    const [dishList,setDishList]=useState({})
    const [firstFetch,setFirstFetch]=useState(0);
    const [control,setControl]=useState({showAddItem:true, showCart:false})

    //********************************************************************************//
    //************     User functions               **********************************//
    //********************************************************************************//

    //Logout functions
    const onLogoutHandler=()=>{
        setUserInfo({
            isLoggedIn:false, loginToken:'', userName:"", password:'', Cart:{}
        })
    }
    //Login function
    const onLoginHandler=()=>{
        verifyUserLogin(userInfo.userName,userInfo.password,setUserInfo)
    }
    // Register function
    const onRegisterHandler=()=>{
        writeUserInfo(userInfo.userName,userInfo,setUserInfo);
    }
    const onDelAccountHandler=()=>{
        console.log("delete Account")
    }
    //********************************************************************************//
    //************     Dish functions               **********************************//
    //********************************************************************************//

    // Read and update dishList
    if (firstFetch===0) {
        setFirstFetch(1);
        readDishInfo(setDishList)
        console.log('read dish list')
    }
    const onDelFromMenuHandler=(dishType,dishName)=>{
        writeDishInfo('temp',dotProp.delete(dishList,dishType+'.'+dishName),setDishList)
    }
    const onAddToMenuHandler=(dishType,dishName,dishObj)=>{
        writeDishInfo('temp',dotProp.set(dishList,dishType + '.' + dishName,dishObj),setDishList)
    }

    //********************************************************************************//
    //************     Cart functions               **********************************//
    //********************************************************************************//
    const onDelFromCartHandler=(dishName)=>{
        if(userInfo.Cart[dishName]==1){
            if (userInfo.isLoggedIn){
                writeUserInfo(userInfo.userName,dotProp.delete(userInfo,"Cart."+dishName),setUserInfo);
            } else{
                setUserInfo(dotProp.delete(userInfo,"Cart."+dishName))
            }
        } else {
            if (userInfo.isLoggedIn){
                writeUserInfo(userInfo.userName,dotProp.set(userInfo,"Cart."+dishName,userInfo.Cart[dishName]-1),setUserInfo);
            } else{
                setUserInfo(dotProp.delete(userInfo,"Cart."+dishName))
            }
        }
    }

    const onAddToCartHandler=(dishName)=>{
        if(userInfo.Cart[dishName]==0){
            if (userInfo.isLoggedIn){
                writeUserInfo(userInfo.userName,dotProp.set(userInfo,"Cart."+dishName,1),setUserInfo);
            } else{
                setUserInfo(dotProp.delete(userInfo,"Cart."+dishName))
            }
        } else {
            if (userInfo.isLoggedIn){
                writeUserInfo(userInfo.userName,dotProp.set(userInfo,"Cart."+dishName,userInfo.Cart[dishName]+1),setUserInfo);
            } else{
                setUserInfo(dotProp.delete(userInfo,"Cart."+dishName))
            }
        }
    }
    //************************************************************************
    //            Control
    //************************************************************************
    // const controlShowAddItemHandler=()=>{ console.log(dotProp.set(control,'control.showAddItem',!control.showAddItem))}

    const controlShowAddItemHandler=()=>{ console.log('additem:',control.showAddItem)
        // setControl({showAddItem:!control.showAddItem, showCart:false})
            let control1={...control,showAddItem: !control.showAddItem};
            setControl(control1);
            console.log({...control1,showNewItem:true});
    }

        // setControl(dotProp.set(control,'showAddItem',control.showAddItem))}
    const controlShowCartHandler=()=>{ setControl(dotProp.set(control,'control.showCart',!control.showCart))}


    return (
        <RestaurantContext.Provider value={{
            dishList: dishList,
            onAddToMenu: onAddToMenuHandler,
            onDelFromMenu: onDelFromMenuHandler,
            onAddToCart: onAddToCartHandler,
            onDelFromCart: onDelFromCartHandler,
            userInfo: userInfo,
            onLogout: onLogoutHandler,
            onLogin: onLoginHandler,
            onRegister: onRegisterHandler,
            onDelAccount: onDelAccountHandler,
            control:control,
            controlShowAddItem:controlShowAddItemHandler,
            controlShowCart:controlShowCartHandler,
            tempTest:"Test Success"

        }}>{props.children}</RestaurantContext.Provider>
    )
}


export default RestaurantContext;