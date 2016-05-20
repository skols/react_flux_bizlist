var React               = require("react"),
    AppActions          = require("../actions/AppActions"),
    BusinessStore       = require("../stores/BusinessStore"),
    NavBar              = require("./NavBar"),
    BusinessList        = require("./BusinessList"),
    BusinessFormNew     = require("./BusinessFormNew"),
    BusinessFormEdit    = require("./BusinessFormEdit");
    

function getAppState() {
    return {
        businesses: BusinessStore.getBusinesses().list,
        mainState: BusinessStore.getBusinesses().mainState,
        showExtended: BusinessStore.getBusinesses().showExtended,
        selectedId: BusinessStore.getBusinesses().selectedId,
        selected: BusinessStore.getBusinesses().selected
    };
}
    
var App = React.createClass({
    getInitialState: function() {
        return getAppState();
    },
    componentDidMount: function() {
        BusinessStore.addChangeListener(this._onChange);
    },
    componentUnmount: function() {
        BusinessStore.removeChangeListener(this._onChange);
    },
    render: function() {
        if(this.state.mainState === 'new') {
            var businessForm = <BusinessFormNew />;
        } else if(this.state.mainState === 'edit') {
            var businessForm = <BusinessFormEdit callbackParent={this.onEditChange} selected={this.state.selected} selectedId={this.state.selectedId} />;
        } else if(this.state.mainState === 'list') {
            var businessList = <BusinessList showExtended={this.state.showExtended} selectedId={this.state.selectedId} businesses={this.state.businesses} />;
        }
        return (
            <div className="wrapper">
                <NavBar mainState = {this.state.mainState}/>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            {businessForm}
                            {businessList}
                        </div>
                    </div>
                </div>
            </div>
        );
    },
    onEditChange: function(newState, fieldName) {
        var selected = this.state.selected;
        selected[fieldName] = newState;
        this.setState({selected: selected});
    },
    // Update view state when change is received
    _onChange: function() {
        this.setState(getAppState());
    }
});

module.exports = App;