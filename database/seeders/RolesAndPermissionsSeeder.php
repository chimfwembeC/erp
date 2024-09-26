<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RolesAndPermissionsSeeder extends Seeder
{
    public function run()
    {
        // Create roles
        $adminRole = Role::create(['name' => 'admin']);
        $employeeRole = Role::create(['name' => 'employee']);
        $customerRole = Role::create(['name' => 'customer']);

        // Create permissions
        $permission1 = Permission::create(['name' => 'view_dashboard']);
        $permission2 = Permission::create(['name' => 'manage_users']);

        // Assign permissions to roles
        $adminRole->givePermissionTo($permission1);
        $adminRole->givePermissionTo($permission2);
        $employeeRole->givePermissionTo($permission1);

        // Assign roles to users
        // Example of assigning a role to a user
        // $user = User::find(1);
        // $user->assignRole('admin');
    }
}
