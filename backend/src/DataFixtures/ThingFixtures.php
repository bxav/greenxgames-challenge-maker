<?php
namespace App\DataFixtures;

use App\Entity\Challenge;
use App\Entity\Thing;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;

class ThingFixtures extends Fixture
{


    const THINGS = [
        'bouteille' => [
            'name' => 'Bouteille en verre',
            'ref' => 'ref-bouteille'
        ],
        'poubelle' => [
            'name' => 'Poubelle',
            'ref' => 'ref-poubelle'
        ],
        'douche' => [
            'name' => 'Douche',
            'ref' => 'ref-douche'
        ],
        'frigo' => [
            'name' => 'Frigo',
            'ref' => 'ref-frigo'
        ],
        'velo' => [
            'name' => 'Velo',
            'ref' => 'ref-velo'
        ]
    ];

    public function load(ObjectManager $manager)
    {
        foreach (self::THINGS as $thingData) {
            $thing = new Thing();
            $thing->setName($thingData['name']);

            $manager->persist($thing);

            $this->addReference($thingData['ref'], $thing);
        }

        $manager->flush();
    }
}