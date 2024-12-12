# Tor Hosting Setup

## Install Dependencies
# Install necessary packages for building and compiling the project
```sh
apt install gcc libc6-dev libsodium-dev make autoconf
```
## Select the PHP Version You Want to Install
# Choose the PHP version you want to install, for example:
```sh
apt install php8.2 -y
```
## Install Common PHP Extensions
# Install common PHP extensions that are often required. Example for PHP7.4:
```sh
apt install php8.2-mbstring php8.2-xml php8.2-mysql
```
## Enable PHP-FPM and Apache2 Configurations
# To configure Apache2 to work with PHP-FPM:
# 1. Enable the necessary Apache2 modules for PHP-FPM:
```sh
a2enmod proxy_fcgi setenvif
```
# 2. Enable PHP-FPM for your chosen version (example for PHP7.4):
```sh
a2enconf php8.2-fpm
```
# 3. Restart Apache2 to apply the changes:
```sh
systemctl restart apache2
```
## Alternatively, Set Up Nginx Instead of Apache2:
# If you want to use Nginx instead of Apache2, install Nginx and configure it like this:
```sh
sudo apt install nginx
```
# Then configure Nginx by editing the configuration file:
```sh
sudo nano /etc/nginx/sites-available/default
```
# Add the following block to proxy requests to PHP-FPM:
#
```sh
 server {
     listen 80;
     server_name yourdomain.com;
     root /var/www/html;
     index index.php;
     location ~ \.php$ {
         include snippets/fastcgi-php.conf;
         fastcgi_pass unix:/run/php/php7.4-fpm.sock; # Update to the correct PHP version.
         fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
         include fastcgi_params;
     }
 }
# Restart Nginx:
```sh
systemctl restart nginx
```

## Clone the Repository
# Clone the mkp224o repository from GitHub:
```sh
git clone https://github.com/cathugger/mkp224o.git
```
## Navigate to the Project Directory
# Change into the mkp224o directory that you just cloned:
```sh
cd mkp224o
```
## Setup mkp224o
# Run the following commands to set up mkp224o:
# 1. Prepare the environment by running autogen.sh
# 2. Configure the build with ./configure
# 3. Build the project with 'make'
# 4. Install the build files using the specified prefix
```sh
./autogen.sh
./configure
make
./mkp224o ammo
```
## Change to the First Created Directory
# Now that you have generated the necessary files, navigate to the directory where the files are created:

## Move the Keys and Hostname to the Tor Directory
# Move the keys and hostname files to the hidden service directory for Tor:
```sh
sudo mv hostname hs_ed25519_public_key hs_ed25519_secret_key /var/lib/tor/hidden_service/
```
# Set proper ownership and permissions for these files:
```sh
sudo chown debian-tor:debian-tor /var/lib/tor/hidden_service/hs_ed25519_*
sudo chmod 600 /var/lib/tor/hidden_service/hs_ed25519_*
sudo chmod 644 /var/lib/tor/hidden_service/hostname
```
## Configure Tor to Use the Hidden Service
# Edit the Tor configuration to specify the hidden service directory and port forwarding:
```sh
sudo nano /etc/tor/torrc
```
# Add these lines to the `torrc` file:
 HiddenServiceDir /var/lib/tor/hidden_service/
 HiddenServicePort 80 127.0.0.1:80 # This forwards Tor's hidden service port 80 to your local web server's port 80.

## Change Port for Apache2 or Nginx
# If you want to change the default port for Apache2 or Nginx (for example, to use port 8080 instead of 80), follow these steps:

# For Apache2:
# 1. Open Apache2's default configuration file:
```sh
sudo nano /etc/apache2/sites-available/000-default.conf
```
# 2. Look for the `Listen` directive and change it from `80` to `8080`:
```sh
Listen 8080
```
# 3. Update the VirtualHost block to use port 8080:
```sh
<VirtualHost *:8080>
```
# 4. Restart Apache2 to apply the change:
```sh
systemctl restart apache2
```

# For Nginx:
# 1. Open the Nginx configuration file for your site:
```sh
sudo nano /etc/nginx/sites-available/default
```
# 2. Change the `listen` directive to `8080`:
```sh
listen 8080;
```
# 3. Restart Nginx to apply the change:
```sh
systemctl restart nginx
```
