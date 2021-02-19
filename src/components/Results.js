/* eslint-disable eqeqeq */
import React, { Component } from 'react';



class results extends Component {
  
  checkGains(){
    const {percent} = this.props.globalState.totalStatus

    if(this.props.globalState.status == 'gain'){
      return `You made ${percent}% profit`
    } else {
      return `You loss ${percent}% of your initial investment`
    }
  } 

  render() {
    const {newCP, newSP} =  this.props.globalState.totalStatus; 
    

  return ( 
 <section id="results">
     <div className="container">

      <div className="col-m-8">
        <h3>Your ${newCP} dollar investment is now</h3>
        <h1>${newSP}</h1>
        <h4>{this.checkGains()}</h4>
      </div>  

     </div>
 </section>
  )
 }
}


export default results;