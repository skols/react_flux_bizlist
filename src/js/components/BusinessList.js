var React           = require("react"),
    AppActions      = require("../actions/AppActions"),
    BusinessStore   = require("../stores/BusinessStore"),
    Business        = require("./Business.js");
    
var BusinessList = React.createClass({
    render: function() {
        var showExtended = this.props.showExtended;
        var selectedId = this.props.selectedId;
        var businessNodes;
        if(this.props.businesses) {
            businessNodes = this.props.businesses.map(function(business, index) {
                return(
                    <Business showExtended={showExtended} selectedId={selectedId} businessInfo={business} key={index} />
                );
            });
        } else {
            businessNodes = 'There are no listings.';
        }
        return(
            <div>
                {businessNodes}
            </div>
        );
    }
});

module.exports = BusinessList;