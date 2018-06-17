<?php
namespace App\DataFixtures;

use App\Entity\Challenge;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;

class ChallengeFixtures extends Fixture implements DependentFixtureInterface
{
    const CHALLENGES = [
        [
            'name' => 'Collecter 10 bouteilles en plastique',
            'thing' => ThingFixtures::THINGS['poubelle']['ref']
        ],
        [
            'name' => 'Rejoignez la journée de nettoyage le lundi',
            'thing' => ThingFixtures::THINGS['poubelle']['ref']
        ],
        [
            'name' => 'Collecter autant de canettes que possible',
            'thing' => ThingFixtures::THINGS['poubelle']['ref']
        ],
        [
            'name' => 'Prendre une douche en 5 minutes',
            'thing' => ThingFixtures::THINGS['douche']['ref']
        ],
        [
            'name' => 'Faire un repas du soir sans viande ni poisson',
            'thing' => ThingFixtures::THINGS['frigo']['ref']
        ],
        [
            'name' => 'Prenez une photo d\'une poubelle contenant du plastique',
            'thing' => ThingFixtures::THINGS['poubelle']['ref']
        ],
        [
            'name' => 'Aller à vélo ou marcher à l\'école pendant une semaine entire',
            'thing' => ThingFixtures::THINGS['velo']['ref']
        ]
    ];

    public function load(ObjectManager $manager)
    {
        foreach (self::CHALLENGES as $challengeData) {
            $challenge = new Challenge();
            $challenge->setName($challengeData['name']);

            $challenge->setThing($this->getReference($challengeData['thing']));

            $manager->persist($challenge);
        }

        $manager->flush();
    }

    public function getDependencies()
    {
        return array(
            AppFixtures::class,
            ThingFixtures::class,
        );
    }
}