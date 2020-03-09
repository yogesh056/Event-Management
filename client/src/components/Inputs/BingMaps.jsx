import React, { Component } from 'react';
import { ReactBingmaps } from 'react-bingmaps';
import Mention from './Mention';
import AsyncSelect from './AsyncSelect';
class BingMaps extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: true,
      bingmapKey: "AhfxtU5ERbIsHxq2GUPqlWekK1bZf51RdG8zatOvy9C9O6_z0jSrPOLGWxNMtqXx", //Don't use this key in your environment.
      infoboxes: [
        {
          "location": [13.0827, 80.2707], "option": { title: 'Chennai', description: '...' }, "addHandler": { "type": "click", callback: this.callBackMethod }
        }
      ],
      pushPins: [
        {
          "location": [13.0827, 80.2707], "option": { color: 'red' }, "addHandler": { "type": "click", callback: this.callBackMethod }
        }
      ],
      regularPolygons: [
        {
          "center": [13.0827, 80.2707],
          "radius": 5,
          "points": 36,
          "option": { fillColor: "rgba(0,0,0,0.5)", strokeThickness: 2 }
        }
      ],
      infoboxesWithPushPins: [
        {
          "location": [13.0827, 80.2707],
          "addHandler": "mouseover", //on mouseover the pushpin, infobox shown
          "infoboxOption": { title: 'Infobox Title', description: 'Infobox' },
          "pushPinOption": { title: 'Pushpin Title', description: 'Pushpin' },
          "infoboxAddHandler": { "type": "click", callback: this.callBackMethod },
          "pushPinAddHandler": { "type": "click", callback: this.callBackMethod }
        }
      ],
      boundary: {
        "location": ['chennai'],
        "option": {
          entityType: 'PopulatedPlace'
        },
        "polygonStyle": {
          fillColor: 'rgba(161,224,255,0.4)',
          strokeColor: '#a495b2',
          strokeThickness: 2
        }
      },
      searchInput: "",
      getLocationHandledData: "",
      polyline: {
        "location": [[13.0827, 80.2707], [13.0827, 80.1907]],
        "option": { strokeColor: 'blue', strokeThickness: 10, strokeDashArray: [1, 2, 5, 10] }
      },
      directions: {
        "renderOptions": { "itineraryContainer": "itineraryContainer" },
        "requestOptions": { "routeMode": "driving", "maxRoutes": 2 },
        "wayPoints": [
          {
            address: 'Chennai, Tamilnadu'
          },
          {
            address: 'Salem, Tamilnadu'
          }
        ]
      }
    }
  }



  changeState() {
    this.setState({
      infoboxes: [
        {
          "location": [13.0827, 80.2707], "option": { title: 'Chennai', description: 'Tamilnadu' }, "addHandler": { "type": "click", callback: this.callBackMethod }
        }
      ],
      pushPins: [
        {
          "location": [13.0827, 80.2707], "option": { color: 'yellow' }, "addHandler": { "type": "click", callback: this.callBackMethod }
        },
        {
          "location": [13.0727, 80.2707], "option": { color: 'green' }, "addHandler": { "type": "click", callback: this.callBackMethod }
        }
      ],
      regularPolygons: [
        {
          "center": [13.0827, 80.2707],
          "radius": 5,
          "points": 6,
          "option": { fillColor: "rgba(0,0,0,0.5)", strokeThickness: 2 }
        }
      ],
      infoboxesWithPushPins: [
        {
          "location": [13.0827, 80.2707],
          "addHandler": "mouseover", //on mouseover the pushpin, infobox shown
          "infoboxOption": { title: 'Chennai', description: 'Infobox' },
          "pushPinOption": { title: 'Chennai', description: 'Pushpin' },
          "infoboxAddHandler": { "type": "click", callback: this.callBackMethod },
          "pushPinAddHandler": { "type": "click", callback: this.callBackMethod }
        }
      ],
      boundary: {
        "search": "636303",
        "polygonStyle": {
          fillColor: 'rgba(161,224,255,0.4)',
          strokeColor: '#a495b2',
          strokeThickness: 2
        },
        "option": {
          entityType: 'PopulatedPlace'
        }
      },
      polyline: {
        "location": [[13.0827, 80.2707], [13.0527, 80.2707]],
        "option": { strokeColor: 'red', strokeThickness: 10, strokeDashArray: [1, 2, 5, 10] }
      },
      directions: {
        "inputPanel": "inputPanel",
        "renderOptions": { "itineraryContainer": "itineraryContainer" },
        "requestOptions": { "routeMode": "driving", "maxRoutes": 2 },
        "wayPoints": [
          {
            address: 'Chennai, Tamilnadu'
          },
          {
            address: 'Salem, Tamilnadu'
          },
          {
            address: 'Coimbatore, Tamilnadu'
          }
        ]
      }
    })
  }
  handleSubmit(event) {
    //http://dev.virtualearth.net/REST/v1/Locations?q=Greenville&maxResults=10&key={BingMapsAPIKey}


    fetch("http://dev.virtualearth.net/REST/v1/Autosuggest?query=Sri%20Krishna%20Colle&userRegion=IN&countryFilter=IN&includeEntityTypes=Place&key=AhfxtU5ERbIsHxq2GUPqlWekK1bZf51RdG8zatOvy9C9O6_z0jSrPOLGWxNMtqXx")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result.items
          }, () => console.log("this.sstate", this.state));
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
    if (this.state.searchInput !== null && this.state.searchInput !== "") {
      this.setState({
        boundary: {
          "search": this.state.searchInput,
          "polygonStyle": {
            fillColor: 'rgba(161,224,255,0.4)',
            strokeColor: '#a495b2',
            strokeThickness: 2
          },
          "option": {
            entityType: 'PopulatedPlace'
          }
        }
      })
    }
    event.preventDefault();
  }
  GetLocationHandled(location) {
    this.setState({
      getLocationHandledData: JSON.stringify(location)
    });
  }
  GetEventHandled(callbackData) {
    console.log(callbackData);
  }
  render() {
    return (
      <div>
        <Mention
          api='users/allUsers'
          custom={true}
          customValue="first_name"
        />
        <AsyncSelect
          api='users/allUsers'
          custom={true}
          customValue="first_name"
        />
        <div>
          <button onClick={this.changeState.bind(this)}>Change State</button>
          <button onClick={() => { this.setState({ isVisible: !this.state.isVisible }) }}>
            {this.state.isVisible ? "Hide" : "Show"}
          </button>
          <a target="_blank" href="https://github.com/iniamudhan/react-bingmaps/blob/dev/src/App.js">source</a>
        </div>
        {this.state.isVisible && (<div>

          <div className="map-two">
            <u>Bingmaps with Spatial Data Service (Boundary)</u>
            <span style={{ 'display': 'inline-block' }}>
              <form onSubmit={this.handleSubmit.bind(this)}>
                <input type="text" placeholder="search place, pin, city"
                  onChange={(event) => { this.setState({ searchInput: event.target.value }) }}
                  value={this.state.searchInput}>
                </input>
                <input type="submit" value="Search" />
              </form>
            </span>
            <ReactBingmaps
              className="customClass"
              id="six"
              center={[13.0827, 80.2707]}
              bingmapKey={this.state.bingmapKey}
              boundary={this.state.boundary}
            >
            </ReactBingmaps>
          </div>

        </div>)}
      </div>
    );
  }
}

export default BingMaps


// import React, { Component } from 'react'
// import { Select, Spin } from 'antd';
// import API from "../../middleware/api"

// const { Option } = Select;

// export default class AsyncSelect extends Component {
//   constructor(props) {
//     super(props);
//     this.lastFetchId = 0;
//     this.state = {
//       data: [],
//       value: [],
//       fetching: false,
//     };
//   }

//   componentDidUpdate(prevProps) {
//     if (JSON.stringify(this.props) !== JSON.stringify(prevProps)) {
//       this.getValues()
//       return true;
//     } else return false;
//   }
//   getValues = async () => {
//     const { api, custom } = this.props
//     this.lastFetchId += 1;
//     // const fetchId = this.lastFetchId;
//     this.setState({ data: [], fetching: true });
//     fetch("http://dev.virtualearth.net/REST/v1/Autosuggest?query=Sri%20Krishna%20Colle&userRegion=IN&countryFilter=IN&includeEntityTypes=Place&key=AhfxtU5ERbIsHxq2GUPqlWekK1bZf51RdG8zatOvy9C9O6_z0jSrPOLGWxNMtqXx")
//     .then(res => res.json())
//     .then(
//       (result) => {
//         console.log('fetching details',result)
//     const data = result..map(value => ({
//       text: custom ? (value[`${this.props.customValue}`]) : `${value.name}`,
//       value: `${value.id}`
//     }));
//     this.setState({ data, fetching: false });
//       },
//       (error) => {
//         this.setState({
//           isLoaded: true,
//           error
//         });
//       }
//     )
   
//   };

//   onChange = value => {
//     this.setState({
//       value,
//       data: [],
//       fetching: false,
//     });
//   };

//   render() {
//     const { fetching, data, value } = this.state;
//     const { placeholder } = this.props;

//     return (
//       [<Select
//         notFoundContent={fetching ? <Spin size="small" /> : null}
//         value={value}
//         showSearch
//         style={{ width: 200 }}
//         optionFilterProp="children"
//         onChange={this.onChange}
//         onFocus={onFocus}
//         onBlur={onBlur}
//         onSearch={onSearch}
//         filterOption={(input, option) =>
//           option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
//         }
//       >
//         {data.map(d => (
//           <Option key={d.value}>{d.text}</Option>
//         ))}
//       </Select>,
//       <ReactBingmaps
//         className="customClass"
//         id="six"
//         center={[13.0827, 80.2707]}
//         bingmapKey={this.state.bingmapKey}
//         boundary={this.state.boundary}
//       >
//       </ReactBingmaps>]
//     );
//   }
// }

