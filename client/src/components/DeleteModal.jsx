
import React, {Component} from 'react';
import "../styles/main.css";

export default class DeleteModal extends Component {

    constructor(props) {
        super(props);
        this.state = props;
    }

    render() {
        return (
            <div className="delete-modal__backdrop">

                <div className="delete-modal__wrapper">
                    
                <div className="delete-modal__content">
                    <button
                        onClick={this.state.clickModalHandler}
                        value="cancel"
                        className="delete-modal__close" 
                        aria-label="close">
                        X
                        </button>
                    <h1 className="delete-modal__title"> Delete {this.props.item} inventory item?</h1>
                    <div className="delete-modal__content" >
                        { this.state.message ||
                            <p className="delete-modal__paragraph">Please confirm that you'd like to delete {this.props.item} from the inventory list.<br />
                            You won't be able to undo this action.</p>
                        }
                        
                        <button
                            className="delete-modal__button--cancel"
                            onClick={ this.state.clickModalHandler }
                            value="cancel" >
                            Cancel
                        </button>
                        <button
                            className="delete-modal__button--delete"
                            onClick={this.state.clickModalHandler}
                            value="delete" >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}