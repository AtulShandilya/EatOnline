import React from 'react'
// import cors from 'cors';
// props must include user,setDishList
//     const [first,setFirst]=useState(0);
// const ip='http://223.236.110.7:'
const ip='http://localhost:'
const port='4003'
const dName='UserInfo'

//Login Service
export const verifyUserLogin= async (user,password,setUserInfo,setCartList)=>{
    const fName=user+'_info.json'
    const readUrl=ip+port+'/LoginService?operation=login&filename='+fName+'&dir='+dName+
            '&userName='+user+'&password='+password
    //console.log("login-url:",readUrl)
    let returnCode=null
     await fetch(readUrl).then(response=>response.json()).then(data=>{
        //console.log("dataaa:",data)
        returnCode=data.returnCode;
        console.log("in fileApi in fetch, returnCode:",returnCode)
        if(data.returnCode==0){
            const fileObj=JSON.parse(data.returnObj);
            setUserInfo(fileObj);
        }else {
            alert(data.returnObj)
        }
    }).catch((errorMsg)=>{ return 3})
    console.log("in fileApi after fetch, returnCode:",returnCode)
    // let promise=new Promise((resolve, reject)=>{
    //     if(returnCode==0) resolve("0")
    //     else reject("1")
    //
    // })
    // return promise
    return returnCode
}

export const registerUser= async (user,userObj,setUserInfo)=>{
    const fName=user+'_info.json'
    const tempObj=JSON.stringify(userObj)
    const readUrl=ip+port+'/LoginService?operation=register&filename='+fName+'&dir='+dName+'&userObj='+tempObj
    // console.log("readUrl:",readUrl)
    let returnCode=null
    await fetch(readUrl).then(response=>response.json()).then(data=>{
        returnCode=data.returnCode
        console.log("in fileApi in fetch, returnCode:",returnCode)

        if(data.returnCode==0){
            const fileObj=JSON.parse(data.returnObj);
            setUserInfo(fileObj);
        }else {
            alert(data.returnObj)
        }
    });
    console.log("in fileApi after fetch, returnCode:",returnCode)
    let promise=new Promise((resolve, reject)=>{
        if(returnCode==0) resolve("0")
        else reject("1")

    })
    return promise
}


//User functions
export const readUserInfo=(user,password,setUserInfo)=>{
    const fName=user+'_info.json'
    const readUrl=ip+port+'/fileService?operation=read&filename='+fName+'&dir='+dName
    fetch(readUrl).then(response=>response.json()).then(data=>{
        const fileObj=JSON.parse(JSON.parse(String(data[0])));
        setUserInfo(fileObj);
    });
}

export const writeUserInfo=(user,fileObj,setUserInfo)=>{
    const fName=user+'_info.json'
    let writeUrl=ip+port+'/fileService?operation=write&filename='+fName+'&dir='+dName
    writeUrl=writeUrl.concat('&fileobj=',JSON.stringify(fileObj))
    fetch(writeUrl,{
        mode: 'no-cors'
    }).then(setUserInfo(fileObj));
}

// read dish
export const readDishInfo=(setDishList)=>{
    const readUrl=ip+port+'/fileService?operation=read&filename=dishes.json'

    fetch(readUrl,{
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        headers: {'Content-Type': 'application/json;charset=utf-8'},
        body:'{"a":"aa"}'
    }).then(response=>response.json()).then(data=>{
        console.log("data:",data)
        const fileObj=JSON.parse(data[0]);
        setDishList(fileObj);
    });
}

// export const readDishInfo=(setDishList)=>{
//     const readUrl=ip+port+'/fileService?operation=read&filename=dishes.json'
//     fetch(readUrl).then(response=>response.json()).then(data=>{
//         // console.log("data:",data)
//         const fileObj=JSON.parse(JSON.parse(String(data[0])));
//         // console.log("dish list:",fileObj)
//         setDishList(fileObj);
//     });
// }

//write dish
//  export const writeDishInfo=(token,fileObj,setDishList)=>{
//         console.log("b4 write dishList:",fileObj)
//         let writeUrl=ip+port+'/fileService?operation=write&filename=dishes.json&token='+token
//         //writeUrl=writeUrl.concat('&fileobj=',JSON.stringify(fileObj))
//      console.log("b4 write dishList:",writeUrl)
//      console.log("DishList:",fileObj)
//         fetch(writeUrl,{
//             method: "POST", // *GET, POST, PUT, DELETE, etc.
//             mode: 'no-cors', // no-cors, *cors, same-origin
//             // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
//             // credentials: 'same-origin', // include, *same-origin, omit
//             headers: {
//                 'Content-Type': 'application/json;charset=utf-8'
//                 // 'Content-Type': 'application/x-www-form-urlencoded',
//             },
//             // redirect: 'follow', // manual, *follow, error
//             // referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
//             body:JSON.stringify(fileObj)
//         }).then(setDishList(fileObj));
//     }

 export function writeDishInfo(token,fileObj,setDishList){
        console.log("b4 write dishList:",fileObj)
        let writeUrl=ip+port+'/fileService?operation=write&filename=dishes.json&token='+token
     console.log("b4 write dishList:",writeUrl)
     console.log("DishList:",fileObj)
        fetch(writeUrl,{
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            headers: {'Content-Type': 'application/json;charset=utf-8'},
            body:JSON.stringify(fileObj)
        }).then(setDishList(fileObj));
    }



// export default FileApi;