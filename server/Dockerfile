FROM node:12.13.0

RUN mkdir /home/quickkick-api
WORKDIR /home/quickkick-api
ENV PATH /home/quickkick-api/node_modules/.bin:$PATH
COPY . /home/quickkick-api
RUN npm install -g yarn
RUN yarn install


EXPOSE 4000
CMD ["yarn", "start-prod"]
