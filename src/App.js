import React, { Component } from "react";

import { Body, Header } from "./components";
import AppSearchProvider from "./app-search/AppSearchProvider";
import AppSearchDriver from "./app-search/AppSearchDriver";
import AppSearchAPIConnector from "./app-search/AppSearchAPIConnector";

import {
  buildFacetConfigFromConfig,
  buildSearchOptionsFromConfig,
  getConfig
} from "./config/config-helper";

function createDriver() {
  const { hostIdentifier, searchKey, endpointBase, engineName } = getConfig();
  return new AppSearchDriver({
    apiConnector: new AppSearchAPIConnector({
      hostIdentifier,
      searchKey,
      endpointBase,
      engineName
    }),
    facetConfig: buildFacetConfigFromConfig(),
    searchOptions: buildSearchOptionsFromConfig()
  });
}

class App extends Component {
  render() {
    const config = getConfig();

    if (!config.engineName) {
      return (
        <div>
          No config found. Be sure to provide configuration by either including
          a src/config/engine.json file, or including window.appConfig.
        </div>
      );
    }

    return (
      <AppSearchProvider driver={createDriver()}>
        {({ searchTerm, results }) => (
          <div
            className={`reference-ui${
              searchTerm || results.length > 0 ? " active-search" : ""
            }`}
          >
            <Header />
            <Body />
          </div>
        )}
      </AppSearchProvider>
    );
  }
}

export default App;
