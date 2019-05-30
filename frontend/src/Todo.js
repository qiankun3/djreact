import React, {Component} from 'react';
import TodoView from "./TodoView";
import Modal from './components/Modal'
import "./Todo.css";
import axios from "axios";

class Todo extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            items: [],
            toggle: false,
            tempItem: {
                "title": "",
                "content": "",
                "complete": false,
            }
        };


        this.deleteFromServer = this.deleteFromServer.bind(this);
        this.addToServer = this.addToServer.bind(this);
        this.markOnServer = this.markOnServer.bind(this);

        this.addItem = this.addItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.markItem = this.markItem.bind(this);
        this.editItem = this.editItem.bind(this);
        this.showModal = this.showModal.bind(this);
        this.closeModal = this.closeModal.bind(this)
        this.axiosGet = this.axiosGet.bind(this);
    }

    async componentDidMount() {
        this.axiosGet();
    }

    axiosGet() {
                axios.get('/api/todo/')
             .then(res => this.setState({items: res.data}))
             .catch(err => console.log(err));
    }

    addItem(e) {
        // /console.log("id: " + this.state.items[this.state.items.length-1].id.toString())
        if (this._input.value !== "") {
            var newItem = {
                id: this.state.items.length===0?1:this.state.items[this.state.items.length-1].id+1,
                title: this._input.value,
                content: "",
                date: Date.now(),
                complete: false,
            };
            this.setState(
                (prevState) => {
                    return{
                        items: prevState.items.concat(newItem)
                    };
            });
        }
        
        this._input.value = "";
        
        // console.log(this.state.items);

        this._input.focus();

        e.preventDefault();

    }

    deleteItem(e) {

        console.log("key in deleteItem: " + e);
        console.log("item at delete: " + this.state.items);


        var filteredItems = this.state.items.filter(item =>  (item.id !== e))

        console.log("delete: " + filteredItems)
        console.log("delete: " + this.state.items)
        this.setState(
            (prevState) => {
                return{
                    items: filteredItems
                };
        });
    }

    markItem(e) {
        console.log("what is e? " + e)
        console.log("complete: " + this.state.items.find(item => item.id ===e).complete)
        var updatedItem =  this.state.items.map(x => ({...x}));
        updatedItem.find(item => item.id === e).complete = true;
            

        console.log("complete: " + updatedItem.find(item => item.id ===e).complete)
        console.log("complete: " + this.state.items.find(item => item.id ===e).complete)
        this.setState(
            (prevState) => {
                return {
                    items: updatedItem
                }
            })
    }
    


    handleSubmit = e => {

        // console.log("save item: ")
        // console.log(e)
        this.closeModal()
        axios
            .put(`http://localhost:8000/api/todo/${e.id}/`, e)
            .then(res => this.axiosGet())
            .catch(err => console.log(err));
    }

    addToServer(e) {
        console.log("item: " + this._input.value)
        if (this._input.value !== "") {
            var newItem = {
                // id: this.state.items.length===0?1:this.state.items[this.state.items.length-1].id+1,
                "title": this._input.value,
                "content": "desctiption: ",
                // date: Date.now(),
                "complete": false,
            };
            console.log("item title: " + newItem.title)
            console.log("item content: " + newItem.content)
            console.log("item complete: " + newItem.complete)
            console.log("the item added to todo list: ")
            console.log(newItem)
            axios.post("http://localhost:8000/api/todo/", newItem)
            .then(res => this.axiosGet())
            .catch( err => console.log(err))
        }
        
        this._input.value = "";
        this._input.focus();
        e.preventDefault();
    }

    markOnServer(e) {
        console.log("what is e? id: " + e)
        console.log("id: " + e + " old complete: " + this.state.items.find(item => item.id ===e).complete)
        var updatedItem =  this.state.items.map(x => ({...x}));
        var markedItem = updatedItem.find(item => item.id === e);
        markedItem.complete = true
            
        console.log("id: " + e + " updated complete: " + markedItem.complete)
        console.log("id: " + e + " original complete: "+ this.state.items.find(item => item.id ===e).complete)
        this.handleSubmit(markedItem)
    
    }

    deleteFromServer(e) {
        axios
        .delete(`http://localhost:8000/api/todo/${e}`)
        .then(res => this.axiosGet());
    }

    editItem = e => {
        console.log("item about to edit: " + e)
        this.showModal()
        this.setState({ tempItem: this.state.items.find(item => item.id ===e), modal: !this.state.modal });
    }

    showModal() {
        this.setState({
            toggle: true
        });
    }

    closeModal() {
        this.setState({
            toggle: false
        });
    }
    

    render() {
        return(
            <div className="todoMain">
                <div className="header">
                    <form onSubmit={this.addToServer}>
                        <input id="txtBox" 
                               ref={e => this._input=e}
                               placeholder="ENTER A TASK, e.g. PREPARE FOR INTERVIEW">
                        </input>
                        <button type="submit">ADD</button>
                    </form>
                </div>
                <TodoView items={this.state.items}
                          delete={this.deleteFromServer}
                          mark={this.markOnServer}
                          edit={this.editItem}/>

                {this.state.toggle ? 
                <Modal tempItem={this.state.tempItem}
                       close={this.closeModal}
                       save={this.handleSubmit}/> : null}
    
            </div>
        )
    }
}


export default Todo;