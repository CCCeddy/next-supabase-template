const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const projectName = process.argv[2] || 'my-supabase-project';
const portOffset = parseInt(process.argv[3] || 0);

// Define base ports
const basePorts = {
  api: 54321,
  db: 54322,
  studio: 54323,
  storage: 54320,
  realtime: 54319,
  db_pooler: 54318,
  shadow: 54320,
  inbucket: 54324,
  analytics: 54327,
};

// Calculate ports with offset
const ports = {};
Object.keys(basePorts).forEach((key) => {
  ports[key] = basePorts[key] + portOffset;
});

// Create project-specific ID
const projectId = `${projectName}-${Date.now()}`;

try {
  // Check if supabase directory exists, if not create it
  if (!fs.existsSync(path.join(process.cwd(), 'supabase'))) {
    console.log('Initializing Supabase...');
    execSync('supabase init', { stdio: 'inherit' });
  } else {
    console.log('Supabase directory already exists, skipping init');
  }

  // Check if template config exists
  const templatePath = path.join(process.cwd(), 'config.toml.template');
  const configPath = path.join(process.cwd(), 'supabase', 'config.toml');

  if (fs.existsSync(templatePath)) {
    console.log('Found config template, customizing...');
    let configContent = fs.readFileSync(templatePath, 'utf8');

    // Replace placeholders with actual values
    configContent = configContent
      .replace(/PROJECT_ID_PLACEHOLDER/g, projectId)
      .replace(/API_PORT_PLACEHOLDER/g, ports.api)
      .replace(/DB_PORT_PLACEHOLDER/g, ports.db)
      .replace(/DB_POOLER_PORT_PLACEHOLDER/g, ports.db_pooler)
      .replace(/STORAGE_PORT_PLACEHOLDER/g, ports.storage)
      .replace(/REALTIME_PORT_PLACEHOLDER/g, ports.realtime)
      .replace(/AUTH_PORT_PLACEHOLDER/g, ports.api)
      .replace(/STUDIO_PORT_PLACEHOLDER/g, ports.studio)
      .replace(/SHADOW_PORT_PLACEHOLDER/g, ports.shadow)
      .replace(/INBUCKET_PORT_PLACEHOLDER/g, ports.inbucket)
      .replace(/ANALYTICS_PORT_PLACEHOLDER/g, ports.analytics);

    // Write the customized config
    fs.writeFileSync(configPath, configContent);
    console.log('Custom config.toml created');
  } else {
    console.log('No config template found, using default config');

    // If template doesn't exist, stop existing services before starting
    try {
      console.log('Stopping any existing Supabase services...');
      execSync('supabase stop', { stdio: 'inherit' });
    } catch (error) {
      console.log('No services to stop or error stopping services');
    }
  }

  // Start Supabase with the configured settings
  console.log('Starting Supabase...');
  execSync('supabase start', { stdio: 'inherit' });

  // Get connection details
  console.log('Getting connection details...');
  const apiUrl = `http://localhost:${ports.api}`;

  // Use supabase to get the actual keys
  const keysOutput = execSync('supabase status').toString();
  const anonKeyMatch = keysOutput.match(/anon key: (.*)/);
  const serviceRoleKeyMatch = keysOutput.match(/service_role key: (.*)/);
  const anonKey = anonKeyMatch ? anonKeyMatch[1].trim() : 'default-anon-key';
  const serviceRoleKey = serviceRoleKeyMatch
    ? serviceRoleKeyMatch[1].trim()
    : 'default-service-role-key';

  // Update .env.local while preserving existing variables
  console.log('Updating environment variables...');
  let envVars = {};

  // Read existing .env.local if it exists
  const envPath = path.join(process.cwd(), '.env.local');
  if (fs.existsSync(envPath)) {
    console.log('Reading existing .env.local file');
    const envFile = fs.readFileSync(envPath, 'utf8');

    // Parse existing env vars
    envFile.split('\n').forEach((line) => {
      if (line && line.includes('=')) {
        const [key, ...valueParts] = line.split('=');
        const value = valueParts.join('='); // Handle values that might contain = characters
        if (key && value) {
          envVars[key.trim()] = value.trim();
        }
      }
    });
  }

  // Set/update required variables
  envVars['NEXT_PUBLIC_SUPABASE_URL'] = apiUrl;
  envVars['NEXT_PUBLIC_SUPABASE_ANON_KEY'] = anonKey;
  envVars['SUPABASE_SERVICE_ROLE_KEY'] = serviceRoleKey;
  envVars['NEXT_PUBLIC_SITE_URL'] = 'http://localhost:3000';

  // Add OAuth placeholders if they don't exist
  if (!envVars['GITHUB_ID']) envVars['GITHUB_ID'] = '# Your GitHub Client ID';
  if (!envVars['GITHUB_SECRET']) envVars['GITHUB_SECRET'] = '# Your GitHub Client Secret';
  if (!envVars['GOOGLE_CLIENT_ID']) envVars['GOOGLE_CLIENT_ID'] = '# Your Google Client ID';
  if (!envVars['GOOGLE_CLIENT_SECRET'])
    envVars['GOOGLE_CLIENT_SECRET'] = '# Your Google Client Secret';

  // Write the updated .env.local file
  let newEnvContent = '';
  Object.keys(envVars).forEach((key) => {
    newEnvContent += `${key}=${envVars[key]}\n`;
  });

  fs.writeFileSync(envPath, newEnvContent);
  console.log('.env.local updated with all required environment variables');

  console.log(`Supabase project '${projectName}' initialized and running!`);
  console.log(`API URL: ${apiUrl}`);
  console.log(`Anon Key: ${anonKey}`);
  console.log(`Service Role Key: ${serviceRoleKey}`);
} catch (error) {
  console.error('Error setting up Supabase:', error);
  console.error(error.stack);
  process.exit(1);
}
