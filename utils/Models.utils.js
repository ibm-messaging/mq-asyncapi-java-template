import { toJavaClassName } from './String.utils';

export function collateModelNames(asyncapi) {
  return Object.keys(collateModels(asyncapi));
}

export function collateModels(asyncapi) {
  const models = {};
  
  for (const [channelName, channel] of Object.entries(asyncapi.channels())) {
    if (channel.publish()) {
      for (const [messageName, message] of Object.entries(channel.publish().messages())) {
        models[toJavaClassName(message.uid())] = message;
      }
    }
    if (channel.subscribe()) {
      for (const [messageName, message] of Object.entries(channel.subscribe().messages())) {
        models[toJavaClassName(message.uid())] = message;
      }
    }
  }

  // Components may exist which are not used anywhere, still include them here
  
  if(asyncapi.components() && asyncapi.components().messages()){
    for (const [messageName, message] of Object.entries(asyncapi.components().messages())) {
      models[toJavaClassName(message.uid())] = message;
    }
  }
  
  return models;
}