import React,{useState} from 'react'
import {readUserInfo,writeUserInfo,readDishInfo,writeDishInfo,verifyUserLogin} from '../IO/FileAPI'
const dotProp= require('dot-prop');

// const RestaurantContext = React.createContext(null);
const RestaurantContext = React.createContext({
    // Restaurant Menu
    dishList: {},
    onAddToMenu:()=>{},
    onDelFromMenu:()=>{},
    // Cart
    onAddToCart:()=>{},
    onDelFromCart:()=>{},
    //User
    userInfo:{
        isAdmin:false,
        isLoggedIn:false,
        loginToken:'',
        userName:"",
        password:'',
        Cart:{}
    },
    onLogout: ()=>{},
    onLogin:()=>{},
    onRegister:()=>{},
    onDelAccount:()=>{},
    control:{
        showAddItem:true,
        showCart:false,
        controlShowAddItem:()=>{},
        controlShowCart:()=>{}
    }

})



export const RestaurantContextProvider=(props)=>{

    const [userInfo,setUserInfo]=useState({isAdmin:false,
                                                        isLoggedIn:false,
                                                        loginToken:'',
                                                        userName:"",
                                                        password:'',
                                                        Cart:{}})
    const [dishList,setDishList]=useState({})
    const [firstFetch,setFirstFetch]=useState(0);
    const [control,setControl]=useState({showAddItem:false, showCart:false})

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
    //************     Dish Menu functions          **********************************//
    //********************************************************************************//

    // Read and update dishList
    if (firstFetch===0) {
        setFirstFetch(1);
        readDishInfo(setDishList)
        // console.log('read dish list')
    }
    const onDelFromMenuHandler=(dishType,dishName)=>{
        let dishList1={...dishList};
        writeDishInfo('temp',dotProp.delete(dishList1,dishType+'.'+dishName),setDishList)
    }
    const onAddToMenuHandler=(dishType,dishName,dishObj)=>{
        writeDishInfo('temp', {...dishList,[dishType]:{...dishList[dishType],[dishName]:dishObj}},setDishList)
    }

    //********************************************************************************//
    //************     Cart functions               **********************************//
    //********************************************************************************//
    // Del from cart
    const onDelFromCartHandler=(dishName)=>{
        let userInfo1={...userInfo};
        if(userInfo.Cart[dishName]==1){
            if (userInfo.isLoggedIn){
                writeUserInfo(userInfo1.userName,dotProp.delete(userInfo1,"Cart."+dishName),setUserInfo);
            } else{
                dotProp.delete(userInfo1,"Cart."+[dishName])
                console.log("del cart:",userInfo1)
                setUserInfo(userInfo1)
            }
        } else {
            if (userInfo.isLoggedIn){
                writeUserInfo(userInfo1.userName,dotProp.set(userInfo1,"Cart."+dishName,userInfo1.Cart[dishName]-1),setUserInfo);
            } else{
                setUserInfo(dotProp.set(userInfo1,"Cart."+dishName,userInfo1.Cart[dishName]-1))
            }
        }
    }
    // Add to cart
    const onAddToCartHandler=(dishName)=>{
        console.log("dishName:",dishName)
        if(userInfo.Cart[dishName]==0||userInfo.Cart[dishName]==undefined){
            if (userInfo.isLoggedIn){
                writeUserInfo(userInfo.userName,{...userInfo,Cart:{...userInfo.Cart,[dishName]:1}},setUserInfo);
            } else{
                setUserInfo({...userInfo,Cart:{...userInfo.Cart,[dishName]:1}})
            }
        } else {
            let addAgain=userInfo.Cart[dishName]+1;
            if (userInfo.isLoggedIn){
                writeUserInfo(userInfo.userName,{...userInfo,Cart:{...userInfo.Cart,[dishName]:addAgain}},setUserInfo);
            } else{
                console.log("add to cart again")
                setUserInfo({...userInfo,Cart:{...userInfo.Cart,[dishName]:addAgain}})
            }
        }
    }
    //************************************************************************
    //            Control
    //************************************************************************

    const controlShowAddItemHandler=()=>{setControl({...control,showAddItem: !control.showAddItem}); }

    // setControl(dotProp.set(control,'showAddItem',control.showAddItem))}
    const controlShowCartHandler=()=>{ setControl({...control,showCart:!control.showCart});}


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
            controlShowCart:controlShowCartHandler

        }}>{props.children}</RestaurantContext.Provider>
    )
}


export default RestaurantContext;