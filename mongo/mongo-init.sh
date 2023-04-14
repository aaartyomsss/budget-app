set -e

echo "-----------------------------"
echo "Starting an entrypoint script"
echo $MONGO_USERNAME
echo $MONGO_PASSWORD
echo "Creating a database $MONGO_INITDB_DATABASE"
echo "-----------------------------"

mongosh <<EOF
use $MONGO_INITDB_DATABASE

db.createUser({
  user: '$MONGO_USERNAME',
  pwd: '$MONGO_PASSWORD',
  roles: [{ role: 'dbOwner', db: '$MONGO_INITDB_DATABASE' }],
});

db.createCollection('budgetApp')

EOF