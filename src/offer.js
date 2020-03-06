export class Offer {
    constructor(
        id, 
        offerVendorBrand,
        offerLogoVendorSquare,
        offerHeaderLong,
        offerDestinationUrl) {
        this.id = id;
        this.offerVendorBrand = offerVendorBrand;
        this.offerLogoVendorSquare = offerLogoVendorSquare;
        this.offerHeaderLong = offerHeaderLong;
        this.offerDestinationUrl = offerDestinationUrl;
    }
}

export default Offer;