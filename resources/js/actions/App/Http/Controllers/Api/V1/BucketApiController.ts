import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\V1\BucketApiController::index
 * @see app/Http/Controllers/Api/V1/BucketApiController.php:21
 * @route '/api/v1/buckets'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/v1/buckets',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\V1\BucketApiController::index
 * @see app/Http/Controllers/Api/V1/BucketApiController.php:21
 * @route '/api/v1/buckets'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\BucketApiController::index
 * @see app/Http/Controllers/Api/V1/BucketApiController.php:21
 * @route '/api/v1/buckets'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\V1\BucketApiController::index
 * @see app/Http/Controllers/Api/V1/BucketApiController.php:21
 * @route '/api/v1/buckets'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\V1\BucketApiController::index
 * @see app/Http/Controllers/Api/V1/BucketApiController.php:21
 * @route '/api/v1/buckets'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\V1\BucketApiController::index
 * @see app/Http/Controllers/Api/V1/BucketApiController.php:21
 * @route '/api/v1/buckets'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\V1\BucketApiController::index
 * @see app/Http/Controllers/Api/V1/BucketApiController.php:21
 * @route '/api/v1/buckets'
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
* @see \App\Http\Controllers\Api\V1\BucketApiController::store
 * @see app/Http/Controllers/Api/V1/BucketApiController.php:41
 * @route '/api/v1/buckets'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/v1/buckets',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\V1\BucketApiController::store
 * @see app/Http/Controllers/Api/V1/BucketApiController.php:41
 * @route '/api/v1/buckets'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\BucketApiController::store
 * @see app/Http/Controllers/Api/V1/BucketApiController.php:41
 * @route '/api/v1/buckets'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Api\V1\BucketApiController::store
 * @see app/Http/Controllers/Api/V1/BucketApiController.php:41
 * @route '/api/v1/buckets'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\V1\BucketApiController::store
 * @see app/Http/Controllers/Api/V1/BucketApiController.php:41
 * @route '/api/v1/buckets'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Api\V1\BucketApiController::show
 * @see app/Http/Controllers/Api/V1/BucketApiController.php:86
 * @route '/api/v1/buckets/{bucket}'
 */
export const show = (args: { bucket: string | number } | [bucket: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/api/v1/buckets/{bucket}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\V1\BucketApiController::show
 * @see app/Http/Controllers/Api/V1/BucketApiController.php:86
 * @route '/api/v1/buckets/{bucket}'
 */
show.url = (args: { bucket: string | number } | [bucket: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return show.definition.url
            .replace('{bucket}', parsedArgs.bucket.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\BucketApiController::show
 * @see app/Http/Controllers/Api/V1/BucketApiController.php:86
 * @route '/api/v1/buckets/{bucket}'
 */
show.get = (args: { bucket: string | number } | [bucket: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\V1\BucketApiController::show
 * @see app/Http/Controllers/Api/V1/BucketApiController.php:86
 * @route '/api/v1/buckets/{bucket}'
 */
show.head = (args: { bucket: string | number } | [bucket: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\V1\BucketApiController::show
 * @see app/Http/Controllers/Api/V1/BucketApiController.php:86
 * @route '/api/v1/buckets/{bucket}'
 */
    const showForm = (args: { bucket: string | number } | [bucket: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\V1\BucketApiController::show
 * @see app/Http/Controllers/Api/V1/BucketApiController.php:86
 * @route '/api/v1/buckets/{bucket}'
 */
        showForm.get = (args: { bucket: string | number } | [bucket: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\V1\BucketApiController::show
 * @see app/Http/Controllers/Api/V1/BucketApiController.php:86
 * @route '/api/v1/buckets/{bucket}'
 */
        showForm.head = (args: { bucket: string | number } | [bucket: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Api\V1\BucketApiController::destroy
 * @see app/Http/Controllers/Api/V1/BucketApiController.php:113
 * @route '/api/v1/buckets/{bucket}'
 */
export const destroy = (args: { bucket: string | number } | [bucket: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/v1/buckets/{bucket}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Api\V1\BucketApiController::destroy
 * @see app/Http/Controllers/Api/V1/BucketApiController.php:113
 * @route '/api/v1/buckets/{bucket}'
 */
destroy.url = (args: { bucket: string | number } | [bucket: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return destroy.definition.url
            .replace('{bucket}', parsedArgs.bucket.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\BucketApiController::destroy
 * @see app/Http/Controllers/Api/V1/BucketApiController.php:113
 * @route '/api/v1/buckets/{bucket}'
 */
destroy.delete = (args: { bucket: string | number } | [bucket: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Api\V1\BucketApiController::destroy
 * @see app/Http/Controllers/Api/V1/BucketApiController.php:113
 * @route '/api/v1/buckets/{bucket}'
 */
    const destroyForm = (args: { bucket: string | number } | [bucket: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\V1\BucketApiController::destroy
 * @see app/Http/Controllers/Api/V1/BucketApiController.php:113
 * @route '/api/v1/buckets/{bucket}'
 */
        destroyForm.delete = (args: { bucket: string | number } | [bucket: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const BucketApiController = { index, store, show, destroy }

export default BucketApiController