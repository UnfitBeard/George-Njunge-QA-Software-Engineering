const core = require('@actions/core');
const exec = require('@actions/exec');

async function run() {
  try {
    // Get inputs
    const bucket = core.getInput('bucket', { required: true });
    const bucketRegion = core.getInput('bucket-region') || 'us-east-1'; // Default to 'us-east-1' if not provided
    const distFolder = core.getInput('dist-folder', { required: true });

    // Upload files to S3 bucket
    const s3URI = `s3://${bucket}`;
    await exec.exec(`aws s3 sync ${distFolder} ${s3URI} --region ${bucketRegion}`);

    // Get the website URL
    const websiteURL = `https://${bucket}.s3-website-${bucketRegion}.amazonaws.com`;

    // Set output
    core.setOutput('website-url', websiteURL);

  } catch (error) {
    core.setFailed(`Action failed with error: ${error.message}`);
  }
}

run();
