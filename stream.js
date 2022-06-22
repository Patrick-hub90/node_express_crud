var fs = require('fs');

const streamer = fs.createReadStream('./Microservice3D.odt',{encoding:'latin1'});
const lireStream = fs.createWriteStream('./fichier.txt');
/*streamer.on('data',(chunk) =>{
    console.log(chunk.toString(),"jkdznvjkdfl.v");
    lireStream.write(chunk);
});*/
streamer.pipe(lireStream);