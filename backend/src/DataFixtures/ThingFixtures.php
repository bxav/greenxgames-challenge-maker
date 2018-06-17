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
            'id' => '3a258c5e-70ea-4777-8cec-1f55945a56da',
            'name' => 'Bouteille en verre',
            'ref' => 'ref-bouteille'
        ],
        'poubelle' => [
            'id' => '0ca84e18-c382-47c4-989f-ada3c6ae6b88',
            'name' => 'Poubelle',
            'ref' => 'ref-poubelle'
        ],
        'douche' => [
            'id' => 'b54172f5-0c39-43aa-b906-d5aaca35576e',
            'name' => 'Douche',
            'ref' => 'ref-douche'
        ],
        'frigo' => [
            'id' => 'f888f2ba-39da-42da-af2c-3df93de3cf19',
            'name' => 'Frigo',
            'ref' => 'ref-frigo'
        ],
        'velo' => [
            'id' => '4a0e879e-7a99-4864-8dc3-30db6512cb59',
            'name' => 'Velo',
            'ref' => 'ref-velo'
        ]
    ];

    public function load(ObjectManager $manager)
    {
        foreach (self::THINGS as $thingData) {
            $thing = $this->createThing($thingData['id']);
            $thing->setName($thingData['name']);

            $manager->persist($thing);

            $this->addReference($thingData['ref'], $thing);
        }

        $manager->flush();
    }

    private function createThing($id)
    {
        $entity = new Thing();
        $reflection = new \ReflectionClass($entity);

        $reflectionProperty = $reflection->getProperty('id');
        $reflectionProperty->setAccessible(true);

        $reflectionProperty->setValue($entity, $id);

        return $entity;
    }
}