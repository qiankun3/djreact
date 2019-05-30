import React, {Component} from 'react';


class Popup extends Component {
    render() {
        return (
            <div className='popup'>
              <div className='popup_inner'>
                <h1>what?</h1>
              <button onClick={this.props.close}>DONE</button>
              </div>
            </div>
            
        );
    }
}

export default Popup;