// import {MarkerClusterer} from './src/markerClusterer'

let map;
let locations = [];

 function init() {
     initMap();
 }

    //gets data
  requestData = async () => {
    const response = await fetch('https://data.brla.gov/resource/5rji-ddnu.json?offense=11:140');
    const json = await response.json();
    await fillLocationArray(json);
  }

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
      let markers = []
      let map = new google.maps.Map(document.getElementById('map'), {
          center: {
              lat: 30.407165038,
              lng: -91.184665928
          },
          zoom: 13
      });

      
      await requestData();
    //  latitude and longitude
      let marker; 
        for (let i = 0; i < locations.length; i++) {
            let latitude = locations[i][0];
            let longitude = locations[i][1];
            marker = new google.maps.Marker({
                position: new google.maps.LatLng({lat: locations[i][1], lng: locations[i][0]}),
            map: map,
            title: `${i}`
        });
            markers.push(marker);
    }   

        let markerCluster = new MarkerClusterer(map, markers, {
            imagePath: './src/img/m'
        });

  }


