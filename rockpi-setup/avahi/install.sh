#!/usr/bin/env bash

# Instal avahi
apt-get install -y avahi-daemon

# Copy veto.local avahi config
cp ./avahi-daemon.conf /etc/avahi/

# Start avahi daemon
avahi-daemon -D
