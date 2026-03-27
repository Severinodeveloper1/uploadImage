<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;

class RolesAndPermissionsSeeder extends Seeder
{
    public function run(): void
    {
        // Reset cached roles and permissions
        app()[PermissionRegistrar::class]->forgetCachedPermissions();

        // ─── Crear permisos agrupados por módulo ─────────────

        // MÓDULO: USERS
        $userPermissions = [
            'users.view_any',
            'users.create',
            'users.edit',
            'users.delete',
            'users.assign_roles',
        ];

        // MÓDULO: PROJECTS (uploadImage)
        $projectPermissions = [
            'projects.view_any',
            'projects.view_own',
            'projects.create',
            'projects.edit',
            'projects.delete',
        ];

        // MÓDULO: BUCKETS
        $bucketPermissions = [
            'buckets.view',
            'buckets.create',
            'buckets.edit',
            'buckets.delete',
        ];

        // MÓDULO: STORAGE FILES
        $filePermissions = [
            'files.upload',
            'files.view',
            'files.delete',
        ];

        // MÓDULO: SERVICE TICKETS (fichas de servicio)
        $ticketPermissions = [
            'tickets.view_any',
            'tickets.view_own',
            'tickets.create',
            'tickets.edit',
            'tickets.sign',
            'tickets.approve_repair',
            'tickets.delete',
            'tickets.view_report',
            'tickets.export_pdf',
        ];

        // MÓDULO: CONFIGURACIÓN
        $configPermissions = [
            'config.document_types',
            'config.view_dashboard',
        ];

        // Crear todos los permisos (guard: web)
        $allPermissions = array_merge(
            $userPermissions,
            $projectPermissions,
            $bucketPermissions,
            $filePermissions,
            $ticketPermissions,
            $configPermissions,
        );

        foreach ($allPermissions as $permission) {
            Permission::firstOrCreate([
                'name' => $permission,
                'guard_name' => 'web',
            ]);
        }

        // ─── Crear roles y asignar permisos ─────────────────

        // SUPER_ADMIN — bypassa todo vía Gate::before, pero le asignamos
        // todos los permisos para consistencia en consultas directas
        $superAdmin = Role::firstOrCreate([
            'name' => 'super_admin',
            'guard_name' => 'web',
        ]);
        $superAdmin->syncPermissions($allPermissions);

        // ADMIN
        $admin = Role::firstOrCreate([
            'name' => 'admin',
            'guard_name' => 'web',
        ]);
        $admin->syncPermissions([
            // Users
            'users.view_any',
            'users.create',
            'users.edit',
            // Projects
            'projects.view_any',
            'projects.view_own',
            'projects.create',
            'projects.edit',
            // Buckets
            'buckets.view',
            'buckets.create',
            'buckets.edit',
            'buckets.delete',
            // Files
            'files.upload',
            'files.view',
            'files.delete',
            // Tickets
            'tickets.view_any',
            'tickets.create',
            'tickets.edit',
            'tickets.sign',
            'tickets.approve_repair',
            'tickets.view_report',
            'tickets.export_pdf',
            // Config
            'config.document_types',
            'config.view_dashboard',
        ]);

        // TECHNICIAN
        $technician = Role::firstOrCreate([
            'name' => 'technician',
            'guard_name' => 'web',
        ]);
        $technician->syncPermissions([
            'config.view_dashboard',
            'tickets.view_own',
            'tickets.create',
            'tickets.edit',
            'tickets.sign',
            'tickets.approve_repair',
            'tickets.view_report',
            'tickets.export_pdf',
        ]);

        // CLIENT
        $client = Role::firstOrCreate([
            'name' => 'client',
            'guard_name' => 'web',
        ]);
        $client->syncPermissions([
            'tickets.view_report',
        ]);

        // ─── Crear usuario super_admin por defecto ──────────

        $superAdminUser = User::firstOrCreate(
            ['email' => 'superadmin@system.local'],
            [
                'name' => 'Super Admin',
                'password' => Hash::make(env('SUPER_ADMIN_PASSWORD', 'SuperAdmin2026!')),
                'is_active' => true,
            ]
        );

        $superAdminUser->syncRoles(['super_admin']);

        $this->command->info('Roles y permisos creados correctamente.');
        $this->command->info('Usuario super_admin: superadmin@system.local');
    }
}
