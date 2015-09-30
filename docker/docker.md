# How to use this Dockerfile

This Dockerfile can be used to build an image of the FIWARE Interface Designer GE.

The [Docker Hub repository](https://hub.docker.com/r/adminotech/interfacedesigner/) contains a ready made image that you can pull with:

	docker pull adminotech/interfacedesigner

To build the image, run:

    docker build -t interfacedesigner

To run the image in interactive mode (shell), with the container's ports exposed:

    docker run -p 12345:80 --rm interfacedesigner