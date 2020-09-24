FROM node:10
WORKDIR /opt/app/
ENV NODE_ENV production
COPY package.json ./
RUN npm i
COPY . .
EXPOSE 7000
CMD npm run start
