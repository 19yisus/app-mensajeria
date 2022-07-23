FROM node:18

RUN mkdir -p /home/app

WORKDIR /home/app

COPY ./backend /home/app

EXPOSE 8080

CMD ["npm", "run", "dev"] 
