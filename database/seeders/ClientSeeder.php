<?php

namespace Database\Seeders;

use Faker\Factory;
use Illuminate\Database\Seeder;
use App\Models\Client;

class ClientSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Factory::create();
        for ($i = 0; $i < 10; $i++) {
            Client::create([
                'name' => $faker->name,
                'first_name' => $faker->firstName,
                'phone' => $faker->phoneNumber
            ]);
        }

    }
}
