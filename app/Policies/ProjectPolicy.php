<?php

namespace App\Policies;

use App\Models\Project;
use App\Models\User;

class ProjectPolicy
{
    public function viewAny(User $user): bool
    {
        return $user->can('projects.view_any');
    }

    public function view(User $user, Project $project): bool
    {
        if ($user->can('projects.view_any')) {
            return true;
        }

        return $user->can('projects.view_own') && $project->user_id === $user->id;
    }

    public function create(User $user): bool
    {
        return $user->can('projects.create');
    }

    public function update(User $user, Project $project): bool
    {
        if ($user->can('projects.edit')) {
            return true;
        }

        return $user->can('projects.view_own') && $project->user_id === $user->id;
    }

    public function delete(User $user, Project $project): bool
    {
        return $user->can('projects.delete');
    }
}
