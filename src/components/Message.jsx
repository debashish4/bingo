import React from 'react';
import "./Message.css";

const Message = (props) => {
    return(
        <p className="cmp-message">
            {props.text}
        </p>
    )
}

export default Message;