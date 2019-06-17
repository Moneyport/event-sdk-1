/*****
 License
 --------------
 Copyright © 2017 Bill & Melinda Gates Foundation
 The Mojaloop files are made available by the Bill & Melinda Gates Foundation under the Apache License, Version 2.0 (the "License") and you may not use these files except in compliance with the License. You may obtain a copy of the License at
 http://www.apache.org/licenses/LICENSE-2.0
 Unless required by applicable law or agreed to in writing, the Mojaloop files are distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
 Contributors
 --------------
 This is the official list of the Mojaloop project contributors for this file.
 Names of the original copyright holders (individuals or organizations)
 should be listed with a '*' in the first column. People who have
 contributed from an organization can be listed under the organization
 that actually holds the copyright for their contributions (see the
 Gates Foundation organization for an example). Those individuals should have
 their names indented and be marked with a '-'. Email address can be added
 optionally within square brackets <email>.
 * Gates Foundation
 - Name Surname <name.surname@gatesfoundation.com>

 - Ramiro González Maciel <ramiro@modusbox.com>

 --------------
 ******/
import { EventMessage } from "../model/EventMessage";
import { convertJsontoStruct, convertStructToJson } from "./JsonToStructMapper";
import { loadEventLoggerService } from "./EventLoggerServiceLoader";

const path = require('path');
const grpc = require('grpc')

class EventLoggingServiceClient {

  private grpcClient : any;

  constructor(host : string, port: number ) {

    let eventLoggerService = loadEventLoggerService();

    let client = new eventLoggerService(`${host}:${port}`, grpc.credentials.createInsecure())
    this.grpcClient = client
  }
  
  /**
   * Log an event
   */
  log = async ( event: EventMessage): Promise<EventMessage> => {
    return new Promise((resolve, reject) => {
      let wireEvent : any = Object.assign({}, event);
      wireEvent.content = convertJsontoStruct(event.content);
      console.log('EventLoggingServiceClient.log sending wireEvent: ', JSON.stringify(wireEvent, null, 2));
      this.grpcClient.log(wireEvent, (error: any, response: any) => {
        console.log('EventLoggingServiceClient.log  received response: ', JSON.stringify(response, null, 2));
        if ( error ) {reject(error); }
        let eventMessage = Object.assign({}, response);
        // FIXME This is very specific, since we know that content is a Struct in this method.
        // To make it more generic, and be able to use it in other methods, we could also check if there's a "fields" property and "kind", and assume its a Struct and then convert it
        if ( eventMessage.content != null && eventMessage.content.fields != null )  {
          eventMessage.content = convertStructToJson(eventMessage.content.fields)
        }
        resolve(eventMessage);
      })
    })
  }
}

export {
  EventLoggingServiceClient
}