import React from "react";

const Feild = ({title,type}) => {
    return ( <div>
        <lable>{title}</lable><br/>
        <input type={type} placeholder={title}></input>
    </div> );
}
 
export default Feild;