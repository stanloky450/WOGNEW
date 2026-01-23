const fs = require('fs');
const path = require('path');
const logFile = path.join(__dirname, 'cleanup.log');

function log(msg) {
  fs.appendFileSync(logFile, msg + '\n');
  console.log(msg);
}

const filesToDelete = [
  'backup-data.js', 'check-db-simple.js', 'check-db.js', 'check-neon-users.js', 'check-user.js',
  'clone-db.js', 'debug-env.js', 'debug-env.ts', 'debug-locations.js', 'debug-post-creation.js',
  'diagnose.ts', 'do-push.js', 'final-check.js', 'fix-all.js', 'fix-db.js', 'manual-seed.js',
  'reseed-neon.js', 'restore-data.js', 'run-diag.js', 'seed-content.ts', 'seed_result.txt',
  'simple-seed.js', 'test-auth.ts', 'test-connection.js', 'verify_content.ts', 'verify_simple.js'
];

log('Starting cleanup...');

filesToDelete.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    try {
      fs.unlinkSync(filePath);
      log(`Deleted: ${file}`);
    } catch (e) {
      log(`Failed to delete ${file}: ${e.message}`);
    }
  } else {
    log(`File not found: ${file}`);
  }
});
log('Cleanup finished.');
