import { execSync } from 'child_process';

const argsObj = process.argv.slice(2).reduce((acc, arg) => {
  const key = arg.split('=')[0].replace('--', '');
  const value = arg.split('=')[1];
  acc[key] = value;
  return acc;
}, {});
console.log('argsObj: ', argsObj);

if (!argsObj.projectName || !argsObj.directory) {
  console.error(
    `missing args, projectName: {}, directory: {}`,
    argsObj.projectName,
    argsObj.directory
  );
  process.exit(1);
}
console.log('CLOUDFLARE_API_TOKEN', process.env.CLOUDFLARE_API_TOKEN);
console.log('CLOUDFLARE_ACCOUNT_ID', process.env.CLOUDFLARE_ACCOUNT_ID);
console.log('projectName', argsObj.projectName);
console.log('directory', argsObj.directory);

// import wrangler
// run wrangler cmd
execSync(
  `CLOUDFLARE_ACCOUNT_ID=${process.env.CLOUDFLARE_ACCOUNT_ID} CLOUDFLARE_API_TOKEN=${process.env.CLOUDFLARE_API_TOKEN} npx wrangler pages publish ${argsObj.directory} --project-name ${argsObj.projectName}`
);
