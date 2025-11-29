## Start the application in localhost

Generate the .env file
```bash
cp .env.example .env
```

Please clone the backend repo and follow the instruction on how to set it up
```bash
git clone https://github.com/HouiderWalid/taskify-laravel-backend
```

Start the application
```bash
npm run dev
```

## Start the application in production

Generate the .env file
```bash
cp .env.example .env
```

Test the application
```bash
docker build . -f docker/Dockerfile --target test
```

Build the application
```bash
docker build . -t taskify-nuxt -f docker/Dockerfile
```

Start the application
```bash
docker run -p 4500:4500 --name taskify-nuxt-1 --env-file .env taskify-nuxt:latest
```