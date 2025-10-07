module.exports = {
  apps: [
    // Frontend Production (serve static files)
    {
      name: 'alphaint-frontend',
      script: 'serve',
      args: '-s dist -l 80',
      cwd: '/home/ec2-user/ai-investment-analysis-platform',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '500M',
      env: {
        NODE_ENV: 'production'
      },
      error_file: './logs/frontend-error.log',
      out_file: './logs/frontend-out.log',
      log_file: './logs/frontend-combined.log',
      time: true
    },
    
    // Frontend Development (Vite dev server) - Optional
    {
      name: 'alphaint-frontend-dev',
      script: 'npm',
      args: 'run dev -- --host 0.0.0.0 --port 5173',
      cwd: '/home/ec2-user/ai-investment-analysis-platform',
      instances: 1,
      autorestart: true,
      watch: false,
      env: {
        NODE_ENV: 'development'
      },
      error_file: './logs/frontend-dev-error.log',
      out_file: './logs/frontend-dev-out.log',
      time: true
    }
  ]
}

