import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\SecureFileController::serve
 * @see app/Http/Controllers/SecureFileController.php:17
 * @route '/files/{file}'
 */
export const serve = (args: { file: string | number | { id: string | number } } | [file: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: serve.url(args, options),
    method: 'get',
})

serve.definition = {
    methods: ["get","head"],
    url: '/files/{file}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SecureFileController::serve
 * @see app/Http/Controllers/SecureFileController.php:17
 * @route '/files/{file}'
 */
serve.url = (args: { file: string | number | { id: string | number } } | [file: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { file: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { file: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    file: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        file: typeof args.file === 'object'
                ? args.file.id
                : args.file,
                }

    return serve.definition.url
            .replace('{file}', parsedArgs.file.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SecureFileController::serve
 * @see app/Http/Controllers/SecureFileController.php:17
 * @route '/files/{file}'
 */
serve.get = (args: { file: string | number | { id: string | number } } | [file: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: serve.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\SecureFileController::serve
 * @see app/Http/Controllers/SecureFileController.php:17
 * @route '/files/{file}'
 */
serve.head = (args: { file: string | number | { id: string | number } } | [file: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: serve.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\SecureFileController::serve
 * @see app/Http/Controllers/SecureFileController.php:17
 * @route '/files/{file}'
 */
    const serveForm = (args: { file: string | number | { id: string | number } } | [file: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: serve.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\SecureFileController::serve
 * @see app/Http/Controllers/SecureFileController.php:17
 * @route '/files/{file}'
 */
        serveForm.get = (args: { file: string | number | { id: string | number } } | [file: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: serve.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\SecureFileController::serve
 * @see app/Http/Controllers/SecureFileController.php:17
 * @route '/files/{file}'
 */
        serveForm.head = (args: { file: string | number | { id: string | number } } | [file: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: serve.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    serve.form = serveForm
const SecureFileController = { serve }

export default SecureFileController