import React, { Component } from 'react';

class AddNewDate extends Component {

  render() {
    return (
      <div className="add-new-date" onClick={this.props.addNewDate}>
        {'+'}
      </div>
    );
  }

}

export default AddNewDate;
