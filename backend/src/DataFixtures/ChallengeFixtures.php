<?php
namespace App\DataFixtures;

use App\Entity\Challenge;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;

class ChallengeFixtures extends Fixture
{
    const CHALLENGES = [
        [
            'name' => '3min shower',
            'thing' => AppFixtures::MAIN_THING_REF
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
}