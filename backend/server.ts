import app from "./app/app";

// launch express server
const server = app.listen(app.get('port'), () => {
    console.log(`Server listening on ${app.get('port')}`);
});

export default server;