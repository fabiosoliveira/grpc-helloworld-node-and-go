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

// client

const client = new hello_proto.Hello('localhost:50051', grpc.credentials.createInsecure())

let user
if (process.argv.length >= 3) {
  user = process.argv[2]
} else {
  user = "world"
}

client.sayHello({ name: user }, (err, response) => {
  console.log("Hello: ", response.message)
})