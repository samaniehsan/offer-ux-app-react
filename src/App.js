import React from 'react';
import './App.css';
import SearchService from './offer-search-service'

class App extends React.Component {
  constructor(){
    super()
    this.onKeyPressed = this.onKeyPressed.bind(this);
    this.searchOffers = this.searchOffers.bind(this);
    this.onHandleChange = this.onHandleChange.bind(this);
    this.handleGetNow = this.handleGetNow.bind(this);
    this.state = {term : '', offers:[]};
  }
  
  onHandleChange (event) {
    this.setState({term: event.target.value});
  }

  onKeyPressed (event) {
    if (event && event.key === "Enter") {
      this.searchOffers();
    }
  }
  
  async searchOffers() {
    const service = new SearchService();
    var foundOffers = await service.search(this.state.term);
    
    console.log(`RawData:${JSON.stringify(foundOffers)}`);
    this.setState({offers: foundOffers});
  }

  handleGetNow (url) {
    window.open(url, '_blank');
  }

  render () {
    return <div className="App">
        <div className="flex-container-wrap">
          <label id="offersearchLabel" htmlFor="offersearch" className="element-with-margin">Find Great Offers:</label>
          <input 
          className="element-with-margin"
          type="text" 
          id="offersearch" 
          name="offersearch"
          placeholder="coffee"
          required
          size="30"
          onChange={this.onHandleChange}
          value={this.state.term}
          onKeyPress={this.onKeyPressed}/>
          <input 
          id="offerSearchButton" 
          className="element-with-margin" 
          type="submit" 
          value="Search"
          onClick={this.searchOffers}/>
        </div>
        <span>Offer Results:{this.state.offers.length}</span>
        <div className="flex-container">
        {this.state.offers.map((value) => {
          return <div>
                  <div>
                    <button 
                      onClick={() => this.handleGetNow(value.offerDestinationUrl)}>Get Now
                    </button>
                  </div>
                  <a href={value.offerDestinationUrl} rel="noopener noreferrer" target="_blank">
                    <img src={value.offerLogoVendorSquare} alt={value.offerVendorBrand}></img>
                  </a>
                  <div>{value.offerVendorBrand}</div>
                  <p>{value.offerHeaderLong}</p>
                  </div>
        })}
        </div>
      </div>;
  }
}

export default App;
