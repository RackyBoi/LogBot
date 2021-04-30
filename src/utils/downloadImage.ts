/* eslint-disable func-names */
import axios from 'axios';
import stream from 'stream';

// https://stackoverflow.com/questions/21491567/how-to-implement-a-writable-stream/21583831#21583831

async function downloadImage(url: string): Promise<Buffer> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dataArr : Array<any> = [];

  const writer = new stream.Writable({
    write(chunk, encoding, next) {
      dataArr.push(chunk);
      next();
    },
  });

  const response = await axios({
    url,
    method: 'GET',
    responseType: 'stream',
  });

  response.data.pipe(writer);

  return new Promise((resolve, reject) => {
    writer.on('finish', () => {
      const buf = Buffer.concat(dataArr);

      resolve(buf);
    });
    writer.on('error', reject);
  });
}

export default downloadImage;
