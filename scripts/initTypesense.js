import typesenseClient from '../typesense.config.js';

const schema = {
  name: 'superbloom_content',
  fields: [
    { name: 'id', type: 'string' },
    { name: 'title', type: 'string' },
    { name: 'content', type: 'string' },
    { name: 'url', type: 'string' },
    { name: 'tags', type: 'string[]', optional: true },
    { name: 'created_at', type: 'int64' }
  ],
  default_sorting_field: 'created_at'
};

async function initTypesense() {
  try {
    // Create collection
    await typesenseClient.collections().create(schema);
    console.log('Typesense collection created successfully');
  } catch (error) {
    console.error('Error initializing Typesense:', error);
  }
}

initTypesense();
