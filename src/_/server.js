
import Server from 'Server/Server';

const app = new Server();

app.configuration({
    port: 3030
});
app.run();
