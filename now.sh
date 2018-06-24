

# now alias essentialsgraphql-folmypyfsf.now.sh graphql-essentials
# now alias ls
echo "***DEPLOY API*** \n "

now ls

echo "Do you want to remove the previous url? [y/n] \c "
read erase

if [ $erase = "y" ]; then
 echo "Please input the url to remove: \c "
 read oldUri
 echo $oldUri
 now rm $oldUri
 echo "Replacing instance \n"
 now
 now ls
 echo -e "Please input the url to create a prettier alias: \c "
 read newurl
 echo $newurl
 now alias $newurl graphql-essentials
 now alias ls
else
 echo "Creating a new instance \n"
 now
 now ls
 echo "Please input the url to create a prettier alias: \c "
 read newurl
 echo $newurl
 now alias $newurl graphql-essentials
 now alias ls
fi