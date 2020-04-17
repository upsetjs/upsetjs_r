const { Plugin } = require('release-it');
const fs = require('fs');
const path = require('path');

function bumpImpl(version) {
  const desc = path.resolve('./r_package/DESCRIPTION');
  const content = fs.readFileSync(desc).toString();
  const s = new Date().toISOString();
  const now = s.slice(0, s.indexOf('T'));
  const newContent = content.replace(/^Version:.*$/gm, `Version: ${version}`).replace(/^Date:.*$/gm, `Date: ${now}`);
  fs.writeFileSync(desc, newContent);
}

class MyVersionPlugin extends Plugin {
  bump(version) {
    bumpImpl(version);
  }
}

module.exports = MyVersionPlugin;
