
import React, {Component} from 'react';
import "../styles/main.css";

export default class DeleteModal extends Component {

    constructor(props) {
        super(props);
        this.state = props;
    }

    render() {
        return(
            <div className="delete-modal__wrapper">
                <div className="delete-modal">
                    <h1 className="delete-modal__title"> Deletetelevision inventory item?</h1>
                    <div className="nav" >
                        <p className="delete-modal__paragraph">Please confirm that you'd like to delete {this.props.item} from the inventory list.</p>
                        <p>You won't be able to undo this action.</p>
                        <button className="delete-modal__button--cancel" onClick={ this.state.clickHandler } >Cancel</button>
                        <button className="delete-modal__button--delete" onClick={ this.state.clickHandler } >Delete</button>
                    </div>
                </div>
            </div>
        )
    }
}