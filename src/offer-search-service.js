import Offer from './offer';
import axios from 'axios';

class OfferSearchService {
    async search (term) {
        const result = await axios.post('https://vertical-reason-269719.appspot.com/api/search', {
            "query": `{
                search (term: "${term}" ) {
                    id,
                    offerVendorBrand,
                    offerLogoVendorSquare,
                    offerHeaderLong,
                    offerDestinationUrl
                }
            }`
          })
          .catch(function (error) {
            console.log(`error calling /api/search ${error}`);
          });
        if(result && result.data) {
            if(!result.data.data.search || result.data.data.search.length === 0 ) {
                return [];
            }
            const offers = result.data.data.search.map(
                x => new Offer(
                    x.id,
                    x.offerVendorBrand,
                    x.offerLogoVendorSquare,
                    x.offerHeaderLong,
                    x.offerDestinationUrl));
            return offers;
        }
    }
}  
export default OfferSearchService;
