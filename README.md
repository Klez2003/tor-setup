Apache2 Setup for Hidden Service with PHP 8.2
=============================================

1\. Install Dependencies
------------------------

    sudo apt update && upgrade -y
    sudo apt install gcc libc6-dev libsodium-dev make autoconf software-properties-common tor apache2
    

2\. Add the PHP PPA and Install PHP 8.2
---------------------------------------

    sudo add-apt-repository ppa:ondrej/php
    sudo apt update
    sudo apt install php8.2
    

3\. Install PHP 8.2 Extensions
------------------------------

    sudo apt install php8.2-mbstring php8.2-xml php8.2-mysql
    

4\. Enable PHP-FPM and Configure Apache2
----------------------------------------

    sudo a2enmod proxy_fcgi setenvif
    sudo a2enconf php8.2-fpm
    sudo systemctl restart apache2
    

5\. Clone and Use
-----------------

    git clone https://github.com/cathugger/mkp224o.git
    cd mkp224o
    ./autogen.sh
    ./configure
    make
    ./mkp224o -d keys/ ammo
    ctrl+c
    cd keys/ammo
    

6\. Configure Hidden Service in Tor
-----------------------------------

    sudo mv hostname hs_ed25519_public_key hs_ed25519_secret_key /var/lib/tor/hidden_service/
    sudo chown debian-tor:debian-tor /var/lib/tor/hidden_service/hs_ed25519_*
    sudo chmod 600 /var/lib/tor/hidden_service/hs_ed25519_*
    sudo chmod 644 /var/lib/tor/hidden_service/hostname
    
    sudo nano /etc/tor/torrc
    

Add the following lines:

    HiddenServiceDir /var/lib/tor/hidden_service/
    HiddenServicePort 80 127.0.0.1:80
    

    sudo systemctl restart tor
    

6\. Change Port for Apache2
---------------------------

    sudo nano /etc/apache2/sites-available/000-default.conf
    

Change the Listen directive:

    Listen 8080
    

Update the VirtualHost directive:

    <VirtualHost *:8080>
    

    sudo systemctl restart apache2
