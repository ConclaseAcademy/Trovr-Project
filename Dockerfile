FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# Accept the argument passed from GitHub Actions
ARG VITE_API_BASE_URL

# environment variable that Vite can see during compile time
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL


RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
