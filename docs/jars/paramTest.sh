echo "lite flow test shell"
echo "print each param from \$*"

for var in "$*"
do
    echo "${var}"
done

exit 0


