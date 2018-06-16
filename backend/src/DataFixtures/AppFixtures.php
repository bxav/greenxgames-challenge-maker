<?php
namespace App\DataFixtures;

use App\Entity\Thing;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;

class AppFixtures extends Fixture
{
    public const MAIN_THING_REF = "main-ref";


    public function load(ObjectManager $manager)
    {
        $thing = new Thing();

        $manager->persist($thing);

        $manager->flush();

        $this->addReference(self::MAIN_THING_REF, $thing);
    }
}