const PROTO_PATH = __dirname + '/../proto/helloworld.proto';

const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {keepCase: true,
     longs: String,
     enums: String,
     defaults: true,
     oneofs: true
    });

const hello_proto = grpc.loadPackageDefinition(packageDefinition).helloworld;

// server

function sayHello(call, callback) {
  callback(null, {message: 'Hello ' + call.request.name})
}

const server =  new grpc.Server()
server.addService(hello_proto.Hello.service, { sayHello })
server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure())
server.start()