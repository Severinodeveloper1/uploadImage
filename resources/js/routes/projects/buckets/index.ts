import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\ProjectController::store
 * @see app/Http/Controllers/ProjectController.php:213
 * @route '/dashboard/projects/{project}/buckets'
 */
export const store = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/dashboard/projects/{project}/buckets',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ProjectController::store
 * @see app/Http/Controllers/ProjectController.php:213
 * @route '/dashboard/projects/{project}/buckets'
 */
store.url = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { project: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { project: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    project: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        project: typeof args.project === 'object'
                ? args.project.id
                : args.project,
                }

    return store.definition.url
            .replace('{project}', parsedArgs.project.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectController::store
 * @see app/Http/Controllers/ProjectController.php:213
 * @route '/dashboard/projects/{project}/buckets'
 */
store.post = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\ProjectController::store
 * @see app/Http/Controllers/ProjectController.php:213
 * @route '/dashboard/projects/{project}/buckets'
 */
    const storeForm = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\ProjectController::store
 * @see app/Http/Controllers/ProjectController.php:213
 * @route '/dashboard/projects/{project}/buckets'
 */
        storeForm.post = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(args, options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\ProjectController::destroy
 * @see app/Http/Controllers/ProjectController.php:242
 * @route '/dashboard/projects/{project}/buckets/{bucket}'
 */
export const destroy = (args: { project: number | { id: number }, bucket: string | number } | [project: number | { id: number }, bucket: string | number ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/dashboard/projects/{project}/buckets/{bucket}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\ProjectController::destroy
 * @see app/Http/Controllers/ProjectController.php:242
 * @route '/dashboard/projects/{project}/buckets/{bucket}'
 */
destroy.url = (args: { project: number | { id: number }, bucket: string | number } | [project: number | { id: number }, bucket: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    project: args[0],
                    bucket: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        project: typeof args.project === 'object'
                ? args.project.id
                : args.project,
                                bucket: args.bucket,
                }

    return destroy.definition.url
            .replace('{project}', parsedArgs.project.toString())
            .replace('{bucket}', parsedArgs.bucket.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectController::destroy
 * @see app/Http/Controllers/ProjectController.php:242
 * @route '/dashboard/projects/{project}/buckets/{bucket}'
 */
destroy.delete = (args: { project: number | { id: number }, bucket: string | number } | [project: number | { id: number }, bucket: string | number ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\ProjectController::destroy
 * @see app/Http/Controllers/ProjectController.php:242
 * @route '/dashboard/projects/{project}/buckets/{bucket}'
 */
    const destroyForm = (args: { project: number | { id: number }, bucket: string | number } | [project: number | { id: number }, bucket: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\ProjectController::destroy
 * @see app/Http/Controllers/ProjectController.php:242
 * @route '/dashboard/projects/{project}/buckets/{bucket}'
 */
        destroyForm.delete = (args: { project: number | { id: number }, bucket: string | number } | [project: number | { id: number }, bucket: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const buckets = {
    store: Object.assign(store, store),
destroy: Object.assign(destroy, destroy),
}

export default buckets