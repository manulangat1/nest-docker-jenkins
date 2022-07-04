FROM node:14-alpine As development

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn install 
COPY . .
EXPOSE 3000
CMD ["yarn", "start:dev"]
# CMD [ "./entry.sh"]

# FROM node:12.13-alpine as production

# ARG NODE_ENV=production
# ENV NODE_ENV=${NODE_ENV}

# WORKDIR /usr/src/app

# COPY package*.json ./

# RUN npm install --only=production

# COPY . .

# COPY --from=development /usr/src/app/dist ./dist

# CMD ["node", "dist/main"]