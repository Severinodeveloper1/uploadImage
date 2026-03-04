import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\ApiTokenController::index
 * @see app/Http/Controllers/ApiTokenController.php:14
 * @route '/dashboard/projects/{project}/tokens'
 */
export const index = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/dashboard/projects/{project}/tokens',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ApiTokenController::index
 * @see app/Http/Controllers/ApiTokenController.php:14
 * @route '/dashboard/projects/{project}/tokens'
 */
index.url = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return index.definition.url
            .replace('{project}', parsedArgs.project.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ApiTokenController::index
 * @see app/Http/Controllers/ApiTokenController.php:14
 * @route '/dashboard/projects/{project}/tokens'
 */
index.get = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ApiTokenController::index
 * @see app/Http/Controllers/ApiTokenController.php:14
 * @route '/dashboard/projects/{project}/tokens'
 */
index.head = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ApiTokenController::index
 * @see app/Http/Controllers/ApiTokenController.php:14
 * @route '/dashboard/projects/{project}/tokens'
 */
    const indexForm = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ApiTokenController::index
 * @see app/Http/Controllers/ApiTokenController.php:14
 * @route '/dashboard/projects/{project}/tokens'
 */
        indexForm.get = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ApiTokenController::index
 * @see app/Http/Controllers/ApiTokenController.php:14
 * @route '/dashboard/projects/{project}/tokens'
 */
        indexForm.head = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index.form = indexForm
/**
* @see \App\Http\Controllers\ApiTokenController::store
 * @see app/Http/Controllers/ApiTokenController.php:34
 * @route '/dashboard/projects/{project}/tokens'
 */
export const store = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/dashboard/projects/{project}/tokens',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ApiTokenController::store
 * @see app/Http/Controllers/ApiTokenController.php:34
 * @route '/dashboard/projects/{project}/tokens'
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
* @see \App\Http\Controllers\ApiTokenController::store
 * @see app/Http/Controllers/ApiTokenController.php:34
 * @route '/dashboard/projects/{project}/tokens'
 */
store.post = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\ApiTokenController::store
 * @see app/Http/Controllers/ApiTokenController.php:34
 * @route '/dashboard/projects/{project}/tokens'
 */
    const storeForm = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\ApiTokenController::store
 * @see app/Http/Controllers/ApiTokenController.php:34
 * @route '/dashboard/projects/{project}/tokens'
 */
        storeForm.post = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(args, options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\ApiTokenController::destroy
 * @see app/Http/Controllers/ApiTokenController.php:58
 * @route '/dashboard/projects/{project}/tokens/{token}'
 */
export const destroy = (args: { project: number | { id: number }, token: number | { id: number } } | [project: number | { id: number }, token: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/dashboard/projects/{project}/tokens/{token}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\ApiTokenController::destroy
 * @see app/Http/Controllers/ApiTokenController.php:58
 * @route '/dashboard/projects/{project}/tokens/{token}'
 */
destroy.url = (args: { project: number | { id: number }, token: number | { id: number } } | [project: number | { id: number }, token: number | { id: number } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    project: args[0],
                    token: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        project: typeof args.project === 'object'
                ? args.project.id
                : args.project,
                                token: typeof args.token === 'object'
                ? args.token.id
                : args.token,
                }

    return destroy.definition.url
            .replace('{project}', parsedArgs.project.toString())
            .replace('{token}', parsedArgs.token.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ApiTokenController::destroy
 * @see app/Http/Controllers/ApiTokenController.php:58
 * @route '/dashboard/projects/{project}/tokens/{token}'
 */
destroy.delete = (args: { project: number | { id: number }, token: number | { id: number } } | [project: number | { id: number }, token: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\ApiTokenController::destroy
 * @see app/Http/Controllers/ApiTokenController.php:58
 * @route '/dashboard/projects/{project}/tokens/{token}'
 */
    const destroyForm = (args: { project: number | { id: number }, token: number | { id: number } } | [project: number | { id: number }, token: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\ApiTokenController::destroy
 * @see app/Http/Controllers/ApiTokenController.php:58
 * @route '/dashboard/projects/{project}/tokens/{token}'
 */
        destroyForm.delete = (args: { project: number | { id: number }, token: number | { id: number } } | [project: number | { id: number }, token: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const tokens = {
    index: Object.assign(index, index),
store: Object.assign(store, store),
destroy: Object.assign(destroy, destroy),
}

export default tokens