
import React, {Component} from 'react';
import "../styles/main.css";

export default class DeleteModal extends Component {

    render() {
            { console.log("message ", this.props.message)}
        return (

            <div className="delete-modal__backdrop">

                <div className="delete-modal__wrapper">
                    
                <div className="delete-modal__content">
                    <button
                        onClick={this.props.clickModalHandler}
                        value="cancel"
                        className="delete-modal__close" 
                        aria-label="close">
                        X
                        </button>
                    <h1 className="delete-modal__title"> Delete {this.props.item} inventory item?</h1>
                    <div className="delete-modal__content" >
                        { this.props.message ||
                            <p className="delete-modal__paragraph">Please confirm that you'd like to delete {this.props.item} from the inventory list.<br />
                            You won't be able to undo this action.</p>
                        }
                        
                        <button
                            className="delete-modal__button--cancel"
                            onClick={ this.props.clickModalHandler }
                            value="cancel" >
                            Cancel
                        </button>
                        <button
                            className="delete-modal__button--delete"
                            onClick={this.props.clickModalHandler}
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