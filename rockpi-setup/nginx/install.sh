#!/usr/bin/env bash

# Install nginx
apt-get install -y nginx

# Remove default configuration
unlink /etc/nginx/sites-enabled/default

# Copy veto.local nginx config
cp ./veto.local /etc/nginx/sites-enabled/

# Make nginx restart automatically after reboot
systemctl enable nginx

# Start nginx
systemctl start nginx
