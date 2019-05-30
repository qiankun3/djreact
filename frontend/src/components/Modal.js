import React, {Component} from 'react';

// create a Modal for poping up edit UI windows
class Modal extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      tempItem: this.props.tempItem
    };
    this.createModal=this.createModal.bind(this);
    this.handleEdit=this.handleEdit.bind(this);
  }

  handleEdit(e) {
    var { name, value } = e.target;
    console.log(e.target)
    if (e.target.type === "checkbox") {
      value = e.target.checked;
    }
    const tempItem = { ...this.state.tempItem, [name]: value };
    this.setState({ tempItem });
  }
  
  
  createModal(e) {
    const { save } = this.props
    return (
      <div className='modal'>
        <div className='modalBody'>
          <form className="modalForm">
            <div className="modalTitle">
              <label>Title:<br></br><br></br></label>
              <input
                id="tboxTitle"
                type="text"
                value={this.state.tempItem.title}
                name="title"
                placeholder="Enter a title"
                onChange={this.handleEdit}
                />
            </div>

            <div className="modalContent">
              <label >Content:<br></br><br></br></label>
              <textarea
                row = "5"
                id="tboxContent"
                type="text"
                name="content"
                value={this.state.tempItem.content}
                onChange={this.handleEdit}
                placeholder="Enter a title"
              />
            </div>

            <div className="modalComplete">
              <label>
                <input
                  id="tboxComplete"
                  type="checkbox"
                  name="complete"
                  checked={this.state.tempItem.complete}
                  onChange={this.handleEdit}
                  />completed
              </label>
            </div>
          </form>
          
          <div className="modalButton">
            <button onClick={() => save(this.state.tempItem)}>SAVE</button>
            <button id="discard" onClick={this.props.close}>DISCARD</button>
          </div>

        </div>
      </div>
      
    )
  }


  render() {
    return (
        <div className='wrapper'>
          {this.createModal(this.state.tempItem)}
          <div className='mask' onClick={this.props.close}></div>
        </div>
        
    );
}

}

export default Modal;