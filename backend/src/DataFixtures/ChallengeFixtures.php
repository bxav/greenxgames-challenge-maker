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
            'type' => Challenge::AUTOMATIC,
            'value' => 10,
            'thing' => ThingFixtures::THINGS['poubelle']['ref']
        ],
        [
            'name' => 'Rejoignez la journée de nettoyage le lundi',
            'type' => Challenge::AUTOMATIC,
            'value' => 50,
            'thing' => ThingFixtures::THINGS['poubelle']['ref']
        ],
        [
            'name' => 'Collecter autant de canettes que possible',
            'type' => Challenge::AUTOMATIC,
            'value' => 25,
            'thing' => ThingFixtures::THINGS['poubelle']['ref']
        ],
        [
            'name' => 'Combien de temps faut-il pour que le plastique soit digéré?',
            'type' => Challenge::QUIZ,
            'attributes' => [
                '1 année' => false,
                '4 année' => false,
                '5 année' => false,
                'correct' => 'Il faut 5 à 10 ans pour qu\'une bouteille de soda plastique finisse',
                'wrong' => 'Il faut 5 à 10 ans pour qu\'une bouteille de soda plastique finisse',
                'astuce' => 'Toujours mettre le plastique ensemble. Ensuite, il peut facilement être réutilisé.',
            ],
            'value' => 15,
            'thing' => ThingFixtures::THINGS['poubelle']['ref']
        ],
        [
            'name' => 'Dans quel récipient devrait verre?',
            'type' => Challenge::QUIZ,
            'attributes' => [
                'Vert' => true,
                'Bleu' => false,
                'Rouge' => false,
                'Jaune' => false,
                'correct' => 'Le verre doit être dans le récipient vert',
                'wrong' => 'Le verre doit être dans le récipient vert',
                'astuce' => 'Parfois la poubelle verte peut également etre utilisee pour les fruits et legumes. Toujours verifier avant de jeter quelque chose.',
            ],
            'value' => 15,
            'thing' => ThingFixtures::THINGS['poubelle']['ref']
        ],
        [
            'name' => 'Dans quel récipient devrait verre?',
            'type' => Challenge::QUIZ,
            'attributes' => [
                'Vert' => true,
                'Bleu' => false,
                'Rouge' => false,
                'Jaune' => false,
                'correct' => 'Le verre doit être dans le récipient vert',
                'wrong' => 'Le verre doit être dans le récipient vert',
                'astuce' => 'Parfois la poubelle verte peut également etre utilisee pour les fruits et legumes. Toujours verifier avant de jeter quelque chose.',
            ],
            'value' => 15,
            'thing' => ThingFixtures::THINGS['poubelle']['ref']
        ],
        [
            'name' => 'Prendre une douche en 5 minutes',
            'type' => Challenge::AUTOMATIC,
            'value' => 25,
            'thing' => ThingFixtures::THINGS['douche']['ref']
        ],
        [
            'name' => 'Faire un repas du soir sans viande ni poisson',
            'type' => Challenge::AUTOMATIC,
            'value' => 25,
            'thing' => ThingFixtures::THINGS['frigo']['ref']
        ],
        [
            'name' => 'Prenez une photo d\'une poubelle contenant du plastique',
            'type' => Challenge::AUTOMATIC,
            'value' => 10,
            'thing' => ThingFixtures::THINGS['poubelle']['ref']
        ],
        [
            'name' => 'Aller à vélo ou marcher à l\'école pendant une semaine entire',
            'type' => Challenge::AUTOMATIC,
            'value' => 25,
            'thing' => ThingFixtures::THINGS['velo']['ref']
        ]
    ];

    public function load(ObjectManager $manager)
    {
        foreach (self::CHALLENGES as $challengeData) {
            $challenge = new Challenge();
            $challenge->setName($challengeData['name']);
            $challenge->setType($challengeData['type']);
            $challenge->setValue($challengeData['value']);
            if (isset($challengeData['attributes'])) {
                $challenge->setAttributes($challengeData['attributes']);
            }

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