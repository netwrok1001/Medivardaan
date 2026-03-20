const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src', 'app');
const compDir = path.join(__dirname, 'src', 'components');

const walkSync = (dir, filelist = []) => {
  if (!fs.existsSync(dir)) return filelist;
  fs.readdirSync(dir).forEach(file => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      filelist = walkSync(filePath, filelist);
    } else {
      if (filePath.endsWith('.js') || filePath.endsWith('.jsx')) {
        filelist.push(filePath);
      }
    }
  });
  return filelist;
};

const files = [...walkSync(srcDir), ...walkSync(compDir)];
let updatedFiles = 0;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let originalContent = content;

  // 1. TableHeader
  // Replace: <TableHeader className="bg-primary/20 dark:bg-[#393053]">
  // With:    <TableHeader className="bg-primary/20 dark:bg-white/15">
  content = content.replace(/className="bg-primary\/20 dark:bg-\[\#393053\]"/g, 'className="bg-primary/20 dark:bg-white/15"');
  
  content = content.replace(/className="bg-primary\/20\s+dark:bg-\[\#393053\]"/g, 'className="bg-primary/20 dark:bg-white/15"');

  // 2. TableRow (Header Row)
  // Usually: <TableRow className="hover:bg-primary/10 dark:hover:bg-[#443C68]/50 border-gray-200 dark:border-[#443C68]/50">
  // Or:      <TableRow className="border-b border-gray-200 dark:border-[#443C68]/50 hover:bg-transparent">
  // Replace with empty or standard
  // Wait, in patient list, Header row has: <tr className="bg-primary/20 dark:bg-white/15 border-b border-gray-200 dark:border-[#443C68]/50">
  // If the TableHeader has the bg, the TableRow might not need one, but let's just make it hover:bg-black/5 dark:hover:bg-white/5 transition-colors or leave the border.
  content = content.replace(/className="hover:bg-primary\/10 dark:hover:bg-\[\#443C68\]\/50 border-gray-200 dark:border-\[\#443C68\]\/50"/g, 'className="border-b border-gray-200 dark:border-[#443C68]/50 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"');

  // 3. TableRow (Body Row)
  // Replace: <TableRow key={...} className="border-gray-200 dark:border-[#443C68]/50 dark:hover:bg-[#393053]/50">
  content = content.replace(/className="border-gray-200 dark:border-\[\#443C68\]\/50 dark:hover:bg-\[\#393053\]\/50"/g, 'className="border-b border-gray-200 dark:border-[#443C68]/50 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"');

  // Special cases I saw previously:
  // className="hover:bg-gray-50 border-gray-200 dark:border-[#443C68]/50 dark:hover:bg-[#393053]/50"
  content = content.replace(/className="hover:bg-gray-50 border-gray-200 dark:border-\[\#443C68\]\/50 dark:hover:bg-\[\#393053\]\/50"/g, 'className="border-b border-gray-200 dark:border-[#443C68]/50 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"');
  
  content = content.replace(/className="border-b border-gray-50 dark:border-\[\#443C68\]\/50 hover:bg-gray-50 dark:hover:bg-\[\#393053\]\/50 text-xs"/g, 'className="border-b border-gray-200 dark:border-[#443C68]/50 hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-xs"');

  content = content.replace(/className="hover:bg-gray-50 dark:hover:bg-\[\#393053\]\/50 border-b border-gray-200 dark:border-\[\#443C68\]\/50"/g, 'className="border-b border-gray-200 dark:border-[#443C68]/50 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"');


  if (content !== originalContent) {
    fs.writeFileSync(file, content, 'utf8');
    updatedFiles++;
    console.log(`Updated ${file}`);
  }
});

console.log(`Updated ${updatedFiles} files.`);
