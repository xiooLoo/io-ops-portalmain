FROM nginx:1.21.6
COPY dist /usr/share/nginx/html/dist/
EXPOSE 80
EXPOSE 443
