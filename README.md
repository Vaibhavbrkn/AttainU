# AttainU
AttainU Assignment

Installation:
  npm install
Run: 
  npm start
API:
  authentication:
    signin:
      localhost:8000/signin
      post
        body: {username , password}
    signup:
      localhost:8000/signup
      post
        body: {username , password}
    signout:
      localhost:8000/signout
      get
  json-patch:
    localhost:8000/jsonPatch
    get
  address: 
    localhost:8000/address
    put
      body: {address}
  image-thumbnail
    localhost:8000/upload
    post
      body: {url}
