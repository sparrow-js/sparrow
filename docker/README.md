## Build the sparrow docker image
```
docker build . -t sparrow:dev
```

### Start the sparrow using docker
```
docker run -it -p 8000:8000 -p 9000:9000 sparrow:dev sparrow start
```
### Start the sparrow using docker from docker hub
```
docker run -it -p 8000:8000 -p 9000:9000 liushaohui/sparrow sparrow start
```
