
const jsonpatch = require('fast-json-patch')

exports.patch = async(req , res)=>{
var document = { firstName: "xxxxxxxxxx", contactDetails: { phoneNumbers: [] } };
var patch = [
  { op: "replace", path: "/firstName", value: "Vaibhav" },
  { op: "add", path: "/lastName", value: "Agrawal" },
  { op: "add", path: "/contactDetails/phoneNumbers/0", value: { number: "1234567890" }  }
];
document = jsonpatch.applyPatch(document, patch).newDocument;

res.status(200).send(document);
}

