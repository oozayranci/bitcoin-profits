import React, { Component } from 'react';
import Home from "../../components/Home";
import Results from "../../components/Results";
import axios from 'axios';
import '../sass/App.scss';



class App extends Component {
     state = {
       location: "home",
       date: new Date(),
       data: '',
       cryptoAmount: 1,
       status: '',
       totalStatus: ''
       }

       componentWillMount() {
        const thy = this;
     axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC&tsyms=BTC,USD,EUR&extraParams=bitcoin-profits')
     .then(function (response) {
        
       thy.setState({
         btcCurrent: response.data.BTC
      }, () => {
         console.log(thy.state);
       })
     })
     .catch(function (error) {
       console.log(error);
     });
      }

        routingSys() {
      
       switch(this.state.location) {
       case 'home':
        return <Home 
          handleCh={this.handleChDate= this.handleChDate.bind(this)}
         globalState={this.state} 
         onInputChange={this.onInputChange = this.onInputChange.bind(this)}
         checkProfits={this.checkProfits = this.checkProfits.bind(this)}
         />
        
       case 'results':
        return <Results globalState={this.state} />
        
       default:
        return <Home />
    }
    
  }
  
  handleChDate(date) {
    this.setState ({ date: date }, () => console.log(this.state.date.getTime()));
    

  }
 
  onInputChange(event){
    this.setState({
      cryptoAmount: event.target.value
    })
  }
  
  checkProfits(){
    
    const thy = this;
    axios.get(`https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC&tsyms=BTC,USD,EUR&extraParams=bitcoin-profits`)
      .then(function (response) {
        thy.setState({
          data: response.data.BTC
        }, () => {
          console.log(thy.state);
          const CP = thy.state.data.USD
          let newCP = (thy.state.cryptoAmount * 100)
          newCP = (newCP * CP) / 100
          const SP = thy.state.btcCurrent.USD;
          let newSP = (thy.state.cryptoAmount * 100)
          newSP = (newSP * SP) / 100

          if (newCP < newSP) {
            const gain = newSP - newCP
            let gainPercent = (gain/ newCP) * 100
            gainPercent = gainPercent.toFixed(2)
            console.log(`${thy.state.cryptoAmount} bitcoin newSP: ${newSP}, SP: ${SP}, newCP: ${newCP}, CP: ${CP}`)
            console.log(`profit percent is ${gainPercent}`)

            thy.setState({
              location: 'results',
              status: 'gain',
              totalStatus: {
                newCP: newCP.toFixed(2),
                CP: CP,
                newSP: newSP.toFixed(2),
                SP: SP,
                percent: gainPercent
              }
            }, () => console.log(thy.state))
            
            

          } else {
            const loss = newCP - newSP
            let lossPercent = (loss / newCP) * 100
            lossPercent = lossPercent.toFixed(2)
            console.log(`loss percent is ${lossPercent}`)

            thy.setState({
              location: 'results',
              status: 'loss',
              totalStatus: {
                newCP: newCP.toFixed(2),
                CP: CP,
                newSP: newSP.toFixed(2),
                SP: SP,
                percent: lossPercent
              }
            }, () => console.log(thy.state))
          }
          
        })
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="home">
         <div className="container">
           <header>
             <div className="logo" onClick={this.checkProfits = this.checkProfits.bind(this)}>
               Crypto Profits

               
               </div>
               <nav className="menu">
                <a href="/" className="reg-link">Register</a>
               </nav>
           </header>
           
           {this.routingSys()}
         </div>
        
      </div>
    );
  }
}

export default App;
