import path from 'path';

export const DEFAULT_PAGE_NUMBER = 1;
export const DEFAULT_PER_RAGE = 10;
export const SORT_ORDER = {
  ASC: 'asc',
  DESC: 'desc',
};
export const KEYS_OF_CONTACT = {
  _id: '_id',
  name: 'name',
  phoneNumber: 'phoneNumber',
  email: 'email',
  isFavourite: 'isFavourite',
  contactType: 'contactType',
};

export const FIFTEEN_MINUTES = 15 * 60 * 1000;
export const ONE_MOUNTH = 30 * 24 * 60 * 60 * 1000;

export const TEMP_UPLOAD_DIR = path.join(process.cwd(), 'temp');
export const UPLOAD_DIR = path.join(process.cwd(), 'uploads');

export const CLOUDINARY = {
  CLOUD_NAME: 'CLOUD_NAME',
  API_KEY: 'API_KEY',
  API_SECRET: 'API_SECRET',
};
