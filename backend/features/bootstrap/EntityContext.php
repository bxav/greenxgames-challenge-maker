<?php

use Behat\Behat\Context\Context;
use Doctrine\Common\Persistence\ManagerRegistry;
use Doctrine\ORM\Tools\SchemaTool;
use Behat\Gherkin\Node\TableNode;

class EntityContext implements Context
{
    /**
     * @var ManagerRegistry
     */
    private $doctrine;

    /**
     * @var \Doctrine\Common\Persistence\ObjectManager
     */
    private $manager;

    /**
     * @var SchemaTool
     */
    private $schemaTool;

    /**
     * @var array
     */
    private $classes;

    public function __construct(ManagerRegistry $doctrine)
    {
        $this->doctrine = $doctrine;
        $this->manager = $doctrine->getManager();
        $this->schemaTool = new SchemaTool($this->manager);
        $this->classes = $this->manager->getMetadataFactory()->getAllMetadata();
    }

    /**
     * @Given /^the following challenges:?$/
     */
    public function theFollowingChallenges(TableNode $table)
    {
        $this->theFollowingEntities(\App\Entity\Challenge::class, $table);
    }

    /**
     * @Given /^the following things:?$/
     */
    public function theFollowingThings(TableNode $table)
    {
        $this->theFollowingEntities(\App\Entity\Thing::class, $table);
    }

    private function theFollowingEntities(string $entityName, TableNode $table)
    {
        $rows = $table->getRows();
        $headers = array_shift($rows);
        foreach ($rows as $row) {
            $values = array_combine($headers, $row);

            $id = $values['id'] ?: \Ramsey\Uuid\Uuid::uuid4();
            $entity = $this->createEntity($entityName, $id);

            $this->setEntityProperties($entity, $values);

            $this->doctrine->getManager()->persist($entity);
        }
        $this->doctrine->getManager()->flush();
    }

    private function createEntity($entityClass, $id)
    {
        $entity = new $entityClass();
        $reflection = new \ReflectionClass($entity);

        $reflectionProperty = $reflection->getProperty('id');
        $reflectionProperty->setAccessible(true);

        $reflectionProperty->setValue($entity, $id);

        return $entity;
    }

    private function parseAttributes(string $attributes): array
    {
        $attributes = explode(',', $attributes);
        $keyValues = [];
        foreach ($attributes as $attribute) {
            $keyValue = explode('=', $attribute);
            $keyValues[$keyValue[0]] = $keyValue[1];
        }

        return $keyValues;
    }

    private function setEntityProperties($entity, array $values): void
    {
        if ($entity instanceof \App\Entity\Challenge) {
            if ($values['attributes']) {
                $entity->setAttributes($this->parseAttributes($values['attributes']));
            }

            if ($values['thing']) {
                $thing = $this->doctrine->getManager()
                    ->getRepository(\App\Entity\Thing::class)
                    ->find($values['thing']);

                $entity->setThing($thing);
            }
        }
    }
}
