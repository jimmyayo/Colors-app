import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Palette from './Palette'
import seedColors from './seedColors'
import { generatePalette } from './colorHelpers'
import PaletteList from './PaletteList'
import SingleColorPalette from './SingleColorPalette'
import NewPaletteForm from './NewPaletteForm'
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    const savecPalettes = JSON.parse(window.localStorage.getItem("palettes"));
    this.state = { palettes: savecPalettes || seedColors };

    this.savePalette = this.savePalette.bind(this);
    this.findPalette = this.findPalette.bind(this);
    this.deletePalette = this.deletePalette.bind(this);
  }

  findPalette(id) {
    return this.state.palettes.find(function (palette) {
      return palette.id === id
    });
  }

  savePalette(newPalette) {
    this.setState({ palettes: this.state.palettes.concat(newPalette) },
      this.syncLocalStorage);
  }

  deletePalette(id) {
    console.log('In App.js deletePalette: ' + id);

    this.setState(
      st => ({
        palettes: st.palettes.filter(p => p.id !== id)
      }),
      this.syncLocalStorage);


  }

  syncLocalStorage() {
    window.localStorage.setItem("palettes", JSON.stringify(this.state.palettes));
  }

  render() {
    return (
      <Route render={({ location }) => (
        <TransitionGroup>
          <CSSTransition key={location.key} classNames="fade" timeout={500}>
            <Switch location={location}>
              <Route
                exact
                path='/palette/new'
                render={routeProps => (
                  <div className="page">
                    <NewPaletteForm
                      savePalette={this.savePalette}
                      palettes={this.state.palettes}
                      {...routeProps}
                    />
                  </div>

                )}
              />
              <Route
                exact
                path='/palette/:paletteId/:colorId'
                render={routeProps => (
                  <div className="page">
                    <SingleColorPalette
                      colorId={routeProps.match.params.colorId}
                      palette={generatePalette(
                        this.findPalette(routeProps.match.params.paletteId)
                      )}
                    />
                  </div>
                )}
              />
              <Route
                exact
                path='/'
                render={routeProps => (
                  <div className="page">
                    <PaletteList 
                      palettes={this.state.palettes} 
                      deletePalette={this.deletePalette} 
                      {...routeProps} />
                  </div>
                )}

              />

              <Route
                exact
                path='/palette/:id'
                render={routeProps => (
                  <div className="page">
                    <Palette
                      palette={generatePalette(
                        this.findPalette(routeProps.match.params.id)
                      )}
                    />
                  </div>
                )}
              />
            </Switch>
          </CSSTransition>
        </TransitionGroup>

      )
      } />
    )
  }
}

export default App
