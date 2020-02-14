#preparation and dependencies
sudo apt-get update -y
sudo apt-get upgrade - y

sudo apt-get \
  install \
  ssh \
  ufw \
  module-init-tools \
  apt-transport-https \
  ca-certificates \
  curl \
  software-properties-common

sudo ufw allow 22 #firewall for SSH
sudo modprobe ip_tables #missing from ubuntu image

./nginx/install.sh
./avahi/install.sh
./node/install.sh
./ssd/install.sh



#reboot for effects to take place
sudo reboot
