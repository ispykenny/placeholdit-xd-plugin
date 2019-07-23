const commands = require('commands')
const axios = require('./axios');
const {ImageFill, Color} = require("scenegraph");

const runImages = async (selection) => {
  let types = ["Rectangle", "Ellipse", "Polygon"];
  for(let i = 0; i < selection.items.length; i++){
    let selected = selection.items[i];
    let { localBounds } = selection.items[i];

    if(types.includes(selected.constructor.name)) {
      let height = Math.round(localBounds.height);
      let width = Math.round(localBounds.width);
      let getDate = await fetchImage(height, width);
      let fillImage = await new ImageFill(getDate)
      selected.fill = fillImage;
    }
    
  }
}

const fetchImage = (height, width) => axios(`https://data-uri-imagefill.herokuapp.com/?image=https://via.placeholder.com/${width}x${height}.png/?text=${width}x${height}`)
.then((response) => {
    return response.data
  }
)
.catch((err) => console.log(err))

module.exports = {
  commands: {
    doImage: runImages
  }
}