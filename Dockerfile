# Статическая раздача каталога через nginx
FROM nginx:alpine

COPY . /usr/share/nginx/html

# По умолчанию nginx отдаёт index.html; для явного входа — /catalog.html
