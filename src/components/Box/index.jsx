import React, {Component} from 'react';
import './box.css';


export class Box extends Component {
    constructor(){
        super();
        this.state = {
        }
    }

    render(){
        console.log("ui box render");
        const {num, onClick, isSelected} = this.props;
        return(
            <div className={isSelected ? "chosen box":"box"} onClick={onClick}>
                <p>{num}</p>
            </div>
        )
    }
}

export default Box;