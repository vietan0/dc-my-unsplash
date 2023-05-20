const { createClient } = require('@supabase/supabase-js');
const crypto = require('crypto');

require('dotenv').config();

const supabaseUrl = 'https://uzmvrzjfwrtyihijefxa.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY;
const client = createClient(supabaseUrl, supabaseKey);

const supabase = {
  async getAllImages() {
    const { data, error } = await client.from('myUnsplash').select('*');
    if (error) throw new Error(error.message);
    return data;
  },
  async getById(id) {
    const { data, error } = await client.from('myUnsplash').select('*').eq('image_id', id);
    if (error) throw new Error(error.message);
    return data[0];
  },
  async postImage(file) {
    const uploadInfo = {
      image_id: crypto.randomUUID(),
      ...file,
    };
    const { data, error } = await client.from('myUnsplash').insert([uploadInfo]).select();
    if (error) throw new Error(error.message);
    return data[0];
  },
  async deleteImage(id) {
    const { data, error } = await client.from('myUnsplash').delete().eq('image_id', id);
    if (error) throw new Error(error.message);
  },
  async deleteAllImages() {
    const { error } = await client.from('myUnsplash').delete().neq('image_id', '');
    if (error) throw new Error(error.message);
  },
};

module.exports = supabase;
