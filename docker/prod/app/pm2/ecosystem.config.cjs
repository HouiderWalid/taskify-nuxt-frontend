module.exports = {
    apps : [
        {
            name: 'taskify',
            exec_mode: 'cluster',
            instances: 1,
            script: './.output/server/index.mjs',
            port: 4500,
            args: 'preview'
        }
    ]
};