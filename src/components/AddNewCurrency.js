import React, { Component } from 'react';

class AddNewCurrency extends Component {

  render() {
    return (
      <div className="add-new-currency" onClick={this.props.addNewCurrency}>
        {'+'}
      </div>
    );
  }

}

export default AddNewCurrency;
