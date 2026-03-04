import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
import file from './file'
/**
* @see \App\Http\Controllers\ProjectController::bucket
 * @see app/Http/Controllers/ProjectController.php:165
 * @route '/dashboard/projects/{project}/storage/{bucket}'
 */
export const bucket = (args: { project: number | { id: number }, bucket: string | number } | [project: number | { id: number }, bucket: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: bucket.url(args, options),
    method: 'get',
})

bucket.definition = {
    methods: ["get","head"],
    url: '/dashboard/projects/{project}/storage/{bucket}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ProjectController::bucket
 * @see app/Http/Controllers/ProjectController.php:165
 * @route '/dashboard/projects/{project}/storage/{bucket}'
 */
bucket.url = (args: { project: number | { id: number }, bucket: string | number } | [project: number | { id: number }, bucket: string | number ], options?: RouteQueryOptions) => {
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

    return bucket.definition.url
            .replace('{project}', parsedArgs.project.toString())
            .replace('{bucket}', parsedArgs.bucket.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectController::bucket
 * @see app/Http/Controllers/ProjectController.php:165
 * @route '/dashboard/projects/{project}/storage/{bucket}'
 */
bucket.get = (args: { project: number | { id: number }, bucket: string | number } | [project: number | { id: number }, bucket: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: bucket.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ProjectController::bucket
 * @see app/Http/Controllers/ProjectController.php:165
 * @route '/dashboard/projects/{project}/storage/{bucket}'
 */
bucket.head = (args: { project: number | { id: number }, bucket: string | number } | [project: number | { id: number }, bucket: string | number ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: bucket.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ProjectController::bucket
 * @see app/Http/Controllers/ProjectController.php:165
 * @route '/dashboard/projects/{project}/storage/{bucket}'
 */
    const bucketForm = (args: { project: number | { id: number }, bucket: string | number } | [project: number | { id: number }, bucket: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: bucket.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ProjectController::bucket
 * @see app/Http/Controllers/ProjectController.php:165
 * @route '/dashboard/projects/{project}/storage/{bucket}'
 */
        bucketForm.get = (args: { project: number | { id: number }, bucket: string | number } | [project: number | { id: number }, bucket: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: bucket.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ProjectController::bucket
 * @see app/Http/Controllers/ProjectController.php:165
 * @route '/dashboard/projects/{project}/storage/{bucket}'
 */
        bucketForm.head = (args: { project: number | { id: number }, bucket: string | number } | [project: number | { id: number }, bucket: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: bucket.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    bucket.form = bucketForm
/**
* @see \App\Http\Controllers\ProjectController::upload
 * @see app/Http/Controllers/ProjectController.php:258
 * @route '/dashboard/projects/{project}/storage/{bucket}/upload'
 */
export const upload = (args: { project: number | { id: number }, bucket: string | number } | [project: number | { id: number }, bucket: string | number ], options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: upload.url(args, options),
    method: 'post',
})

upload.definition = {
    methods: ["post"],
    url: '/dashboard/projects/{project}/storage/{bucket}/upload',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ProjectController::upload
 * @see app/Http/Controllers/ProjectController.php:258
 * @route '/dashboard/projects/{project}/storage/{bucket}/upload'
 */
upload.url = (args: { project: number | { id: number }, bucket: string | number } | [project: number | { id: number }, bucket: string | number ], options?: RouteQueryOptions) => {
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

    return upload.definition.url
            .replace('{project}', parsedArgs.project.toString())
            .replace('{bucket}', parsedArgs.bucket.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectController::upload
 * @see app/Http/Controllers/ProjectController.php:258
 * @route '/dashboard/projects/{project}/storage/{bucket}/upload'
 */
upload.post = (args: { project: number | { id: number }, bucket: string | number } | [project: number | { id: number }, bucket: string | number ], options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: upload.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\ProjectController::upload
 * @see app/Http/Controllers/ProjectController.php:258
 * @route '/dashboard/projects/{project}/storage/{bucket}/upload'
 */
    const uploadForm = (args: { project: number | { id: number }, bucket: string | number } | [project: number | { id: number }, bucket: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: upload.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\ProjectController::upload
 * @see app/Http/Controllers/ProjectController.php:258
 * @route '/dashboard/projects/{project}/storage/{bucket}/upload'
 */
        uploadForm.post = (args: { project: number | { id: number }, bucket: string | number } | [project: number | { id: number }, bucket: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: upload.url(args, options),
            method: 'post',
        })
    
    upload.form = uploadForm
const storage = {
    bucket: Object.assign(bucket, bucket),
upload: Object.assign(upload, upload),
file: Object.assign(file, file),
}

export default storage