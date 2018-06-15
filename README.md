# Challenge Maker
This project was developed by team 'Challenge Maker',  under 48 hrs for https://sogeti-greenxgames.bemyapp.com/

## Get the code locally
```
git clone https://github.com/bxav/greenxgames-challenge-maker.git
```

## Deploy everything from you local
```bash
./scripts/deploy-from-local.sh
```

## Architecture

## Open source projects used


## Backend Development

### Run on your local
```bash
cd backend
docker-compose up -d
```
### Run Test

```bash
# Run end to end test 
docker-compose exec php bin/behat

```


## Folder Structure

```bash
.
|scripts/
|...deploy-from-local.sh
|infrastructure/ # Terraform files to deploy everything to azure
```

