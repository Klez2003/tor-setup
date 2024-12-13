const TurndownService = require('turndown');
const turndownService = new TurndownService();

const html = `
<h1>Apache2 Setup for Hidden Service with PHP 8.2</h1>
<h2>1. Install Dependencies</h2>
<pre><code>sudo apt update && upgrade -y
sudo apt install gcc libc6-dev libsodium-dev make autoconf software-properties-common tor apache2
</code></pre>
<h2>2. Add the PHP PPA and Install PHP 8.2</h2>
<pre><code>sudo add-apt-repository ppa:ondrej/php
sudo apt update
sudo apt install php8.2
</code></pre>
<h2>3. Install PHP 8.2 Extensions</h2>
<pre><code>sudo apt install php8.2-mbstring php8.2-xml php8.2-mysql
</code></pre>
<h2>4. Enable PHP-FPM and Configure Apache2</h2>
<pre><code>sudo a2enmod proxy_fcgi setenvif
sudo a2enconf php8.2-fpm
sudo systemctl restart apache2
</code></pre>
<h2>5. Clone and Use</h2>
<pre><code>git clone https://github.com/cathugger/mkp224o.git
cd mkp224o
./autogen.sh
./configure
make
./mkp224o -d keys/ ammo
ctrl+c
cd keys/ammo
</code></pre>
<h2>6. Configure Hidden Service in Tor</h2>
<pre><code>sudo mv hostname hs_ed25519_public_key hs_ed25519_secret_key /var/lib/tor/hidden_service/
sudo chown debian-tor:debian-tor /var/lib/tor/hidden_service/hs_ed25519_*
sudo chmod 600 /var/lib/tor/hidden_service/hs_ed25519_*
sudo chmod 644 /var/lib/tor/hidden_service/hostname

sudo nano /etc/tor/torrc
</code></pre>
<p>Add the following lines:</p>
<pre><code>HiddenServiceDir /var/lib/tor/hidden_service/
HiddenServicePort 80 127.0.0.1:80
</code></pre>
<pre><code>sudo systemctl restart tor
</code></pre>
<h2>6. Change Port for Apache2</h2>
<pre><code>sudo nano /etc/apache2/sites-available/000-default.conf
</code></pre>
<p>Change the Listen directive:</p>
<pre><code>Listen 8080
</code></pre>
<p>Update the VirtualHost directive:</p>
<pre><code>&lt;VirtualHost *:8080&gt;
</code></pre>
<pre><code>sudo systemctl restart apache2
</code></pre>
`;

const markdown = turndownService.turndown(html);
console.log(markdown);
