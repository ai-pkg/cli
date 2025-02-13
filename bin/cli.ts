#!/usr/bin/env node

import { Command } from 'commander';
import { exec } from 'child_process';
import { promises as fs } from 'fs';
import path from 'path';

const program = new Command();

async function detectPackageManager(cwd: string) {
  // TODO: Add detection for yarn, pnpm, bun, etc.
  try {
    await fs.access(path.join(cwd, 'package.json'), fs.constants.F_OK);
    return 'npm';
  } catch {
    return 'npm';
  }
}

function runCommand(command: string) {
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
  });
}

program
  .name('aipkg')
  .description('CLI to some JavaScript string utilities')
  .version('0.0.1');

program
  .command('install')
  .description('Install a package')
  .argument('<package>', 'The package to install')
  .action(async (packageName) => {
    console.log(`Installing package ${packageName}...`);
    const packageManager = await detectPackageManager(process.cwd());
    const command = `${packageManager} install ${packageName}`;
    runCommand(command);
  });

program.parse();
