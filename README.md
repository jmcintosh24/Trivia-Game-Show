## How To Run App Locally
Create the file `server/config.env` with your Atlas URI and the server port:
```
ATLAS_URI=mongodb+srv://<username>:<password>@gameshowcluster.21akesm.mongodb.net/?retryWrites=true&w=majority
PORT=<PUT_PORT_HERE>
```

Start server:
```
cd .\server\
npm install
node .\server.mjs
```

Start Web server
```
cd .\client\
npm install
npm start
```