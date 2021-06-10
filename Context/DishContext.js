import React,{useState} from 'react'
import {writeUserInfo,registerUser,readDishInfo,writeDishInfo,verifyUserLogin} from '../IO/FileAPI'
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
    control: {
        showAddItem: true,
        showCart: false,
        showAccount:false,
        showLogin:false,
        showUserRegistration:false,
        controlShowAddItem: () => {
        },
        controlShowCart: () => {
        },
        controlShowAccount: () => {
        },
        controlHideAll: () => {
        },
        controlShowLogin:()=>{
        },
        controlShowRegistration:()=>{
        }
    }

})



export const RestaurantContextProvider=(props)=>{

    const [userInfo,setUserInfo]=useState({isAdmin:false,
                                                        isLoggedIn:false,
                                                        loginToken:'',
                                                        userName:"Guest",
                                                        password:'',
                                                        Cart:{}})
    const [dishList,setDishList]=useState({})
    const [firstFetch,setFirstFetch]=useState(0);
    const [control,setControl]=useState({showAddItem:false, showCart:false,showAccount:false
            ,showLogin:false})

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

    const onLoginHandler= async (userName1,password1)=>{
         let returnCode= await verifyUserLogin(userName1,password1,setUserInfo)
        console.log("in loginHandler after fetch, returnCode:",returnCode)
         if (returnCode==0) { controlHideAllHandler()}
        }

        // verifyUserLogin(userInfo.userName,userInfo.password,setUserInfo)
        //verifyUserLogin(userName1,password1,setUserInfo)

    // Register function
    const onRegisterHandler= async (userObj)=>{
        const rtn= await registerUser(userObj.userName,userObj,setUserInfo)
        console.log("in loginHandler after fetch, returnCode:",rtn)
        if(rtn==0) controlHideAllHandler()
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
        if (Object.keys(dishList1[dishType]).length==1){
            console.log("del dish type:",dishType)
            delete dishList1[dishType]
        }else {
            delete dishList1[dishType][dishName]
        }
        console.log("dishList1:",dishList1)

        writeDishInfo('temp',dishList1,setDishList)
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
        if(userInfo.Cart[dishName]["qty"]==1){
            delete userInfo1.Cart[dishName];
            if (userInfo.isLoggedIn){
                writeUserInfo(userInfo1.userName,userInfo1,setUserInfo);
            } else{
                console.log("del cart:",userInfo1.Cart)
                setUserInfo(userInfo1)
            }
        } else {
            // const=
            const tempPrice=userInfo1.Cart[dishName]["price"];
            const tempQty=userInfo1.Cart[dishName]["qty"];
            const updPrice=tempPrice-(tempPrice/tempQty);
            let updCart={"qty":tempQty -1,"price":updPrice}
            const tempCart=dotProp.set(userInfo1,"Cart."+dishName,updCart)
            if (userInfo.isLoggedIn){
                // writeUserInfo(userInfo1.userName,{...userInfo1,Cart:{...userInfo1.Cart,dishName:[dishName]["qry"]-=1}},setUserInfo);
                writeUserInfo(userInfo1.userName,tempCart,setUserInfo);
            } else{
                // setUserInfo({...userInfo1,Cart:{...userInfo1.Cart,dishName:{...userInfo1.Cart[dishName],"qty":userInfo1.Cart[dishName]["qty"]-=1}}})
                //setUserInfo(dotProp.set(userInfo1,"Cart."+dishName+".qty",userInfo1.Cart[dishName]["qty"]-1))
                setUserInfo(tempCart)
            }
        }
    }
    // Add to cart
    const onAddToCartHandler=(dishName,price)=>{
        console.log("dishName:",dishName)
        if(userInfo.Cart[dishName]==0||userInfo.Cart[dishName]==undefined){
            if (userInfo.isLoggedIn){
                writeUserInfo(userInfo.userName,{...userInfo,Cart:{...userInfo.Cart,[dishName]:{"qty":1,"price":price}}},setUserInfo);
            } else{
                setUserInfo({...userInfo,Cart:{...userInfo.Cart,[dishName]:{"qty":1,"price":price}}})
            }
        } else {
            const qty=userInfo.Cart[dishName]["qty"]+1;
            let addAgain={"qty":qty,"price":qty*price}
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

    const controlShowAddItemHandler=()=>{setControl({...control,showAddItem: !control.showAddItem,showCart:false,showAccount:false});}

    // setControl(dotProp.set(control,'showAddItem',control.showAddItem))}
    const controlShowCartHandler=()=>{ setControl({...control,showCart:!control.showCart,showAddItem:false,showAccount:false});}

    const controlShowAccountHandler=()=>{ setControl({...control,showAccount:!control.showAccount,showAddItem:false,showCart:false});}

    const controlHideAllHandler=()=>{ setControl({...control,showAccount:false,showLogin:false})}
    const controlShowLoginHandler=()=>{ setControl({...control,showLogin:!control.showLogin,showAccount:false})}
    const controlShowRegistrationHandler=()=>{ setControl({...control,showUserRegistration:!control.showUserRegistration})}

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
            controlShowAccount:controlShowAccountHandler,
            controlHideAll:controlHideAllHandler,
            controlShowLogin:controlShowLoginHandler,
            controlShowRegistration:controlShowRegistrationHandler

        }}>{props.children}</RestaurantContext.Provider>
    )
}


export default RestaurantContext;