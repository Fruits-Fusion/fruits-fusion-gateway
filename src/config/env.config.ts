import 'dotenv/config';
import * as Joi from 'joi';

interface EnvType {
  CLIENT_GT_PORT: number;
  CLIENT_GT_NAME: string;
  CLIENT_GT_SERVERS: string[];

  PRODUCT_MS_KEYNAME: string;
  PRODUCT_MS_HOST: string;
  PRODUCT_MS_PORT: number;

  ORDER_MS_KEYNAME: string;
  ORDER_MS_HOST: string;
  ORDER_MS_PORT: number;
}

export const EnvSchema = Joi.object<EnvType>({
  CLIENT_GT_PORT: Joi.number().required(),
  CLIENT_GT_NAME: Joi.string().required(),
  CLIENT_GT_SERVERS: Joi.array().items(Joi.string()).required(),

  PRODUCT_MS_KEYNAME: Joi.string().required(),
  PRODUCT_MS_HOST: Joi.string().required(),
  PRODUCT_MS_PORT: Joi.number().required(),

  ORDER_MS_KEYNAME: Joi.string().required(),
  ORDER_MS_HOST: Joi.string().required(),
  ORDER_MS_PORT: Joi.number().required(),
}).unknown(true);

const { error, value } = EnvSchema.validate({
  ...process.env,
  CLIENT_GT_SERVERS: process.env.CLIENT_GT_SERVERS?.split(','),
});

if (error) throw new Error(error.message);

export default () => ({
  ...(value as EnvType),
});
