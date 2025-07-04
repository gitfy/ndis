# Use an official Nginx image to serve static content
FROM nginx:alpine
COPY index.html /usr/share/nginx/html/index.html
COPY style.css /usr/share/nginx/html/style.css
COPY script.js /usr/share/nginx/html/script.js
COPY home.html /usr/share/nginx/html/home.html
COPY personal.html /usr/share/nginx/html/personal.html
COPY community.html /usr/share/nginx/html/community.html
COPY support.html /usr/share/nginx/html/support.html
COPY contact.html /usr/share/nginx/html/contact.html
EXPOSE 80
