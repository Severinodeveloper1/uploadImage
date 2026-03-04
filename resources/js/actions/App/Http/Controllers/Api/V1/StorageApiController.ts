import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\V1\StorageApiController::projectInfo
 * @see app/Http/Controllers/Api/V1/StorageApiController.php:238
 * @route '/api/v1/project'
 */
export const projectInfo = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: projectInfo.url(options),
    method: 'get',
})

projectInfo.definition = {
    methods: ["get","head"],
    url: '/api/v1/project',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\V1\StorageApiController::projectInfo
 * @see app/Http/Controllers/Api/V1/StorageApiController.php:238
 * @route '/api/v1/project'
 */
projectInfo.url = (options?: RouteQueryOptions) => {
    return projectInfo.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\StorageApiController::projectInfo
 * @see app/Http/Controllers/Api/V1/StorageApiController.php:238
 * @route '/api/v1/project'
 */
projectInfo.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: projectInfo.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\V1\StorageApiController::projectInfo
 * @see app/Http/Controllers/Api/V1/StorageApiController.php:238
 * @route '/api/v1/project'
 */
projectInfo.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: projectInfo.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\V1\StorageApiController::projectInfo
 * @see app/Http/Controllers/Api/V1/StorageApiController.php:238
 * @route '/api/v1/project'
 */
    const projectInfoForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: projectInfo.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\V1\StorageApiController::projectInfo
 * @see app/Http/Controllers/Api/V1/StorageApiController.php:238
 * @route '/api/v1/project'
 */
        projectInfoForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: projectInfo.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\V1\StorageApiController::projectInfo
 * @see app/Http/Controllers/Api/V1/StorageApiController.php:238
 * @route '/api/v1/project'
 */
        projectInfoForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: projectInfo.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    projectInfo.form = projectInfoForm
/**
* @see \App\Http\Controllers\Api\V1\StorageApiController::upload
 * @see app/Http/Controllers/Api/V1/StorageApiController.php:21
 * @route '/api/v1/buckets/{bucket}/upload'
 */
export const upload = (args: { bucket: string | number } | [bucket: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: upload.url(args, options),
    method: 'post',
})

upload.definition = {
    methods: ["post"],
    url: '/api/v1/buckets/{bucket}/upload',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\V1\StorageApiController::upload
 * @see app/Http/Controllers/Api/V1/StorageApiController.php:21
 * @route '/api/v1/buckets/{bucket}/upload'
 */
upload.url = (args: { bucket: string | number } | [bucket: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { bucket: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    bucket: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        bucket: args.bucket,
                }

    return upload.definition.url
            .replace('{bucket}', parsedArgs.bucket.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\StorageApiController::upload
 * @see app/Http/Controllers/Api/V1/StorageApiController.php:21
 * @route '/api/v1/buckets/{bucket}/upload'
 */
upload.post = (args: { bucket: string | number } | [bucket: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: upload.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Api\V1\StorageApiController::upload
 * @see app/Http/Controllers/Api/V1/StorageApiController.php:21
 * @route '/api/v1/buckets/{bucket}/upload'
 */
    const uploadForm = (args: { bucket: string | number } | [bucket: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: upload.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\V1\StorageApiController::upload
 * @see app/Http/Controllers/Api/V1/StorageApiController.php:21
 * @route '/api/v1/buckets/{bucket}/upload'
 */
        uploadForm.post = (args: { bucket: string | number } | [bucket: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: upload.url(args, options),
            method: 'post',
        })
    
    upload.form = uploadForm
/**
* @see \App\Http\Controllers\Api\V1\StorageApiController::index
 * @see app/Http/Controllers/Api/V1/StorageApiController.php:102
 * @route '/api/v1/buckets/{bucket}/files'
 */
export const index = (args: { bucket: string | number } | [bucket: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/v1/buckets/{bucket}/files',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\V1\StorageApiController::index
 * @see app/Http/Controllers/Api/V1/StorageApiController.php:102
 * @route '/api/v1/buckets/{bucket}/files'
 */
index.url = (args: { bucket: string | number } | [bucket: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { bucket: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    bucket: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        bucket: args.bucket,
                }

    return index.definition.url
            .replace('{bucket}', parsedArgs.bucket.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\StorageApiController::index
 * @see app/Http/Controllers/Api/V1/StorageApiController.php:102
 * @route '/api/v1/buckets/{bucket}/files'
 */
index.get = (args: { bucket: string | number } | [bucket: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\V1\StorageApiController::index
 * @see app/Http/Controllers/Api/V1/StorageApiController.php:102
 * @route '/api/v1/buckets/{bucket}/files'
 */
index.head = (args: { bucket: string | number } | [bucket: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\V1\StorageApiController::index
 * @see app/Http/Controllers/Api/V1/StorageApiController.php:102
 * @route '/api/v1/buckets/{bucket}/files'
 */
    const indexForm = (args: { bucket: string | number } | [bucket: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\V1\StorageApiController::index
 * @see app/Http/Controllers/Api/V1/StorageApiController.php:102
 * @route '/api/v1/buckets/{bucket}/files'
 */
        indexForm.get = (args: { bucket: string | number } | [bucket: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\V1\StorageApiController::index
 * @see app/Http/Controllers/Api/V1/StorageApiController.php:102
 * @route '/api/v1/buckets/{bucket}/files'
 */
        indexForm.head = (args: { bucket: string | number } | [bucket: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Api\V1\StorageApiController::show
 * @see app/Http/Controllers/Api/V1/StorageApiController.php:146
 * @route '/api/v1/buckets/{bucket}/files/{id}'
 */
export const show = (args: { bucket: string | number, id: string | number } | [bucket: string | number, id: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/api/v1/buckets/{bucket}/files/{id}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\V1\StorageApiController::show
 * @see app/Http/Controllers/Api/V1/StorageApiController.php:146
 * @route '/api/v1/buckets/{bucket}/files/{id}'
 */
show.url = (args: { bucket: string | number, id: string | number } | [bucket: string | number, id: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    bucket: args[0],
                    id: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        bucket: args.bucket,
                                id: args.id,
                }

    return show.definition.url
            .replace('{bucket}', parsedArgs.bucket.toString())
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\StorageApiController::show
 * @see app/Http/Controllers/Api/V1/StorageApiController.php:146
 * @route '/api/v1/buckets/{bucket}/files/{id}'
 */
show.get = (args: { bucket: string | number, id: string | number } | [bucket: string | number, id: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\V1\StorageApiController::show
 * @see app/Http/Controllers/Api/V1/StorageApiController.php:146
 * @route '/api/v1/buckets/{bucket}/files/{id}'
 */
show.head = (args: { bucket: string | number, id: string | number } | [bucket: string | number, id: string | number ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\V1\StorageApiController::show
 * @see app/Http/Controllers/Api/V1/StorageApiController.php:146
 * @route '/api/v1/buckets/{bucket}/files/{id}'
 */
    const showForm = (args: { bucket: string | number, id: string | number } | [bucket: string | number, id: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\V1\StorageApiController::show
 * @see app/Http/Controllers/Api/V1/StorageApiController.php:146
 * @route '/api/v1/buckets/{bucket}/files/{id}'
 */
        showForm.get = (args: { bucket: string | number, id: string | number } | [bucket: string | number, id: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\V1\StorageApiController::show
 * @see app/Http/Controllers/Api/V1/StorageApiController.php:146
 * @route '/api/v1/buckets/{bucket}/files/{id}'
 */
        showForm.head = (args: { bucket: string | number, id: string | number } | [bucket: string | number, id: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Api\V1\StorageApiController::destroy
 * @see app/Http/Controllers/Api/V1/StorageApiController.php:179
 * @route '/api/v1/buckets/{bucket}/files/{id}'
 */
export const destroy = (args: { bucket: string | number, id: string | number } | [bucket: string | number, id: string | number ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/v1/buckets/{bucket}/files/{id}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Api\V1\StorageApiController::destroy
 * @see app/Http/Controllers/Api/V1/StorageApiController.php:179
 * @route '/api/v1/buckets/{bucket}/files/{id}'
 */
destroy.url = (args: { bucket: string | number, id: string | number } | [bucket: string | number, id: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    bucket: args[0],
                    id: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        bucket: args.bucket,
                                id: args.id,
                }

    return destroy.definition.url
            .replace('{bucket}', parsedArgs.bucket.toString())
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\StorageApiController::destroy
 * @see app/Http/Controllers/Api/V1/StorageApiController.php:179
 * @route '/api/v1/buckets/{bucket}/files/{id}'
 */
destroy.delete = (args: { bucket: string | number, id: string | number } | [bucket: string | number, id: string | number ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Api\V1\StorageApiController::destroy
 * @see app/Http/Controllers/Api/V1/StorageApiController.php:179
 * @route '/api/v1/buckets/{bucket}/files/{id}'
 */
    const destroyForm = (args: { bucket: string | number, id: string | number } | [bucket: string | number, id: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\V1\StorageApiController::destroy
 * @see app/Http/Controllers/Api/V1/StorageApiController.php:179
 * @route '/api/v1/buckets/{bucket}/files/{id}'
 */
        destroyForm.delete = (args: { bucket: string | number, id: string | number } | [bucket: string | number, id: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Api\V1\StorageApiController::folders
 * @see app/Http/Controllers/Api/V1/StorageApiController.php:214
 * @route '/api/v1/buckets/{bucket}/folders'
 */
export const folders = (args: { bucket: string | number } | [bucket: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: folders.url(args, options),
    method: 'get',
})

folders.definition = {
    methods: ["get","head"],
    url: '/api/v1/buckets/{bucket}/folders',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\V1\StorageApiController::folders
 * @see app/Http/Controllers/Api/V1/StorageApiController.php:214
 * @route '/api/v1/buckets/{bucket}/folders'
 */
folders.url = (args: { bucket: string | number } | [bucket: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { bucket: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    bucket: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        bucket: args.bucket,
                }

    return folders.definition.url
            .replace('{bucket}', parsedArgs.bucket.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\StorageApiController::folders
 * @see app/Http/Controllers/Api/V1/StorageApiController.php:214
 * @route '/api/v1/buckets/{bucket}/folders'
 */
folders.get = (args: { bucket: string | number } | [bucket: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: folders.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\V1\StorageApiController::folders
 * @see app/Http/Controllers/Api/V1/StorageApiController.php:214
 * @route '/api/v1/buckets/{bucket}/folders'
 */
folders.head = (args: { bucket: string | number } | [bucket: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: folders.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\V1\StorageApiController::folders
 * @see app/Http/Controllers/Api/V1/StorageApiController.php:214
 * @route '/api/v1/buckets/{bucket}/folders'
 */
    const foldersForm = (args: { bucket: string | number } | [bucket: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: folders.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\V1\StorageApiController::folders
 * @see app/Http/Controllers/Api/V1/StorageApiController.php:214
 * @route '/api/v1/buckets/{bucket}/folders'
 */
        foldersForm.get = (args: { bucket: string | number } | [bucket: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: folders.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\V1\StorageApiController::folders
 * @see app/Http/Controllers/Api/V1/StorageApiController.php:214
 * @route '/api/v1/buckets/{bucket}/folders'
 */
        foldersForm.head = (args: { bucket: string | number } | [bucket: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: folders.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    folders.form = foldersForm
const StorageApiController = { projectInfo, upload, index, show, destroy, folders }

export default StorageApiController