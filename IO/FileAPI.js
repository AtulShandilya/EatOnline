import React from 'react'

// props must include user,setDishList
//     const [first,setFirst]=useState(0);
// const ip='http://223.236.110.7:'
const ip='http://localhost:'
const port='4000'
const dName='OnlineEat'

//Login Service
export const verifyUserLogin=(user,password,setUserInfo,setCartList)=>{
    const fName=user+'_info.json'
    const readUrl=ip+port+'/LoginService?filename='+fName+'&dir='+dName
    fetch(readUrl).then(response=>response.json()).then(data=>{
        const fileObj=JSON.parse(JSON.parse(String(data[0])));
        if(data[1]==0){
            setUserInfo(fileObj);
        }else alert(fileObj)
    });
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
    fetch(writeUrl).then(setUserInfo(fileObj));
}

// read write dish
export const readDishInfo=(setDishList)=>{
    const readUrl=ip+port+'/fileService?operation=read&filename=dishes.json'
    fetch(readUrl).then(response=>response.json()).then(data=>{
        // console.log("data:",data)
        const fileObj=JSON.parse(JSON.parse(String(data[0])));
        // console.log("dish list:",fileObj)
        setDishList(fileObj);
    });
}

 export const writeDishInfo=(token,fileObj,setDishList)=>{
        console.log("b4 write dishList:",fileObj)
        let writeUrl=ip+port+'/fileService?operation=write&filename=dishes.json&token='+token
        writeUrl=writeUrl.concat('&fileobj=',JSON.stringify(fileObj))
     console.log("b4 write dishList:",writeUrl)
        fetch(writeUrl).then(setDishList(fileObj));
    }




// export default FileApi;