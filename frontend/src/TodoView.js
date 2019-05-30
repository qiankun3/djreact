import React, {Component} from 'react';
import FlipMove from "react-flip-move";


// this class is mainly using display list of todo items
class TodoView extends Component {
    constructor(props) {
        super(props);
        
        this.createItems = this.createItems.bind(this);
    }
    /* {e.complete?<del>e.text</del>: e.text}*/
    createItems(e) {
        if (e.complete) {
            return (
                <li key={e.id} className="completed">
                    <div className="listContent">
                        <del>{e.title}</del>
                    </div>
                    <div className="buttons">                
                        <button onClick={() => this.delete(e.id)} type="submit" >DELETE</button> 
                        <button onClick={() => this.edit(e.id)} type="submit" >EDIT</button> 
                    </div>
                
                </li>
               );
        }else {
                return (
                <li onClick={() => this.mark(e.id)} key={e.id}>
                    <div className="listContent">
                        {e.title}
                        
                    </div>
                    <div className="buttons">                
                        <button onClick={(event) => {this.delete(e.id);event.stopPropagation()}} type="submit" >DELETE</button> 
                        <button onClick={(event) => {this.edit(e.id);event.stopPropagation()}} type="submit" >EDIT</button> 
                    </div>
                
                </li>
               );
        }
    }
    

    delete(e) {
        this.props.delete(e);
    }

    mark(e) {
        this.props.mark(e);
    }
    
    edit(e) {
        this.props.edit(e);
    }

    render() {
        var todoItems = this.props.items;
        var listItems = todoItems.map(this.createItems)//????????
        return(
            <ul className="listView">
                <FlipMove duration={250} easing="ease-out">
                    {listItems}
                </FlipMove>
            </ul>
        );
    }
}

export default TodoView;