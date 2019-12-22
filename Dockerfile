FROM nginx
COPY default.conf /etc/nginx/conf.d/default.conf
COPY dist/ /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/
#EXPOSE 9527
