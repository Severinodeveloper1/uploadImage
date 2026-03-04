import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\ProjectController::destroy
 * @see app/Http/Controllers/ProjectController.php:292
 * @route '/dashboard/projects/{project}/storage/{bucket}/files/{file}'
 */
export const destroy = (args: { project: string | number | { id: string | number }, bucket: string | number, file: string | number } | [project: string | number | { id: string | number }, bucket: string | number, file: string | number ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/dashboard/projects/{project}/storage/{bucket}/files/{file}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\ProjectController::destroy
 * @see app/Http/Controllers/ProjectController.php:292
 * @route '/dashboard/projects/{project}/storage/{bucket}/files/{file}'
 */
destroy.url = (args: { project: string | number | { id: string | number }, bucket: string | number, file: string | number } | [project: string | number | { id: string | number }, bucket: string | number, file: string | number ], options?: RouteQueryOptions) => {
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

    return destroy.definition.url
            .replace('{project}', parsedArgs.project.toString())
            .replace('{bucket}', parsedArgs.bucket.toString())
            .replace('{file}', parsedArgs.file.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectController::destroy
 * @see app/Http/Controllers/ProjectController.php:292
 * @route '/dashboard/projects/{project}/storage/{bucket}/files/{file}'
 */
destroy.delete = (args: { project: string | number | { id: string | number }, bucket: string | number, file: string | number } | [project: string | number | { id: string | number }, bucket: string | number, file: string | number ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\ProjectController::destroy
 * @see app/Http/Controllers/ProjectController.php:292
 * @route '/dashboard/projects/{project}/storage/{bucket}/files/{file}'
 */
    const destroyForm = (args: { project: string | number | { id: string | number }, bucket: string | number, file: string | number } | [project: string | number | { id: string | number }, bucket: string | number, file: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
 * @see app/Http/Controllers/ProjectController.php:292
 * @route '/dashboard/projects/{project}/storage/{bucket}/files/{file}'
 */
        destroyForm.delete = (args: { project: string | number | { id: string | number }, bucket: string | number, file: string | number } | [project: string | number | { id: string | number }, bucket: string | number, file: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const file = {
    destroy: Object.assign(destroy, destroy),
}

export default file