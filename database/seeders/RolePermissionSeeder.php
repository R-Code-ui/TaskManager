<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\PermissionRegistrar;

class RolePermissionSeeder extends Seeder
{
    public function run(): void
    {
        app()[PermissionRegistrar::class]->forgetCachedPermissions();

        $permissions = [
            // Task permissions
            'view tasks', 'create tasks', 'edit tasks', 'delete tasks',
            'manage users', 'view all tasks', 'edit all tasks', 'delete all tasks',
            // Game permissions
            'view games',     // for regular users to see and play enabled games
            'manage games',   // for admin to enable/disable games
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission]);
        }

        $adminRole = Role::firstOrCreate(['name' => 'admin']);
        $userRole  = Role::firstOrCreate(['name' => 'user']);

        // Admin gets all permissions
        $adminRole->syncPermissions(Permission::all());

        // User gets basic tasks + view games
        $userRole->syncPermissions([
            'view tasks', 'create tasks', 'edit tasks', 'delete tasks',
            'view games',
        ]);
    }
}
