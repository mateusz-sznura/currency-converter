import React, { Component } from 'react';

class DateInput extends Component {

  constructor(props) {
    super(props);

    this.setDate = event => {
      const { setDate } = this.props;
      setDate(event.target.value);
    }
  }

  render() {
    const { date, removeDate } = this.props;
    return (
      <div className="date-input">
        <div className="remove-date" onClick={removeDate}>
          {'-'}
        </div>
        <input type="date" value={date} onChange={this.setDate} />
      </div>
    );
  }

}

export default DateInput;
