export const PINATA_PIN_JSON = 'https://api.pinata.cloud/pinning/pinJSONToIPFS';

type JSONResponse = {
  IpfsHash: string;
  pinSize: number;
  Timestamp: string;
  isDuplicate: boolean;
};

export const pinataPostJSON = async ({
  creds,
  jsonString,
}: {
  creds: { pinata_api_key: string; pinata_api_secret: string };
  jsonString: string;
}): Promise<JSONResponse> => {
  try {
    const response = await fetch(PINATA_PIN_JSON, {
      method: 'POST',
      headers: {
        pinata_api_key: creds.pinata_api_key,
        pinata_secret_api_key: creds.pinata_api_secret,
        'Content-Type': 'application/json',
      },
      body: jsonString,
    });
    const data = await response.json();
    if (typeof data?.IpfsHash === 'string') {
      return data as JSONResponse;
    } else {
      console.log('response', response);
      throw new Error(`IPFS Pin failed.`);
    }
  } catch (err) {
    console.error(err);
    throw new Error(`IPFS Pin failed.`);
  }
};
