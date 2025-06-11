const { minify } = require('terser');
const fs = require('fs');
const path = require('path');

async function minifyFile() {
  try {
    // Create dist directory if it doesn't exist
    if (!fs.existsSync('dist')) {
      fs.mkdirSync('dist');
    }

    // Read the source file
    const source = fs.readFileSync('chatbot.js', 'utf8');

    // Minify the code
    const result = await minify(source, {
      compress: {
        dead_code: true,
        drop_console: false,
        drop_debugger: true,
        pure_funcs: ['console.log']
      },
      mangle: {
        toplevel: true
      },
      format: {
        comments: false
      }
    });

    // Write the minified code
    fs.writeFileSync('dist/chatbot.min.js', result.code);
    console.log('✅ Successfully minified chatbot.js to dist/chatbot.min.js');

    // Log the size reduction
    const originalSize = fs.statSync('chatbot.js').size;
    const minifiedSize = fs.statSync('dist/chatbot.min.js').size;
    const reduction = ((originalSize - minifiedSize) / originalSize * 100).toFixed(2);

    console.log(`📊 Size reduction: ${reduction}%`);
    console.log(`📦 Original size: ${(originalSize / 1024).toFixed(2)} KB`);
    console.log(`📦 Minified size: ${(minifiedSize / 1024).toFixed(2)} KB`);

  } catch (error) {
    console.error('❌ Error during minification:', error);
    process.exit(1);
  }
}

minifyFile(); 