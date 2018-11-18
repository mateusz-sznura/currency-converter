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
    const { date } = this.props;
    return (
      <div className="date-input">
        <input type="date" value={date} onChange={this.setDate} />
      </div>
    );
  }

}

export default DateInput;
