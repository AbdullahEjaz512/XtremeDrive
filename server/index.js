import { createApp } from './app.js';

const PORT = process.env.PORT || 5000;

async function initialize() {
  try {
    const { app } = await createApp({ seed: true });

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Initialization error:', error);
    process.exit(1);
  }
}

initialize();
