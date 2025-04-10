const core = require('@actions/core');
const exec = require('@actions/exec');
const fs = require('fs');  // Required to check if distFolder exists

async function run() {
  try {
    // Get inputs
    const bucket = core.getInput('bucket', { required: true });
    const bucketRegion = core.getInput('bucket-region') || 'us-east-1'; // Default to 'us-east-1' if not provided
    const distFolder = core.getInput('dist-folder', { required: true });

    // Log the distFolder to ensure the correct path
    console.log(`Using distFolder: ${distFolder}`);

    // Check if distFolder exists
    if (!fs.existsSync(distFolder)) {
      core.setFailed(`Directory ${distFolder} does not exist.`);
      return;
    }

    // List the contents of distFolder for debugging purposes
    console.log(`Listing contents of distFolder: ${distFolder}`);
    await exec.exec(`ls -R ${distFolder}`);

    // Upload files to S3 bucket
    const s3URI = `s3://${bucket}`;
    await exec.exec(`aws s3 sync ${distFolder} ${s3URI} --region ${bucketRegion}`);

    // Get the website URL
    const websiteURL = `https://${bucket}.s3-website-${bucketRegion}.amazonaws.com`;

    // Set output
    core.setOutput('website-url', websiteURL);

  } catch (error) {
    // If there is an error, set the action as failed with the error message
    core.setFailed(`Action failed with error: ${error.message}`);
  }
}

run();
