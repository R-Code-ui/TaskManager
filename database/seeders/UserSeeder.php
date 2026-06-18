<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Admin
        $admin = User::firstOrCreate(
            ['username' => 'admin001'],   // lookup by username
            [
                'name' => 'Admin User',
                'email' => 'admin001@example.com',   // dummy unique email
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
            ]
        );
        $admin->assignRole('admin');

        // 2. Ten regular users with usernames and names
        $users = [
            ['username' => 'Ethan001',  'name' => 'Ethan Miguel Santos'],
            ['username' => 'Nathaniel002', 'name' => 'Nathaniel Cruz'],
            ['username' => 'Liam003',     'name' => 'Liam Gabriel Mendoza'],
            ['username' => 'Jacob004',    'name' => 'Jacob Reyes'],
            ['username' => 'Lucas005',    'name' => 'Lucas Mateo Aquino'],
            ['username' => 'Juan006',     'name' => 'Juan Carlos Dela Cruz'],
            ['username' => 'Jose007',     'name' => 'Jose Mari Bautista'],
            ['username' => 'Antonio008',  'name' => 'Antonio Luna'],
            ['username' => 'Manuel009',   'name' => 'Manuel Soriano'],
            ['username' => 'Francis010',  'name' => 'Francis Castillo'],
        ];

        foreach ($users as $userData) {
            $user = User::firstOrCreate(
                ['username' => $userData['username']],
                [
                    'name' => $userData['name'],
                    'email' => $userData['username'] . '@example.com',
                    'password' => Hash::make('password'),
                    'email_verified_at' => now(),
                ]
            );
            $user->assignRole('user');
        }
    }
}
