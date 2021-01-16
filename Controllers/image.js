const imageThumbnail = require('image-thumbnail');
const fs = require("fs");
var path = require('path');

exports.upload = async(req , res)=>{
    const url = req.body.url 
    try {
    const thumbnail = await imageThumbnail({ uri: url});
    console.log(thumbnail);
    fs.writeFileSync("image.jpg", thumbnail);
    filename = path.join(process.cwd() , "image.jpg")
    res.sendFile(filename);
} catch (err) {
    console.error(err);
    res.status(400).send({'error': "cannot process the request"})
}
}

