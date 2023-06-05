pkg update && pkg upgrade -y
pkg install git -y
pkg install nodejs -y
pkg install ffmpeg -y
pkg install imagemagick -y
pkg install yarn
cd nightcore
yarn
node .

