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

        // GET request from server
        this.axiosGet = this.axiosGet.bind(this);

        // toggle the modal UI popup window
        this.showModal = this.showModal.bind(this);
        this.closeModal = this.closeModal.bind(this)

        // manipulate date from backend api including CRUD
        this.deleteFromServer = this.deleteFromServer.bind(this);
        this.addToServer = this.addToServer.bind(this);
        this.markOnServer = this.markOnServer.bind(this);

        //the function below are for offline test uses 
        this.addItem = this.addItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.markItem = this.markItem.bind(this);
        this.editItem = this.editItem.bind(this);


    }

    async componentDidMount() {
        this.axiosGet();
    }

    axiosGet() {
                axios.get('/api/todo/')
             .then(res => this.setState({items: res.data}))
             .catch(err => console.log(err));
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

    // handle with updating exsiting entries
    handleSubmit = e => {
        this.closeModal()
        axios
            .put(`http://localhost:8000/api/todo/${e.id}/`, e)
            .then(res => this.axiosGet())
            .catch(err => console.log(err));
    }

    addToServer(e) {
        if (this._input.value !== "") {
            var newItem = {
                "title": this._input.value,
                "content": "desctiption: ", 
                "complete": false,
            };
            axios.post("http://localhost:8000/api/todo/", newItem)
            .then(res => this.axiosGet())
            .catch( err => console.log(err))
        }
        
        this._input.value = "";
        this._input.focus();
        e.preventDefault();
    }

    markOnServer(e) {
        var updatedItem =  this.state.items.map(x => ({...x}));
        var markedItem = updatedItem.find(item => item.id === e);
        markedItem.complete = true
        this.handleSubmit(markedItem)
    
    }

    deleteFromServer(e) {
        axios
        .delete(`http://localhost:8000/api/todo/${e}`)
        .then(res => this.axiosGet());
    }

    editItem = e => {
        this.showModal()
        this.setState({ tempItem: this.state.items.find(item => item.id ===e), modal: !this.state.modal });
    }

    addItem(e) {
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
        this._input.focus();
        e.preventDefault();

    }

    deleteItem(e) {

        var filteredItems = this.state.items.filter(item =>  (item.id !== e))

        this.setState(
            (prevState) => {
                return{
                    items: filteredItems
                };
        });
    }

    markItem(e) {
        var updatedItem =  this.state.items.map(x => ({...x}));
        updatedItem.find(item => item.id === e).complete = true;

        this.setState(
            (prevState) => {
                return {
                    items: updatedItem
                }
            })
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