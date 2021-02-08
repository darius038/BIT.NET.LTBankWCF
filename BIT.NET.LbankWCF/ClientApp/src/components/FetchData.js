import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";


export class FetchData extends Component {
  static displayName = FetchData.name;

  constructor(props) {
    super(props);
    this.state = {
      ratedata: [],
      loading: true,
      startDate: new Date("1994/01/01"),
      selectedDate: "Select Date"
    };
    this.handleChange = this.handleChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  handleChange(date) {
    
    this.setState({
      startDate: date     
    })
    console.log(this.state.startDate)
  }

  onFormSubmit(e) {
    e.preventDefault();
    let tmpDate = new Date (this.state.startDate)
    tmpDate.setDate(tmpDate.getDate() + 1)
    let tmp = tmpDate.toISOString().split("T");
    this.setState({          
      selectedDate: "Loading data for "+tmp[0]
    })
    console.log(this.state.selectedDate)
    this.populateData();
  }

  // componentDidMount() {
  //     this.populateData();
  // }

  static renderTable(ratedata) {
    return (
      <div>
<h2 id="tabelLabel">Currency Rates </h2>
      <table className='table table-striped' aria-labelledby="tabelLabel">
        <thead>
          <tr>
            <th className={"w-25"}>Currency</th>
            <th className={"w-25"}>Quantity LTL</th>
            <th className={"w-25"}>Rate</th>
            <th className={"w-25"}>Change</th>
          </tr>
        </thead>
        <tbody>
          {ratedata.map(ratedata =>
            <tr key={ratedata.currency}>
              <td>{ratedata.currency}</td>
              <td>{ratedata.quantity}</td>
              <td>{ratedata.rate}</td>
              <td className={parseFloat(ratedata.change) >= 0 ? "up" : "down"}>{ratedata.change}</td>             
            </tr>
          )}
        </tbody>
      </table>
      </div>
      
    );
  }

  render() {
    let contents = this.state.loading
      ? <p><em>{this.state.selectedDate}...</em></p>
      : FetchData.renderTable(this.state.ratedata);

    return (
      <div>
        <form onSubmit={this.onFormSubmit}>
          <div className="form-group">
            <DatePicker             
              utcOffset={0}
              dateFormat="yyyy/MM/dd"
              minDate={new Date('1994/01/01')}
              maxDate={new Date('2014/12/31')}
              selected={this.state.startDate}
              onChange={this.handleChange}
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
            />
          </div>
          <button className="btn btn-primary">Get Currency Rates</button>
        </form>
        <hr></hr>
        
        <p>This component demonstrates backend server fetched data from the SOAP</p>
        {contents}
      </div>
    );
  }

  async populateData() {
    let tmpDate = new Date (this.state.startDate)
    tmpDate.setDate(tmpDate.getDate() + 1)
    let tmp = tmpDate.toISOString().split("T");
    const response = await fetch('changerate?date=' + tmp[0]);
    console.log('tmp' + this.state.startDate +" " +tmp[0])
    const data = await response.json();
    this.setState({ ratedata: data, loading: false });
  }
}
