const AWS = require('aws-sdk');

class {
    constructor({ repository }) {
        this.repository = repository;
    }

    async handle(event) {
        const putParams = {
            TableName: process.env.CONNECTIONS_WEBSOCKET_TABLE,
            Item: {
                connectionId: event.requestContext.connectionId

            }
        };

        try {
            await this.repository.put(putParams).promise();

        } catch (e) {
            return {
                statusCode: 500,
                body: 'Failed to connect: ' + JSON.stringify(err)
            }
        }

        return {
            statusCode: 200,
            body: JSON.stringify({ connectionId: event.requestContext.connectionId })
        }
    }
}

const ddb = new AWS.DynamoDB.DocumentClient();
const onConnect = new OnConnect({ repository: ddb });
module.export.handle = onConnect.handle.bind(onConnect);


