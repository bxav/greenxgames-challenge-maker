<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiProperty;
use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use Ramsey\Uuid\Uuid;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity
 * @ApiResource()
 * @ApiFilter(SearchFilter::class, properties={"thing": "exact"})
 */
class Challenge
{
    /**
     * @var string
     *
     * @ORM\Column(type="guid")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="NONE")
     */
    private $id;

    /**
     * @var array
     *
     * @ORM\Column(type="json_array", nullable=true)
     * @ApiProperty()
     */
    private $attributes = [];

    /**
     * @var string
     *
     * @ORM\Column(type="string", nullable=true, options={"default" : "unnamed"})
     * @ApiProperty()
     */
    private $name = "unnamed";

    /**
     * @var int
     *
     * @ORM\Column(type="integer", nullable=true, options={"default" : 0})
     * @ApiProperty()
     */
    private $value = 0;

    /**
     * @var Thing
     *
     * @ORM\ManyToOne(targetEntity="App\Entity\Thing")
     * @ORM\JoinColumn(nullable=true)
     */
    private $thing;

    public function __construct()
    {
        $this->id = Uuid::uuid4();
    }

    public function getId(): string
    {
        return $this->id;
    }

    public function getAttributes(): array
    {
        return $this->attributes;
    }

    public function setAttributes(array $attributes): void
    {
        $this->attributes = $attributes;
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function setName(string $name): void
    {
        $this->name = $name;
    }

    public function getValue(): int
    {
        return $this->value;
    }

    public function setValue(int $value): void
    {
        $this->value = $value;
    }

    public function getThing():? Thing
    {
        return $this->thing;
    }

    public function setThing(Thing $thing): void
    {
        $this->thing = $thing;
    }
}
