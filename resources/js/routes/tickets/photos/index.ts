import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\ServiceTicketController::upload
 * @see app/Http/Controllers/ServiceTicketController.php:257
 * @route '/dashboard/tickets/{ticket}/photos'
 */
export const upload = (args: { ticket: number | { id: number } } | [ticket: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: upload.url(args, options),
    method: 'post',
})

upload.definition = {
    methods: ["post"],
    url: '/dashboard/tickets/{ticket}/photos',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ServiceTicketController::upload
 * @see app/Http/Controllers/ServiceTicketController.php:257
 * @route '/dashboard/tickets/{ticket}/photos'
 */
upload.url = (args: { ticket: number | { id: number } } | [ticket: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { ticket: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { ticket: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    ticket: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        ticket: typeof args.ticket === 'object'
                ? args.ticket.id
                : args.ticket,
                }

    return upload.definition.url
            .replace('{ticket}', parsedArgs.ticket.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ServiceTicketController::upload
 * @see app/Http/Controllers/ServiceTicketController.php:257
 * @route '/dashboard/tickets/{ticket}/photos'
 */
upload.post = (args: { ticket: number | { id: number } } | [ticket: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: upload.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\ServiceTicketController::upload
 * @see app/Http/Controllers/ServiceTicketController.php:257
 * @route '/dashboard/tickets/{ticket}/photos'
 */
    const uploadForm = (args: { ticket: number | { id: number } } | [ticket: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: upload.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\ServiceTicketController::upload
 * @see app/Http/Controllers/ServiceTicketController.php:257
 * @route '/dashboard/tickets/{ticket}/photos'
 */
        uploadForm.post = (args: { ticket: number | { id: number } } | [ticket: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: upload.url(args, options),
            method: 'post',
        })
    
    upload.form = uploadForm
/**
* @see \App\Http\Controllers\ServiceTicketController::destroy
 * @see app/Http/Controllers/ServiceTicketController.php:293
 * @route '/dashboard/tickets/{ticket}/photos/{photo}'
 */
export const destroy = (args: { ticket: number | { id: number }, photo: string | number } | [ticket: number | { id: number }, photo: string | number ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/dashboard/tickets/{ticket}/photos/{photo}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\ServiceTicketController::destroy
 * @see app/Http/Controllers/ServiceTicketController.php:293
 * @route '/dashboard/tickets/{ticket}/photos/{photo}'
 */
destroy.url = (args: { ticket: number | { id: number }, photo: string | number } | [ticket: number | { id: number }, photo: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    ticket: args[0],
                    photo: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        ticket: typeof args.ticket === 'object'
                ? args.ticket.id
                : args.ticket,
                                photo: args.photo,
                }

    return destroy.definition.url
            .replace('{ticket}', parsedArgs.ticket.toString())
            .replace('{photo}', parsedArgs.photo.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ServiceTicketController::destroy
 * @see app/Http/Controllers/ServiceTicketController.php:293
 * @route '/dashboard/tickets/{ticket}/photos/{photo}'
 */
destroy.delete = (args: { ticket: number | { id: number }, photo: string | number } | [ticket: number | { id: number }, photo: string | number ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\ServiceTicketController::destroy
 * @see app/Http/Controllers/ServiceTicketController.php:293
 * @route '/dashboard/tickets/{ticket}/photos/{photo}'
 */
    const destroyForm = (args: { ticket: number | { id: number }, photo: string | number } | [ticket: number | { id: number }, photo: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\ServiceTicketController::destroy
 * @see app/Http/Controllers/ServiceTicketController.php:293
 * @route '/dashboard/tickets/{ticket}/photos/{photo}'
 */
        destroyForm.delete = (args: { ticket: number | { id: number }, photo: string | number } | [ticket: number | { id: number }, photo: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const photos = {
    upload: Object.assign(upload, upload),
destroy: Object.assign(destroy, destroy),
}

export default photos