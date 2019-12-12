## nginx 配置

```
#user  nobody;
worker_processes  1;

events {
    worker_connections  1024;
}


http {
    include       mime.types;
    default_type  application/octet-stream;

    sendfile        on;

    keepalive_timeout  65;
    server {
        listen  8000;
        server_name  localhost; # 如果有域名 把localhost改成解析完成的域名

        location / {
          root   html/web;
          try_files $uri $uri/ /index.html;
        }
        #代理后台接口
        location /api/ {
            proxy_pass http://127.0.0.1:3000/;
        }

    }

    server {
        listen  8001;
        server_name  localhost;

        location / {
          root   html/admin;
          try_files $uri $uri/ /index.html;
        }
        #代理后台接口
        location /api/ {
            proxy_pass http://127.0.0.1:3000/;
        }

    }


}

```