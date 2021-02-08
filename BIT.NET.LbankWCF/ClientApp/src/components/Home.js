import React, { Component } from 'react';

export class Home extends Component {
  static displayName = Home.name;

  render () {
    return (
      <div>
        <h2>WebService</h2>
        <p>WebService provides official (established by Bank of Lithuania) exchange rates of the Litas against Foreign Currencies.</p>
        <ul>
          <li><a href='http://www.lb.lt/webservices/ExchangeRates/ExchangeRates.asmx?op=getExchangeRatesByDate'>getExchangeRatesByDate </a>
          - Returns a list containing exchange rates for the specified date.</li>
          <li>The following operations are supported. For a formal definition, please review the <a href='http://www.lb.lt/webservices/ExchangeRates/ExchangeRates.asmx?WSDL'>Service Description.</a></li>        
        </ul>
        <hr></hr>       
        <p>The <code>ClientApp</code> subdirectory is a standard React application based on the <code>create-react-app</code> template. If you open a command prompt in that directory, you can run <code>npm</code> commands such as <code>npm test</code> or <code>npm install</code>.</p>
      </div>
    );
  }
}
