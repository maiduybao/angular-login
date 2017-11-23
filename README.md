# AngularLogin

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.5.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Run docker

Install docker (https://docs.docker.com/engine/installation/)

Run the following command to build your docker image
$ docker build -t <your username>/AngularLogin

Check for your image 
$ docker images

Run your image
$ docker run -p 49160:4000 -d <your username>/AngularLogin

Get container ID
$ docker ps

Print app output
$ docker logs <container id>

Example
Running on http://localhost:4000

Enter the container
$ docker exec -it <container id> /bin/bash
