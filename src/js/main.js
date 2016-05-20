var React           = require("react"),
    ReactDOM        = require("react-dom"),
    App             = require("./components/App"),
    AppAPI          = require("./utils/appAPI.js"),
    StartData       = require("./startdata.js");

// Bring in the data; check if it exists and if not, bring it in
if(localStorage.getItem('businesses') == null) {
    StartData.init();
}

// Get Items From API
AppAPI.getAllItems();
    
ReactDOM.render(
    <App />,
    document.querySelector('#main')
);