# List databases
docker exec postgres-local psql -U nirmaniq -d nirmaniq_training -c "\l"

# List tables
docker exec postgres-local psql -U nirmaniq -d nirmaniq_training -c "\dt"

# Describe projects
docker exec postgres-local psql -U nirmaniq -d nirmaniq_training -c "\d projects"

# Query data
docker exec postgres-local psql -U nirmaniq -d nirmaniq_training -c "SELECT * FROM projects"

# Migration history
docker exec postgres-local psql -U nirmaniq -d nirmaniq_training -c "SELECT * FROM migrations ORDER BY id"