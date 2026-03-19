import fs from 'fs';
import path from 'path';

const srcDir = './src';

function walk(dir: string, callback: (file: string) => void) {
  fs.readdirSync(dir).forEach( f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walk(dirPath, callback) : callback(path.join(dir, f));
  });
};

walk(srcDir, (file) => {
  if (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.mdx')) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Replace neutral- with base-
    content = content.replace(/neutral-/g, 'base-');
    
    // Replace neutral: keys in objects
    content = content.replace(/\bneutral:/g, 'base:');
    
    // Replace specific primary- palette uses with just primary
    content = content.replace(/primary-50/g, 'base-50');
    content = content.replace(/primary-600/g, 'primary');
    content = content.replace(/primary-700/g, 'primary');
    content = content.replace(/primary-500/g, 'primary');
    content = content.replace(/primary-400/g, 'primary');
    
    // Also rename neutral color name in components if it exists as a string
    content = content.replace(/'neutral'/g, "'base'");
    content = content.replace(/"neutral"/g, '"base"');
    
    fs.writeFileSync(file, content);
  }
});
