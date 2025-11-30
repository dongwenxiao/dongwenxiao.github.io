import { defineConfig } from 'vite';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createHtmlPlugin } from 'vite-plugin-html';
import obfuscator from 'javascript-obfuscator';

const { obfuscate } = obfuscator;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const obfuscatePlugin = (options = {}) => ({
  name: 'vite:obfuscatefiles',
  transformIndexHtml: {
    order: 'post',
    handler(html, ctx) {
      if (!(ctx && ctx.bundle)) return html;
      console.log('\nObfuscate files');
      for (const [fileName, chunk] of Object.entries(ctx.bundle)) {
        if (chunk.code) {
          console.log(`Obfuscating ${fileName}...`);
          chunk.code = obfuscate(chunk.code, options).getObfuscatedCode();
        }
      }
      console.log('Obfuscate done');
      return html;
    }
  }
});

export default defineConfig({
  base: './',
  plugins: [
    createHtmlPlugin({ minify: true }),
    obfuscatePlugin({
      compact: true,
      controlFlowFlattening: true,
      deadCodeInjection: true,
      deadCodeInjectionThreshold: 0.05,
      identifierNamesGenerator: 'hexadecimal',
      renameGlobals: true,
      rotateStringArray: true,
      selfDefending: true,
      stringArray: true,
      stringArrayEncoding: ['base64'],
      stringArrayThreshold: 0.75
    })
  ],
  build: {
    outDir: resolve(__dirname, '../../public/apps/dianziyinzhang'),
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
    },
  },
});
