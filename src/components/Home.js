import React from "react";
import DatePicker from "react-datepicker";

const home = (props) => {

    return (
        <section id="home">
          <div className="container">
               <div className="col-md-6">
                <img alt='Bitcoin Logo' src={require('../assets/img/bcoin-logo.png')} className='logo-bitcoin'/>
               </div>

               <div className="col-md-6">
                <h2>Enter Transaction</h2>

                <label>Price</label>
                <input type="text" name="amount" onChange={props.onInputChange}
                value={props.globalState.cryptoAmount}
                />

                <label>Date</label>
                <DatePicker selected={props.globalState.date}
        onChange={props.handleCh}/>

                <button type="submit" onClick={props.checkProfits}>
                 Check Profits
                </button>
                
               </div>
          </div>
        </section>
    )


}

export default home;