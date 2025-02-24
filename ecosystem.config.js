module.exports = {
  apps: [{
    name: "dexofai-cron",
    script: "./scripts/runCron.ts",
    interpreter: "node",
    interpreter_args: "-r tsx",
    watch: false,
    env: {
      NODE_ENV: "production",
    },
    autorestart: true,
    max_memory_restart: "1G",
    cron_restart: "0 3 * * *"
  }]
}
