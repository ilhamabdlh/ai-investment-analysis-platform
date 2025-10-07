module.exports = {
  apps: [{
    name: 'alphaint-backend',
    script: '.venv/bin/gunicorn',
    args: 'core.wsgi:application --bind 0.0.0.0:8000 --workers 3 --timeout 120',
    // cwd will use current directory where pm2 is executed (should be backend/)
    interpreter: 'none',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      DJANGO_SETTINGS_MODULE: 'core.settings',
      PYTHONUNBUFFERED: '1'
    },
    error_file: './logs/backend-error.log',
    out_file: './logs/backend-out.log',
    log_file: './logs/backend-combined.log',
    time: true
  }]
}

