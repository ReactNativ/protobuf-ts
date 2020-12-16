import {ChannelCredentials} from "@grpc/grpc-js";
import {AllMethodsServiceClient, FailRequest, IAllMethodsServiceClient} from "./service-all-methods";
import {GrpcTransport} from "../src";


const transport = new GrpcTransport({
    host: "localhost:5000",
    channelCredentials: ChannelCredentials.createInsecure(),
});


const client = new AllMethodsServiceClient(transport);


makeCall(client).catch(e => console.error(e)).finally(() => process.exit());

async function makeCall(client: IAllMethodsServiceClient) {

    const call = client.unary({
        question: 'whats up?',
        pleaseDelayResponseMs: 50,
        pleaseFail: FailRequest.FAIL_REQUEST_NONE,
        disableSendingExampleResponseHeaders: false,
    });

    const headers = await call.headers;
    console.log("got response headers: ", headers)

    const response = await call.response;
    console.log("got response message: ", response)

    const status = await call.status;
    console.log("got status: ", status)

    const trailers = await call.trailers;
    console.log("got trailers: ", trailers)

}

