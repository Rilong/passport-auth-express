FROM node:14.5

RUN apt-get update && apt-get upgrade -y
RUN mkdir /home/node/app
WORKDIR /home/node/app
EXPOSE 3000
CMD ["npm", "run", "dev"]