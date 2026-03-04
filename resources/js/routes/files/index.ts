import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\SecureFileController::secure
 * @see app/Http/Controllers/SecureFileController.php:17
 * @route '/files/{file}'
 */
export const secure = (args: { file: string | number | { id: string | number } } | [file: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: secure.url(args, options),
    method: 'get',
})

secure.definition = {
    methods: ["get","head"],
    url: '/files/{file}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SecureFileController::secure
 * @see app/Http/Controllers/SecureFileController.php:17
 * @route '/files/{file}'
 */
secure.url = (args: { file: string | number | { id: string | number } } | [file: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
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

    return secure.definition.url
            .replace('{file}', parsedArgs.file.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SecureFileController::secure
 * @see app/Http/Controllers/SecureFileController.php:17
 * @route '/files/{file}'
 */
secure.get = (args: { file: string | number | { id: string | number } } | [file: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: secure.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\SecureFileController::secure
 * @see app/Http/Controllers/SecureFileController.php:17
 * @route '/files/{file}'
 */
secure.head = (args: { file: string | number | { id: string | number } } | [file: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: secure.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\SecureFileController::secure
 * @see app/Http/Controllers/SecureFileController.php:17
 * @route '/files/{file}'
 */
    const secureForm = (args: { file: string | number | { id: string | number } } | [file: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: secure.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\SecureFileController::secure
 * @see app/Http/Controllers/SecureFileController.php:17
 * @route '/files/{file}'
 */
        secureForm.get = (args: { file: string | number | { id: string | number } } | [file: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: secure.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\SecureFileController::secure
 * @see app/Http/Controllers/SecureFileController.php:17
 * @route '/files/{file}'
 */
        secureForm.head = (args: { file: string | number | { id: string | number } } | [file: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: secure.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    secure.form = secureForm
const files = {
    secure: Object.assign(secure, secure),
}

export default files