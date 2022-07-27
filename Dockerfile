FROM node:18

RUN mkdir -p /home/app

WORKDIR /home/app

COPY ./backend ./

RUN npm install

EXPOSE 8080

CMD ["npm", "run", "start"] 
