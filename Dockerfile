FROM node

# Define working directory
WORKDIR /opt/app

# Install top dependencies w/ caching
COPY package.json /opt/app/package.json
RUN npm install --silent

# Bundle source
COPY . /opt/app

# Pre-build app
RUN NODE_ENV=production node build.js

# Expose port 3000
EXPOSE 3000

# Define default command.
CMD ["node", "serve.js"]
