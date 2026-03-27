<?php

namespace App\Providers;

use App\Models\Project;
use App\Models\StorageFile;
use App\Observers\StorageFileObserver;
use App\Policies\ProjectPolicy;
use Carbon\CarbonImmutable;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\ServiceProvider;
use Illuminate\Validation\Rules\Password;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        $this->configureDefaults();
        $this->configureAuthorization();

        StorageFile::observe(StorageFileObserver::class);
    }

    /**
     * Configure authorization: super_admin bypass + policies.
     */
    protected function configureAuthorization(): void
    {
        // super_admin bypassa TODOS los permisos
        Gate::before(function ($user, $ability) {
            return $user->hasRole('super_admin') ? true : null;
        });

        // Registrar policies
        Gate::policy(Project::class, ProjectPolicy::class);
        Gate::policy(\App\Models\ServiceTicket::class, \App\Policies\ServiceTicketPolicy::class);
    }

    /**
     * Configure default behaviors for production-ready applications.
     */
    protected function configureDefaults(): void
    {
        Date::use(CarbonImmutable::class);

        DB::prohibitDestructiveCommands(
            app()->isProduction(),
        );

        Password::defaults(fn (): ?Password => app()->isProduction()
            ? Password::min(12)
                ->mixedCase()
                ->letters()
                ->numbers()
                ->symbols()
                ->uncompromised()
            : null,
        );
    }
}
