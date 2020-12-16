const db = require('../models');
const { BlobServiceClient } = require('@azure/storage-blob');
const { DefaultAzureCredential } = require('@azure/identity');

const account = '404blob';
const defaultAzureCredential = new DefaultAzureCredential();

const blobServiceClient = new BlobServiceClient(
     `https://${account}.blob.core.windows.net`,
     defaultAzureCredential
);

let onDate = new Date();
const dd = String(onDate.getDate()).padStart(2, '0');
const mm = String(onDate.getMonth() + 1).padStart(2, '0');
const yyyy = String(onDate.getFullYear());
const h = String(onDate.getHours());
const m = String(onDate.getMinutes());
onDate = mm + dd + yyyy + h + m;

// TODO: Log errs to a database.

const blobUtility = {
     createContainer: async name => {
          try {
               const containerName = `${name}${onDate}`;
               const containerClient = blobServiceClient.getContainerClient(
                    containerName
               );
               await containerClient.create();
          } catch (err) {
               db.bug.create({
				   error: err,
				   location: `blobUtility.createContainer`,
				   activity: `Trying to create a new container.`,
				   user: `App Admin Service`,
				   status: `Untracked`
			   });
          }
     },
     listContainers: async () => {
          try {
               let i = 1;
               const containers = blobServiceClient.listContainers();
               for await (const container of containers) {
                    console.log(`Container ${i++}: ${container.name}`);
               }
          } catch (err) {
			db.bug.create({
				error: err,
				location: `blobUtility.listContainers`,
				activity: `Trying to querie all blob containers.`,
				user: `App Admin Service`,
				status: `Untracked`
			});
          }
     },
     addBlob: async (container, blob, name) => {
          try {
               const containerClient = blobServiceClient.getContainerClient(
                    container
               );
               const newBlob = name + onDate;
               const blobBlock = containerClient.getBlockBlobClient(newBlob);
               await blockBlobClient.upload(blob, blob.length);
          } catch (err) {
			db.bug.create({
				error: err,
				location: `blobUtility.addBlob`,
				activity: `Creating a new blob.`,
				user: `App Admin Service`,
				status: `Untracked`
			});
          }
     },
};

blobUtility.listContainers();

module.exports = blobUtility;
