// import {MarkerClusterer} from './src/markerClusterer'

let map;
let locations = [];

    // init function runs all else, is called by html callback
 function init() {
     initMap();
 }

    //gets data
  requestData = async () => {
    const response = await fetch('https://data.brla.gov/resource/5rji-ddnu.json?offense=11:140&$limit=50000');
    const json = await response.json();
    await fillLocationArray(json);
  }
    //take json data, fill location array
  fillLocationArray = (json) => {
      for(let i = 0; i <json.length; i++){
          let item = json[i];
        try{
            locations.push([item.geolocation.coordinates[0], item.geolocation.coordinates[1]]);
        }
        catch(error){
            console.error(error);
        }
        
      }
  }


    //init map
  initMap = async () => {
      let markers = [];
        //create map
      let map = new google.maps.Map(document.getElementById('map'), {
          center: {
              lat: 30.407165038,
              lng: -91.184665928
          },
          zoom: 13
      });

        //fetch the data
      await requestData();
        //declare marker
      let marker; 
            //create markers
        for (let i = 0; i < locations.length; i++) {
            let latitude = locations[i][0];
            let longitude = locations[i][1];
            marker = new google.maps.Marker({
                position: new google.maps.LatLng({lat: locations[i][1], lng: locations[i][0]}),
            map: map,
            title: `${i}`
        });
                //push to array of markers
            markers.push(marker);
    }   

            //creates markerCluster using map, and array of markers
        let markerCluster = new MarkerClusterer(map, markers, {
            imagePath: './src/img/m'
        });

  }


