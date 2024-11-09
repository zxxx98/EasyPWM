cd server
docker buildx build --platform linux/arm64/v8 -t easypwm-server:0.0.1 -f Dockerfile  --load .

docker buildx build --platform linux/arm64/v8 -t easypwm-webui:0.0.1 -f Dockerfile.web  --load .

docker-compose build
