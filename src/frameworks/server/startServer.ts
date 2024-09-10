import { Server } from 'http';

export function startServer(server: Server, port: number) {
  server.listen(port, () => console.log('Server listening on %d', port));
}
