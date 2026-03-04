import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\ProjectController::index
 * @see app/Http/Controllers/ProjectController.php:21
 * @route '/dashboard/projects'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/dashboard/projects',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ProjectController::index
 * @see app/Http/Controllers/ProjectController.php:21
 * @route '/dashboard/projects'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectController::index
 * @see app/Http/Controllers/ProjectController.php:21
 * @route '/dashboard/projects'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ProjectController::index
 * @see app/Http/Controllers/ProjectController.php:21
 * @route '/dashboard/projects'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ProjectController::index
 * @see app/Http/Controllers/ProjectController.php:21
 * @route '/dashboard/projects'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ProjectController::index
 * @see app/Http/Controllers/ProjectController.php:21
 * @route '/dashboard/projects'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ProjectController::index
 * @see app/Http/Controllers/ProjectController.php:21
 * @route '/dashboard/projects'
 */
        indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index.form = indexForm
/**
* @see \App\Http\Controllers\ProjectController::store
 * @see app/Http/Controllers/ProjectController.php:48
 * @route '/dashboard/projects'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/dashboard/projects',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ProjectController::store
 * @see app/Http/Controllers/ProjectController.php:48
 * @route '/dashboard/projects'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectController::store
 * @see app/Http/Controllers/ProjectController.php:48
 * @route '/dashboard/projects'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\ProjectController::store
 * @see app/Http/Controllers/ProjectController.php:48
 * @route '/dashboard/projects'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\ProjectController::store
 * @see app/Http/Controllers/ProjectController.php:48
 * @route '/dashboard/projects'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\ProjectController::show
 * @see app/Http/Controllers/ProjectController.php:68
 * @route '/dashboard/projects/{project}'
 */
export const show = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/dashboard/projects/{project}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ProjectController::show
 * @see app/Http/Controllers/ProjectController.php:68
 * @route '/dashboard/projects/{project}'
 */
show.url = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return show.definition.url
            .replace('{project}', parsedArgs.project.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectController::show
 * @see app/Http/Controllers/ProjectController.php:68
 * @route '/dashboard/projects/{project}'
 */
show.get = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ProjectController::show
 * @see app/Http/Controllers/ProjectController.php:68
 * @route '/dashboard/projects/{project}'
 */
show.head = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ProjectController::show
 * @see app/Http/Controllers/ProjectController.php:68
 * @route '/dashboard/projects/{project}'
 */
    const showForm = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ProjectController::show
 * @see app/Http/Controllers/ProjectController.php:68
 * @route '/dashboard/projects/{project}'
 */
        showForm.get = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ProjectController::show
 * @see app/Http/Controllers/ProjectController.php:68
 * @route '/dashboard/projects/{project}'
 */
        showForm.head = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show.form = showForm
/**
* @see \App\Http\Controllers\ProjectController::update
 * @see app/Http/Controllers/ProjectController.php:109
 * @route '/dashboard/projects/{project}'
 */
export const update = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/dashboard/projects/{project}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\ProjectController::update
 * @see app/Http/Controllers/ProjectController.php:109
 * @route '/dashboard/projects/{project}'
 */
update.url = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return update.definition.url
            .replace('{project}', parsedArgs.project.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectController::update
 * @see app/Http/Controllers/ProjectController.php:109
 * @route '/dashboard/projects/{project}'
 */
update.put = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\ProjectController::update
 * @see app/Http/Controllers/ProjectController.php:109
 * @route '/dashboard/projects/{project}'
 */
    const updateForm = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\ProjectController::update
 * @see app/Http/Controllers/ProjectController.php:109
 * @route '/dashboard/projects/{project}'
 */
        updateForm.put = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
/**
* @see \App\Http\Controllers\ProjectController::destroy
 * @see app/Http/Controllers/ProjectController.php:125
 * @route '/dashboard/projects/{project}'
 */
export const destroy = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/dashboard/projects/{project}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\ProjectController::destroy
 * @see app/Http/Controllers/ProjectController.php:125
 * @route '/dashboard/projects/{project}'
 */
destroy.url = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return destroy.definition.url
            .replace('{project}', parsedArgs.project.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectController::destroy
 * @see app/Http/Controllers/ProjectController.php:125
 * @route '/dashboard/projects/{project}'
 */
destroy.delete = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\ProjectController::destroy
 * @see app/Http/Controllers/ProjectController.php:125
 * @route '/dashboard/projects/{project}'
 */
    const destroyForm = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
 * @see app/Http/Controllers/ProjectController.php:125
 * @route '/dashboard/projects/{project}'
 */
        destroyForm.delete = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
/**
* @see \App\Http\Controllers\ProjectController::storage
 * @see app/Http/Controllers/ProjectController.php:140
 * @route '/dashboard/projects/{project}/storage'
 */
export const storage = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: storage.url(args, options),
    method: 'get',
})

storage.definition = {
    methods: ["get","head"],
    url: '/dashboard/projects/{project}/storage',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ProjectController::storage
 * @see app/Http/Controllers/ProjectController.php:140
 * @route '/dashboard/projects/{project}/storage'
 */
storage.url = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return storage.definition.url
            .replace('{project}', parsedArgs.project.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectController::storage
 * @see app/Http/Controllers/ProjectController.php:140
 * @route '/dashboard/projects/{project}/storage'
 */
storage.get = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: storage.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ProjectController::storage
 * @see app/Http/Controllers/ProjectController.php:140
 * @route '/dashboard/projects/{project}/storage'
 */
storage.head = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: storage.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ProjectController::storage
 * @see app/Http/Controllers/ProjectController.php:140
 * @route '/dashboard/projects/{project}/storage'
 */
    const storageForm = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: storage.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ProjectController::storage
 * @see app/Http/Controllers/ProjectController.php:140
 * @route '/dashboard/projects/{project}/storage'
 */
        storageForm.get = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: storage.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ProjectController::storage
 * @see app/Http/Controllers/ProjectController.php:140
 * @route '/dashboard/projects/{project}/storage'
 */
        storageForm.head = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: storage.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    storage.form = storageForm
/**
* @see \App\Http\Controllers\ProjectController::storageBucket
 * @see app/Http/Controllers/ProjectController.php:165
 * @route '/dashboard/projects/{project}/storage/{bucket}'
 */
export const storageBucket = (args: { project: number | { id: number }, bucket: string | number } | [project: number | { id: number }, bucket: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: storageBucket.url(args, options),
    method: 'get',
})

storageBucket.definition = {
    methods: ["get","head"],
    url: '/dashboard/projects/{project}/storage/{bucket}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ProjectController::storageBucket
 * @see app/Http/Controllers/ProjectController.php:165
 * @route '/dashboard/projects/{project}/storage/{bucket}'
 */
storageBucket.url = (args: { project: number | { id: number }, bucket: string | number } | [project: number | { id: number }, bucket: string | number ], options?: RouteQueryOptions) => {
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

    return storageBucket.definition.url
            .replace('{project}', parsedArgs.project.toString())
            .replace('{bucket}', parsedArgs.bucket.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectController::storageBucket
 * @see app/Http/Controllers/ProjectController.php:165
 * @route '/dashboard/projects/{project}/storage/{bucket}'
 */
storageBucket.get = (args: { project: number | { id: number }, bucket: string | number } | [project: number | { id: number }, bucket: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: storageBucket.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ProjectController::storageBucket
 * @see app/Http/Controllers/ProjectController.php:165
 * @route '/dashboard/projects/{project}/storage/{bucket}'
 */
storageBucket.head = (args: { project: number | { id: number }, bucket: string | number } | [project: number | { id: number }, bucket: string | number ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: storageBucket.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ProjectController::storageBucket
 * @see app/Http/Controllers/ProjectController.php:165
 * @route '/dashboard/projects/{project}/storage/{bucket}'
 */
    const storageBucketForm = (args: { project: number | { id: number }, bucket: string | number } | [project: number | { id: number }, bucket: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: storageBucket.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ProjectController::storageBucket
 * @see app/Http/Controllers/ProjectController.php:165
 * @route '/dashboard/projects/{project}/storage/{bucket}'
 */
        storageBucketForm.get = (args: { project: number | { id: number }, bucket: string | number } | [project: number | { id: number }, bucket: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: storageBucket.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ProjectController::storageBucket
 * @see app/Http/Controllers/ProjectController.php:165
 * @route '/dashboard/projects/{project}/storage/{bucket}'
 */
        storageBucketForm.head = (args: { project: number | { id: number }, bucket: string | number } | [project: number | { id: number }, bucket: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: storageBucket.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    storageBucket.form = storageBucketForm
/**
* @see \App\Http\Controllers\ProjectController::storeBucket
 * @see app/Http/Controllers/ProjectController.php:213
 * @route '/dashboard/projects/{project}/buckets'
 */
export const storeBucket = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeBucket.url(args, options),
    method: 'post',
})

storeBucket.definition = {
    methods: ["post"],
    url: '/dashboard/projects/{project}/buckets',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ProjectController::storeBucket
 * @see app/Http/Controllers/ProjectController.php:213
 * @route '/dashboard/projects/{project}/buckets'
 */
storeBucket.url = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return storeBucket.definition.url
            .replace('{project}', parsedArgs.project.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectController::storeBucket
 * @see app/Http/Controllers/ProjectController.php:213
 * @route '/dashboard/projects/{project}/buckets'
 */
storeBucket.post = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeBucket.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\ProjectController::storeBucket
 * @see app/Http/Controllers/ProjectController.php:213
 * @route '/dashboard/projects/{project}/buckets'
 */
    const storeBucketForm = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: storeBucket.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\ProjectController::storeBucket
 * @see app/Http/Controllers/ProjectController.php:213
 * @route '/dashboard/projects/{project}/buckets'
 */
        storeBucketForm.post = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: storeBucket.url(args, options),
            method: 'post',
        })
    
    storeBucket.form = storeBucketForm
/**
* @see \App\Http\Controllers\ProjectController::destroyBucket
 * @see app/Http/Controllers/ProjectController.php:242
 * @route '/dashboard/projects/{project}/buckets/{bucket}'
 */
export const destroyBucket = (args: { project: number | { id: number }, bucket: string | number } | [project: number | { id: number }, bucket: string | number ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroyBucket.url(args, options),
    method: 'delete',
})

destroyBucket.definition = {
    methods: ["delete"],
    url: '/dashboard/projects/{project}/buckets/{bucket}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\ProjectController::destroyBucket
 * @see app/Http/Controllers/ProjectController.php:242
 * @route '/dashboard/projects/{project}/buckets/{bucket}'
 */
destroyBucket.url = (args: { project: number | { id: number }, bucket: string | number } | [project: number | { id: number }, bucket: string | number ], options?: RouteQueryOptions) => {
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

    return destroyBucket.definition.url
            .replace('{project}', parsedArgs.project.toString())
            .replace('{bucket}', parsedArgs.bucket.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectController::destroyBucket
 * @see app/Http/Controllers/ProjectController.php:242
 * @route '/dashboard/projects/{project}/buckets/{bucket}'
 */
destroyBucket.delete = (args: { project: number | { id: number }, bucket: string | number } | [project: number | { id: number }, bucket: string | number ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroyBucket.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\ProjectController::destroyBucket
 * @see app/Http/Controllers/ProjectController.php:242
 * @route '/dashboard/projects/{project}/buckets/{bucket}'
 */
    const destroyBucketForm = (args: { project: number | { id: number }, bucket: string | number } | [project: number | { id: number }, bucket: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroyBucket.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\ProjectController::destroyBucket
 * @see app/Http/Controllers/ProjectController.php:242
 * @route '/dashboard/projects/{project}/buckets/{bucket}'
 */
        destroyBucketForm.delete = (args: { project: number | { id: number }, bucket: string | number } | [project: number | { id: number }, bucket: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroyBucket.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroyBucket.form = destroyBucketForm
/**
* @see \App\Http\Controllers\ProjectController::uploadFile
 * @see app/Http/Controllers/ProjectController.php:258
 * @route '/dashboard/projects/{project}/storage/{bucket}/upload'
 */
export const uploadFile = (args: { project: number | { id: number }, bucket: string | number } | [project: number | { id: number }, bucket: string | number ], options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: uploadFile.url(args, options),
    method: 'post',
})

uploadFile.definition = {
    methods: ["post"],
    url: '/dashboard/projects/{project}/storage/{bucket}/upload',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ProjectController::uploadFile
 * @see app/Http/Controllers/ProjectController.php:258
 * @route '/dashboard/projects/{project}/storage/{bucket}/upload'
 */
uploadFile.url = (args: { project: number | { id: number }, bucket: string | number } | [project: number | { id: number }, bucket: string | number ], options?: RouteQueryOptions) => {
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

    return uploadFile.definition.url
            .replace('{project}', parsedArgs.project.toString())
            .replace('{bucket}', parsedArgs.bucket.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectController::uploadFile
 * @see app/Http/Controllers/ProjectController.php:258
 * @route '/dashboard/projects/{project}/storage/{bucket}/upload'
 */
uploadFile.post = (args: { project: number | { id: number }, bucket: string | number } | [project: number | { id: number }, bucket: string | number ], options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: uploadFile.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\ProjectController::uploadFile
 * @see app/Http/Controllers/ProjectController.php:258
 * @route '/dashboard/projects/{project}/storage/{bucket}/upload'
 */
    const uploadFileForm = (args: { project: number | { id: number }, bucket: string | number } | [project: number | { id: number }, bucket: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: uploadFile.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\ProjectController::uploadFile
 * @see app/Http/Controllers/ProjectController.php:258
 * @route '/dashboard/projects/{project}/storage/{bucket}/upload'
 */
        uploadFileForm.post = (args: { project: number | { id: number }, bucket: string | number } | [project: number | { id: number }, bucket: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: uploadFile.url(args, options),
            method: 'post',
        })
    
    uploadFile.form = uploadFileForm
/**
* @see \App\Http\Controllers\ProjectController::destroyFile
 * @see app/Http/Controllers/ProjectController.php:292
 * @route '/dashboard/projects/{project}/storage/{bucket}/files/{file}'
 */
export const destroyFile = (args: { project: number | { id: number }, bucket: string | number, file: string | number } | [project: number | { id: number }, bucket: string | number, file: string | number ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroyFile.url(args, options),
    method: 'delete',
})

destroyFile.definition = {
    methods: ["delete"],
    url: '/dashboard/projects/{project}/storage/{bucket}/files/{file}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\ProjectController::destroyFile
 * @see app/Http/Controllers/ProjectController.php:292
 * @route '/dashboard/projects/{project}/storage/{bucket}/files/{file}'
 */
destroyFile.url = (args: { project: number | { id: number }, bucket: string | number, file: string | number } | [project: number | { id: number }, bucket: string | number, file: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    project: args[0],
                    bucket: args[1],
                    file: args[2],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        project: typeof args.project === 'object'
                ? args.project.id
                : args.project,
                                bucket: args.bucket,
                                file: args.file,
                }

    return destroyFile.definition.url
            .replace('{project}', parsedArgs.project.toString())
            .replace('{bucket}', parsedArgs.bucket.toString())
            .replace('{file}', parsedArgs.file.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectController::destroyFile
 * @see app/Http/Controllers/ProjectController.php:292
 * @route '/dashboard/projects/{project}/storage/{bucket}/files/{file}'
 */
destroyFile.delete = (args: { project: number | { id: number }, bucket: string | number, file: string | number } | [project: number | { id: number }, bucket: string | number, file: string | number ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroyFile.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\ProjectController::destroyFile
 * @see app/Http/Controllers/ProjectController.php:292
 * @route '/dashboard/projects/{project}/storage/{bucket}/files/{file}'
 */
    const destroyFileForm = (args: { project: number | { id: number }, bucket: string | number, file: string | number } | [project: number | { id: number }, bucket: string | number, file: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroyFile.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\ProjectController::destroyFile
 * @see app/Http/Controllers/ProjectController.php:292
 * @route '/dashboard/projects/{project}/storage/{bucket}/files/{file}'
 */
        destroyFileForm.delete = (args: { project: number | { id: number }, bucket: string | number, file: string | number } | [project: number | { id: number }, bucket: string | number, file: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroyFile.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroyFile.form = destroyFileForm
const ProjectController = { index, store, show, update, destroy, storage, storageBucket, storeBucket, destroyBucket, uploadFile, destroyFile }

export default ProjectController