import { NowRequest, NowResponse } from '@now/node';
import { chain, NowFunction } from '@amaurymartiny/now-middleware';
import cors from 'cors';
import morgan from 'morgan';

export default function (handler: NowFunction<NowRequest, NowResponse>) {
  return chain(cors(), morgan(process.env.DEBUG ? 'dev' : 'combined'))(handler);
}
