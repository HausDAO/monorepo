import { execSync } from 'child_process';

console.log('Starting cloudflare publish script');

const argsObj = process.argv.slice(2).reduce((acc, arg) => {
  const key = arg.split('=')[0].replace('--', '');
  const value = arg.split('=')[1];
  acc[key] = value;
  return acc;
}, {});
console.log('argsObj: ', argsObj);

if (
  !argsObj.projectName ||
  !argsObj.directory ||
  !process.env.CLOUDFLARE_API_TOKEN ||
  !process.env.CLOUDFLARE_ACCOUNT_ID
) {
  console.error(
    `missing args or env, projectName: ${argsObj.projectName}, directory: ${argsObj.directory}, CLOUDFLARE_API_TOKEN: ${process.env.CLOUDFLARE_API_TOKEN}, CLOUDFLARE_ACCOUNT_ID: ${process.env.CLOUDFLARE_ACCOUNT_ID}`
  );
  process.exit(1);
}

execSync(
  `CLOUDFLARE_ACCOUNT_ID=${process.env.CLOUDFLARE_ACCOUNT_ID} CLOUDFLARE_API_TOKEN=${process.env.CLOUDFLARE_API_TOKEN} npx wrangler pages publish ${argsObj.directory} --project-name ${argsObj.projectName}`
);

console.log('Completed cloudflare publish script');
