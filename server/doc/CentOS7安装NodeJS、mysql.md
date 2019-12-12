# 安装nodejs (以9.3.0为例)
## 首先安装wget
`yum install -y wget`
如果已经安装了可以跳过该步

### 下载nodejs最新的bin包
可以在[官网](https://nodejs.org/en/download/)中找到下载地址。然后执行指令
`wget https://nodejs.org/dist/v9.3.0/node-v9.3.0-linux-x64.tar.xz`
然后就是等着下载完毕。

另外你也可以在你喜欢的任意系统上下载最新的bin包，然后通过FTP上传到CentOS上。

### 解压包
依次执行

```cmd
xz -d node-v9.3.0-linux-x64.tar.xz
tar -xf node-v9.3.0-linux-x64.tar
```

### 部署bin文件
先确认你nodejs的路径，我这里的路径为~/node-v9.3.0-linux-x64/bin。确认后依次执行
```cmd
ln -s ~/node-v9.3.0-linux-x64/bin/node /usr/bin/node
ln -s ~/node-v9.3.0-linux-x64/bin/npm /usr/bin/npm
ln -s ~/node-v9.3.0-linux-x64/bin/npx /usr/bin/npx
```
注意ln指令用于创建关联（类似与Windows的快捷方式）必须给全路径，否则可能关联错误。

### 测试
```
node -v
npm
npx
```

## 安装cnpm
```
npm install -g cnpm --registry=https://registry.npm.taobao.org
ln -s ~/node-v9.3.0-linux-x64/bin/cnpm /usr/bin/cnpm
```

## 安装pm2
```
全局安装   npm install -g pm2
启动   pm2 start app.js --name test
显示所有进程状态  pm2 list
显示所有进程日志  pm2 logs
查看启动的进程  ps -ef|grep pm2
停止所有进程 pm2 stop all
```

# CentOS7安装nginx

## 安装
```
cd /usr/local/src
wget http://nginx.org/download/nginx-1.17.5.tar.gz
tar -zxvf nginx-1.17.5.tar.gz
cd nginx-1.17.5
./configure
make
make install
```
make 可能会出现报错,解决如下
```
yum -y install openssl openssl-devel
```
继续执行
```
./configure
make
make install
```
然后就安装好了 目录 `/usr/local/nginx`

## nginx的启动、停止和重启

启动前，先修改配置文件, 修改路径 `/usr/local/nginx/conf/nginx.conf`

### nginx启动 
进入nginx的安装目录，进入/sbin并执行`./nginx`命令即可
使用命令`netstat -ntpl`查看是否启动成功
### nginx停止
- 通过命令停止 `./nginx -s reload`
- 通过杀死进程
  ```
  ps -ef|grep nginx
  pkill -9 nginx
  ```
### nginx重启
进入nginx可执行目录sbin下，输入命令./nginx -s reload 即可或者在服务器任意地方输入nginx -s reload


# CentOS7安装MySQL 5.7

## 下载并安装MySQL官方的 Yum Repository
```
[root@localhost ~]# wget -i -c http://dev.mysql.com/get/mysql57-community-release-el7-10.noarch.rpm
```
 
使用上面的命令就直接下载了安装用的`Yum Repository`，大概25KB的样子，然后就可以直接yum安装了。

```
[root@localhost ~]# yum -y install mysql57-community-release-el7-10.noarch.rpm
```

### 开始安装MySQL服务器。
```
[root@localhost ~]# yum -y install mysql-community-server
```
这步可能会花些时间，安装完成后就会覆盖掉之前的mariadb。


至此MySQL就安装完成了，然后是对MySQL的一些设置。

## MySQL数据库设置
  
### 首先启动MySQL

```
[root@localhost ~]# systemctl start mysqld.service
```

查看MySQL运行状态，运行状态如图：
```
[root@localhost ~]# systemctl status mysqld.service
```

此时MySQL已经开始正常运行，不过要想进入MySQL还得先找出此时root用户的密码，通过如下命令可以在日志文件中找出密码：
```
[root@localhost ~]# grep "password" /var/log/mysqld.log
```

### 登录数据库：
```
[root@localhost ~]# mysql -uroot -p
```
输入初始密码，此时不能做任何事情，因为MySQL默认必须修改密码之后才能操作数据库：

### 修改密码
```
mysql> ALTER USER 'root'@'localhost' IDENTIFIED BY 'new password';
```
其中‘new password’替换成你要设置的密码，注意:密码设置必须要大小写字母数字和特殊符号（,/';:等）,不然不能配置成功

注意：这里会进行密码强度校验（密码设置时必须包含大小写字母、特殊符号、数字，并且长度大于8位）,如不满足以上条件则会报错
密码策略问题异常信息：
```
ERROR 1819 (HY000): Your password does not satisfy the current policy requirements
```
1. 查看 mysql 初始的密码策略，

```
SHOW VARIABLES LIKE 'validate_password%';
```
2. 首先需要设置密码的验证强度等级，设置 validate_password_policy 的全局参数为 LOW 即可，

```
set global validate_password_policy=LOW;
```

3. 当前密码长度为 8 ，如果不介意的话就不用修改了，按照通用的来讲，设置为 6 位的密码，设置 validate_password_length 的全局参数为 6 即可，
```
set global validate_password_length=6;
```

4. 现在可以为 mysql 设置简单密码了，只要满足六位的长度即可，

```
ALTER USER 'root'@'localhost' IDENTIFIED BY '123456';
```

 

### 开启mysql的远程访问
执行以下命令开启远程访问限制（注意：下面命令开启的IP是 192.168.0.1，如要开启所有的，用%代替IP）：
```
grant all privileges on *.* to 'root'@'192.168.0.1' identified by 'password' with grant option;
```
### 完成退出

mysql> flush privileges;
mysql> exit


### 为firewalld添加开放端口
添加mysql端口3306和Tomcat端口8080
```
[root@localhost ~]# firewall-cmd --zone=public --add-port=3306/tcp --permanent
[root@localhost ~]# firewall-cmd --zone=public --add-port=8080/tcp --permanent
```
然后再重新载入
```
[root@localhost ~]# firewall-cmd --reload
```
 

## 其他配置
1. 设置安全选项：
`mysql_secure_installation`

2. 关闭MySQL
`systemctl stop mysqld `

3. 重启MySQL
`systemctl restart mysqld `

4. 查看MySQL运行状态
`systemctl status mysqld `

5. 设置开机启动
`systemctl enable mysqld `

6. 关闭开机启动
`systemctl disable mysqld `

7. 配置默认编码为utf8：
`vi /etc/my.cnf #添加 [mysqld] character_set_server=utf8 init_connect='SET NAMES utf8'`

8. 其他默认配置文件路径： 

配置文件：/etc/my.cnf 
日志文件：/var/log//var/log/mysqld.log 
服务启动脚本：/usr/lib/systemd/system/mysqld.service 
socket文件：/var/run/mysqld/mysqld.pid