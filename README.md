# Green Challenges
This project was developed by team 'Green Challenges',  under 48 hrs for https://sogeti-greenxgames.bemyapp.com/

## Get the code locally
```
git clone https://github.com/bxav/greenxgames-challenge-maker.git
```

## Deploy everything from your local machine
```bash
./scripts/deploy-from-local.sh
```

## Architecture

![architecture](archi.png "Azure architecture")

## Open source libraries and projects used
* [Ionic](https://api-platform.com/): Used for the ChallengeReader and the android app ChallengeMaker
* [Terraform](https://api-platform.com/): Used to deploy our infrastructure to Azure
* [Api plateform](https://api-platform.com/): Used to build our main Rest api

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

## Frontend App Development (Progressive Web App)
Can be launched from any phone that can read Nfc or QrCode

### Run on your local
```bash
cd challenge-reader-app
npm install
ionic serve
```

## Challenge Maker App Development (Android App)

### Run on your local
```bash
cd challenge-maker-app
npm install
ionic run serve:android # connect your phone first
```

## Folder Structure

```bash
.
|scripts/
|...deploy-from-local.sh # Helper to deploy everything in the cloud from your local
|infrastructure/ # Terraform files to deploy everything to azure
|challenge-reader-app/ # Frontend App (to participate to challenges)
|challenge-maker-app/ # Android App (to create NfcTag and create challenges)
|backend/ # Rest api that manage the all logic
|infrastructure/ # Terraform files to deploy everything to azure
```

