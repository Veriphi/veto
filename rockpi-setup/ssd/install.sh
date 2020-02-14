
# find the UUID of the M.2 SSD with the following command :
lsblk -o NAME,MOUNTPOINT,UUID,FSTYPE,SIZE,LABEL,MODEL

# then edit the fstab file and add the following as a new line at the end, replacing 123456 with your own UUID.
# sudo nano /etc/fstab
#UUID=123456 /mnt/ssd ext4 rw,nosuid,dev,noexec,noatime,nodiratime,auto,nouser,async,nofail 0 2

# Base edition script from Gustavo
# usersUUID=`blkid /dev/nvme0n1 | grep UUID= | awk '{print $2}'`
# sudo echo > /etc/fstab "UUID=$usersUUID /mnt/ssd ext4 
# rw,nosuid,dev,noexec,noatime,nodiratime,auto,nouser,async,nofail 0 2"

# Mount SSD
sudo mkdir /mnt/ssd
sudo mount -a
sudo mkdir /mnt/ssd/.cyphernode
ln -s /mnt/ssd/.cyphernode ~/.cyphernode

