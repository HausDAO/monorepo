const fs = require('fs');
const yaml = require('js-yaml');
const path = require('path');

const { config } = require('./config');

const network = process.argv.slice(2)[0];

try {
  let fileContents = fs.readFileSync(
    path.resolve(__dirname, 'header.yaml'),
    'utf8'
  );
  let data = yaml.load(fileContents);

  config[network].dataSources.forEach((source) => {
    console.log('adding data source: ', source.name);
    let dsFileContents = fs.readFileSync(
      path.resolve(__dirname, source.template),
      'utf8'
    );
    let dsData = yaml.load(dsFileContents);

    dsData.network = network;
    dsData.source.address = source.address;
    dsData.source.startBlock = source.startBlock;

    data.dataSources.push(dsData);
  });

  config[network].templates.forEach((source) => {
    console.log('adding data template: ', source.name);
    let dtFileContents = fs.readFileSync(
      path.resolve(__dirname, source.template),
      'utf8'
    );
    let dtData = yaml.load(dtFileContents);

    dtData.network = network;

    data.templates.push(dtData);
  });

  let yamlStr = yaml.dump(data);
  fs.writeFileSync('./subgraph.yaml', yamlStr, 'utf8');

  console.log('Generated subgraph.yaml for ' + network);
} catch (e) {
  console.log(e);
}
