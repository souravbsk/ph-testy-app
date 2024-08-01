#!/bin/bash

# Set the correct path for Node.js
export PATH=/root/.nvm/versions/node/v22.5.1/bin:$PATH

# Navigate to the project directory
cd /root/test-applicaion/ph-testy-app/ph-testy-treat-client/

# Install dependencies
npm install

# Build the project
npm run build
