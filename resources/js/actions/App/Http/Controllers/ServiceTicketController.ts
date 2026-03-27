import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\ServiceTicketController::index
 * @see app/Http/Controllers/ServiceTicketController.php:49
 * @route '/dashboard/tickets'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/dashboard/tickets',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ServiceTicketController::index
 * @see app/Http/Controllers/ServiceTicketController.php:49
 * @route '/dashboard/tickets'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ServiceTicketController::index
 * @see app/Http/Controllers/ServiceTicketController.php:49
 * @route '/dashboard/tickets'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ServiceTicketController::index
 * @see app/Http/Controllers/ServiceTicketController.php:49
 * @route '/dashboard/tickets'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ServiceTicketController::index
 * @see app/Http/Controllers/ServiceTicketController.php:49
 * @route '/dashboard/tickets'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ServiceTicketController::index
 * @see app/Http/Controllers/ServiceTicketController.php:49
 * @route '/dashboard/tickets'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ServiceTicketController::index
 * @see app/Http/Controllers/ServiceTicketController.php:49
 * @route '/dashboard/tickets'
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
* @see \App\Http\Controllers\ServiceTicketController::create
 * @see app/Http/Controllers/ServiceTicketController.php:66
 * @route '/dashboard/tickets/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/dashboard/tickets/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ServiceTicketController::create
 * @see app/Http/Controllers/ServiceTicketController.php:66
 * @route '/dashboard/tickets/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ServiceTicketController::create
 * @see app/Http/Controllers/ServiceTicketController.php:66
 * @route '/dashboard/tickets/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ServiceTicketController::create
 * @see app/Http/Controllers/ServiceTicketController.php:66
 * @route '/dashboard/tickets/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ServiceTicketController::create
 * @see app/Http/Controllers/ServiceTicketController.php:66
 * @route '/dashboard/tickets/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ServiceTicketController::create
 * @see app/Http/Controllers/ServiceTicketController.php:66
 * @route '/dashboard/tickets/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ServiceTicketController::create
 * @see app/Http/Controllers/ServiceTicketController.php:66
 * @route '/dashboard/tickets/create'
 */
        createForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    create.form = createForm
/**
* @see \App\Http\Controllers\ServiceTicketController::store
 * @see app/Http/Controllers/ServiceTicketController.php:75
 * @route '/dashboard/tickets'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/dashboard/tickets',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ServiceTicketController::store
 * @see app/Http/Controllers/ServiceTicketController.php:75
 * @route '/dashboard/tickets'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ServiceTicketController::store
 * @see app/Http/Controllers/ServiceTicketController.php:75
 * @route '/dashboard/tickets'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\ServiceTicketController::store
 * @see app/Http/Controllers/ServiceTicketController.php:75
 * @route '/dashboard/tickets'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\ServiceTicketController::store
 * @see app/Http/Controllers/ServiceTicketController.php:75
 * @route '/dashboard/tickets'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\ServiceTicketController::show
 * @see app/Http/Controllers/ServiceTicketController.php:94
 * @route '/dashboard/tickets/{ticket}'
 */
export const show = (args: { ticket: number | { id: number } } | [ticket: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/dashboard/tickets/{ticket}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ServiceTicketController::show
 * @see app/Http/Controllers/ServiceTicketController.php:94
 * @route '/dashboard/tickets/{ticket}'
 */
show.url = (args: { ticket: number | { id: number } } | [ticket: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return show.definition.url
            .replace('{ticket}', parsedArgs.ticket.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ServiceTicketController::show
 * @see app/Http/Controllers/ServiceTicketController.php:94
 * @route '/dashboard/tickets/{ticket}'
 */
show.get = (args: { ticket: number | { id: number } } | [ticket: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ServiceTicketController::show
 * @see app/Http/Controllers/ServiceTicketController.php:94
 * @route '/dashboard/tickets/{ticket}'
 */
show.head = (args: { ticket: number | { id: number } } | [ticket: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ServiceTicketController::show
 * @see app/Http/Controllers/ServiceTicketController.php:94
 * @route '/dashboard/tickets/{ticket}'
 */
    const showForm = (args: { ticket: number | { id: number } } | [ticket: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ServiceTicketController::show
 * @see app/Http/Controllers/ServiceTicketController.php:94
 * @route '/dashboard/tickets/{ticket}'
 */
        showForm.get = (args: { ticket: number | { id: number } } | [ticket: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ServiceTicketController::show
 * @see app/Http/Controllers/ServiceTicketController.php:94
 * @route '/dashboard/tickets/{ticket}'
 */
        showForm.head = (args: { ticket: number | { id: number } } | [ticket: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\ServiceTicketController::edit
 * @see app/Http/Controllers/ServiceTicketController.php:111
 * @route '/dashboard/tickets/{ticket}/edit'
 */
export const edit = (args: { ticket: number | { id: number } } | [ticket: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/dashboard/tickets/{ticket}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ServiceTicketController::edit
 * @see app/Http/Controllers/ServiceTicketController.php:111
 * @route '/dashboard/tickets/{ticket}/edit'
 */
edit.url = (args: { ticket: number | { id: number } } | [ticket: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return edit.definition.url
            .replace('{ticket}', parsedArgs.ticket.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ServiceTicketController::edit
 * @see app/Http/Controllers/ServiceTicketController.php:111
 * @route '/dashboard/tickets/{ticket}/edit'
 */
edit.get = (args: { ticket: number | { id: number } } | [ticket: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ServiceTicketController::edit
 * @see app/Http/Controllers/ServiceTicketController.php:111
 * @route '/dashboard/tickets/{ticket}/edit'
 */
edit.head = (args: { ticket: number | { id: number } } | [ticket: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ServiceTicketController::edit
 * @see app/Http/Controllers/ServiceTicketController.php:111
 * @route '/dashboard/tickets/{ticket}/edit'
 */
    const editForm = (args: { ticket: number | { id: number } } | [ticket: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ServiceTicketController::edit
 * @see app/Http/Controllers/ServiceTicketController.php:111
 * @route '/dashboard/tickets/{ticket}/edit'
 */
        editForm.get = (args: { ticket: number | { id: number } } | [ticket: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ServiceTicketController::edit
 * @see app/Http/Controllers/ServiceTicketController.php:111
 * @route '/dashboard/tickets/{ticket}/edit'
 */
        editForm.head = (args: { ticket: number | { id: number } } | [ticket: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    edit.form = editForm
/**
* @see \App\Http\Controllers\ServiceTicketController::update
 * @see app/Http/Controllers/ServiceTicketController.php:123
 * @route '/dashboard/tickets/{ticket}'
 */
export const update = (args: { ticket: number | { id: number } } | [ticket: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/dashboard/tickets/{ticket}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\ServiceTicketController::update
 * @see app/Http/Controllers/ServiceTicketController.php:123
 * @route '/dashboard/tickets/{ticket}'
 */
update.url = (args: { ticket: number | { id: number } } | [ticket: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return update.definition.url
            .replace('{ticket}', parsedArgs.ticket.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ServiceTicketController::update
 * @see app/Http/Controllers/ServiceTicketController.php:123
 * @route '/dashboard/tickets/{ticket}'
 */
update.put = (args: { ticket: number | { id: number } } | [ticket: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\ServiceTicketController::update
 * @see app/Http/Controllers/ServiceTicketController.php:123
 * @route '/dashboard/tickets/{ticket}'
 */
    const updateForm = (args: { ticket: number | { id: number } } | [ticket: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\ServiceTicketController::update
 * @see app/Http/Controllers/ServiceTicketController.php:123
 * @route '/dashboard/tickets/{ticket}'
 */
        updateForm.put = (args: { ticket: number | { id: number } } | [ticket: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\ServiceTicketController::destroy
 * @see app/Http/Controllers/ServiceTicketController.php:151
 * @route '/dashboard/tickets/{ticket}'
 */
export const destroy = (args: { ticket: number | { id: number } } | [ticket: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/dashboard/tickets/{ticket}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\ServiceTicketController::destroy
 * @see app/Http/Controllers/ServiceTicketController.php:151
 * @route '/dashboard/tickets/{ticket}'
 */
destroy.url = (args: { ticket: number | { id: number } } | [ticket: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return destroy.definition.url
            .replace('{ticket}', parsedArgs.ticket.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ServiceTicketController::destroy
 * @see app/Http/Controllers/ServiceTicketController.php:151
 * @route '/dashboard/tickets/{ticket}'
 */
destroy.delete = (args: { ticket: number | { id: number } } | [ticket: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\ServiceTicketController::destroy
 * @see app/Http/Controllers/ServiceTicketController.php:151
 * @route '/dashboard/tickets/{ticket}'
 */
    const destroyForm = (args: { ticket: number | { id: number } } | [ticket: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
 * @see app/Http/Controllers/ServiceTicketController.php:151
 * @route '/dashboard/tickets/{ticket}'
 */
        destroyForm.delete = (args: { ticket: number | { id: number } } | [ticket: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\ServiceTicketController::signReception
 * @see app/Http/Controllers/ServiceTicketController.php:163
 * @route '/dashboard/tickets/{ticket}/sign-reception'
 */
export const signReception = (args: { ticket: number | { id: number } } | [ticket: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: signReception.url(args, options),
    method: 'post',
})

signReception.definition = {
    methods: ["post"],
    url: '/dashboard/tickets/{ticket}/sign-reception',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ServiceTicketController::signReception
 * @see app/Http/Controllers/ServiceTicketController.php:163
 * @route '/dashboard/tickets/{ticket}/sign-reception'
 */
signReception.url = (args: { ticket: number | { id: number } } | [ticket: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return signReception.definition.url
            .replace('{ticket}', parsedArgs.ticket.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ServiceTicketController::signReception
 * @see app/Http/Controllers/ServiceTicketController.php:163
 * @route '/dashboard/tickets/{ticket}/sign-reception'
 */
signReception.post = (args: { ticket: number | { id: number } } | [ticket: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: signReception.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\ServiceTicketController::signReception
 * @see app/Http/Controllers/ServiceTicketController.php:163
 * @route '/dashboard/tickets/{ticket}/sign-reception'
 */
    const signReceptionForm = (args: { ticket: number | { id: number } } | [ticket: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: signReception.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\ServiceTicketController::signReception
 * @see app/Http/Controllers/ServiceTicketController.php:163
 * @route '/dashboard/tickets/{ticket}/sign-reception'
 */
        signReceptionForm.post = (args: { ticket: number | { id: number } } | [ticket: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: signReception.url(args, options),
            method: 'post',
        })
    
    signReception.form = signReceptionForm
/**
* @see \App\Http\Controllers\ServiceTicketController::approveRepair
 * @see app/Http/Controllers/ServiceTicketController.php:183
 * @route '/dashboard/tickets/{ticket}/approve-repair'
 */
export const approveRepair = (args: { ticket: number | { id: number } } | [ticket: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: approveRepair.url(args, options),
    method: 'post',
})

approveRepair.definition = {
    methods: ["post"],
    url: '/dashboard/tickets/{ticket}/approve-repair',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ServiceTicketController::approveRepair
 * @see app/Http/Controllers/ServiceTicketController.php:183
 * @route '/dashboard/tickets/{ticket}/approve-repair'
 */
approveRepair.url = (args: { ticket: number | { id: number } } | [ticket: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return approveRepair.definition.url
            .replace('{ticket}', parsedArgs.ticket.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ServiceTicketController::approveRepair
 * @see app/Http/Controllers/ServiceTicketController.php:183
 * @route '/dashboard/tickets/{ticket}/approve-repair'
 */
approveRepair.post = (args: { ticket: number | { id: number } } | [ticket: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: approveRepair.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\ServiceTicketController::approveRepair
 * @see app/Http/Controllers/ServiceTicketController.php:183
 * @route '/dashboard/tickets/{ticket}/approve-repair'
 */
    const approveRepairForm = (args: { ticket: number | { id: number } } | [ticket: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: approveRepair.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\ServiceTicketController::approveRepair
 * @see app/Http/Controllers/ServiceTicketController.php:183
 * @route '/dashboard/tickets/{ticket}/approve-repair'
 */
        approveRepairForm.post = (args: { ticket: number | { id: number } } | [ticket: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: approveRepair.url(args, options),
            method: 'post',
        })
    
    approveRepair.form = approveRepairForm
/**
* @see \App\Http\Controllers\ServiceTicketController::completeRepair
 * @see app/Http/Controllers/ServiceTicketController.php:216
 * @route '/dashboard/tickets/{ticket}/complete-repair'
 */
export const completeRepair = (args: { ticket: number | { id: number } } | [ticket: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: completeRepair.url(args, options),
    method: 'post',
})

completeRepair.definition = {
    methods: ["post"],
    url: '/dashboard/tickets/{ticket}/complete-repair',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ServiceTicketController::completeRepair
 * @see app/Http/Controllers/ServiceTicketController.php:216
 * @route '/dashboard/tickets/{ticket}/complete-repair'
 */
completeRepair.url = (args: { ticket: number | { id: number } } | [ticket: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return completeRepair.definition.url
            .replace('{ticket}', parsedArgs.ticket.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ServiceTicketController::completeRepair
 * @see app/Http/Controllers/ServiceTicketController.php:216
 * @route '/dashboard/tickets/{ticket}/complete-repair'
 */
completeRepair.post = (args: { ticket: number | { id: number } } | [ticket: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: completeRepair.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\ServiceTicketController::completeRepair
 * @see app/Http/Controllers/ServiceTicketController.php:216
 * @route '/dashboard/tickets/{ticket}/complete-repair'
 */
    const completeRepairForm = (args: { ticket: number | { id: number } } | [ticket: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: completeRepair.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\ServiceTicketController::completeRepair
 * @see app/Http/Controllers/ServiceTicketController.php:216
 * @route '/dashboard/tickets/{ticket}/complete-repair'
 */
        completeRepairForm.post = (args: { ticket: number | { id: number } } | [ticket: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: completeRepair.url(args, options),
            method: 'post',
        })
    
    completeRepair.form = completeRepairForm
/**
* @see \App\Http\Controllers\ServiceTicketController::signDelivery
 * @see app/Http/Controllers/ServiceTicketController.php:236
 * @route '/dashboard/tickets/{ticket}/sign-delivery'
 */
export const signDelivery = (args: { ticket: number | { id: number } } | [ticket: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: signDelivery.url(args, options),
    method: 'post',
})

signDelivery.definition = {
    methods: ["post"],
    url: '/dashboard/tickets/{ticket}/sign-delivery',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ServiceTicketController::signDelivery
 * @see app/Http/Controllers/ServiceTicketController.php:236
 * @route '/dashboard/tickets/{ticket}/sign-delivery'
 */
signDelivery.url = (args: { ticket: number | { id: number } } | [ticket: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return signDelivery.definition.url
            .replace('{ticket}', parsedArgs.ticket.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ServiceTicketController::signDelivery
 * @see app/Http/Controllers/ServiceTicketController.php:236
 * @route '/dashboard/tickets/{ticket}/sign-delivery'
 */
signDelivery.post = (args: { ticket: number | { id: number } } | [ticket: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: signDelivery.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\ServiceTicketController::signDelivery
 * @see app/Http/Controllers/ServiceTicketController.php:236
 * @route '/dashboard/tickets/{ticket}/sign-delivery'
 */
    const signDeliveryForm = (args: { ticket: number | { id: number } } | [ticket: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: signDelivery.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\ServiceTicketController::signDelivery
 * @see app/Http/Controllers/ServiceTicketController.php:236
 * @route '/dashboard/tickets/{ticket}/sign-delivery'
 */
        signDeliveryForm.post = (args: { ticket: number | { id: number } } | [ticket: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: signDelivery.url(args, options),
            method: 'post',
        })
    
    signDelivery.form = signDeliveryForm
/**
* @see \App\Http\Controllers\ServiceTicketController::uploadPhoto
 * @see app/Http/Controllers/ServiceTicketController.php:257
 * @route '/dashboard/tickets/{ticket}/photos'
 */
export const uploadPhoto = (args: { ticket: number | { id: number } } | [ticket: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: uploadPhoto.url(args, options),
    method: 'post',
})

uploadPhoto.definition = {
    methods: ["post"],
    url: '/dashboard/tickets/{ticket}/photos',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ServiceTicketController::uploadPhoto
 * @see app/Http/Controllers/ServiceTicketController.php:257
 * @route '/dashboard/tickets/{ticket}/photos'
 */
uploadPhoto.url = (args: { ticket: number | { id: number } } | [ticket: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return uploadPhoto.definition.url
            .replace('{ticket}', parsedArgs.ticket.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ServiceTicketController::uploadPhoto
 * @see app/Http/Controllers/ServiceTicketController.php:257
 * @route '/dashboard/tickets/{ticket}/photos'
 */
uploadPhoto.post = (args: { ticket: number | { id: number } } | [ticket: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: uploadPhoto.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\ServiceTicketController::uploadPhoto
 * @see app/Http/Controllers/ServiceTicketController.php:257
 * @route '/dashboard/tickets/{ticket}/photos'
 */
    const uploadPhotoForm = (args: { ticket: number | { id: number } } | [ticket: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: uploadPhoto.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\ServiceTicketController::uploadPhoto
 * @see app/Http/Controllers/ServiceTicketController.php:257
 * @route '/dashboard/tickets/{ticket}/photos'
 */
        uploadPhotoForm.post = (args: { ticket: number | { id: number } } | [ticket: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: uploadPhoto.url(args, options),
            method: 'post',
        })
    
    uploadPhoto.form = uploadPhotoForm
/**
* @see \App\Http\Controllers\ServiceTicketController::deletePhoto
 * @see app/Http/Controllers/ServiceTicketController.php:293
 * @route '/dashboard/tickets/{ticket}/photos/{photo}'
 */
export const deletePhoto = (args: { ticket: number | { id: number }, photo: string | number } | [ticket: number | { id: number }, photo: string | number ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: deletePhoto.url(args, options),
    method: 'delete',
})

deletePhoto.definition = {
    methods: ["delete"],
    url: '/dashboard/tickets/{ticket}/photos/{photo}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\ServiceTicketController::deletePhoto
 * @see app/Http/Controllers/ServiceTicketController.php:293
 * @route '/dashboard/tickets/{ticket}/photos/{photo}'
 */
deletePhoto.url = (args: { ticket: number | { id: number }, photo: string | number } | [ticket: number | { id: number }, photo: string | number ], options?: RouteQueryOptions) => {
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

    return deletePhoto.definition.url
            .replace('{ticket}', parsedArgs.ticket.toString())
            .replace('{photo}', parsedArgs.photo.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ServiceTicketController::deletePhoto
 * @see app/Http/Controllers/ServiceTicketController.php:293
 * @route '/dashboard/tickets/{ticket}/photos/{photo}'
 */
deletePhoto.delete = (args: { ticket: number | { id: number }, photo: string | number } | [ticket: number | { id: number }, photo: string | number ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: deletePhoto.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\ServiceTicketController::deletePhoto
 * @see app/Http/Controllers/ServiceTicketController.php:293
 * @route '/dashboard/tickets/{ticket}/photos/{photo}'
 */
    const deletePhotoForm = (args: { ticket: number | { id: number }, photo: string | number } | [ticket: number | { id: number }, photo: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: deletePhoto.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\ServiceTicketController::deletePhoto
 * @see app/Http/Controllers/ServiceTicketController.php:293
 * @route '/dashboard/tickets/{ticket}/photos/{photo}'
 */
        deletePhotoForm.delete = (args: { ticket: number | { id: number }, photo: string | number } | [ticket: number | { id: number }, photo: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: deletePhoto.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    deletePhoto.form = deletePhotoForm
/**
* @see \App\Http\Controllers\ServiceTicketController::generateReport
 * @see app/Http/Controllers/ServiceTicketController.php:310
 * @route '/dashboard/tickets/{ticket}/report'
 */
export const generateReport = (args: { ticket: number | { id: number } } | [ticket: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: generateReport.url(args, options),
    method: 'get',
})

generateReport.definition = {
    methods: ["get","head"],
    url: '/dashboard/tickets/{ticket}/report',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ServiceTicketController::generateReport
 * @see app/Http/Controllers/ServiceTicketController.php:310
 * @route '/dashboard/tickets/{ticket}/report'
 */
generateReport.url = (args: { ticket: number | { id: number } } | [ticket: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return generateReport.definition.url
            .replace('{ticket}', parsedArgs.ticket.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ServiceTicketController::generateReport
 * @see app/Http/Controllers/ServiceTicketController.php:310
 * @route '/dashboard/tickets/{ticket}/report'
 */
generateReport.get = (args: { ticket: number | { id: number } } | [ticket: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: generateReport.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ServiceTicketController::generateReport
 * @see app/Http/Controllers/ServiceTicketController.php:310
 * @route '/dashboard/tickets/{ticket}/report'
 */
generateReport.head = (args: { ticket: number | { id: number } } | [ticket: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: generateReport.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ServiceTicketController::generateReport
 * @see app/Http/Controllers/ServiceTicketController.php:310
 * @route '/dashboard/tickets/{ticket}/report'
 */
    const generateReportForm = (args: { ticket: number | { id: number } } | [ticket: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: generateReport.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ServiceTicketController::generateReport
 * @see app/Http/Controllers/ServiceTicketController.php:310
 * @route '/dashboard/tickets/{ticket}/report'
 */
        generateReportForm.get = (args: { ticket: number | { id: number } } | [ticket: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: generateReport.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ServiceTicketController::generateReport
 * @see app/Http/Controllers/ServiceTicketController.php:310
 * @route '/dashboard/tickets/{ticket}/report'
 */
        generateReportForm.head = (args: { ticket: number | { id: number } } | [ticket: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: generateReport.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    generateReport.form = generateReportForm
const ServiceTicketController = { index, create, store, show, edit, update, destroy, signReception, approveRepair, completeRepair, signDelivery, uploadPhoto, deletePhoto, generateReport }

export default ServiceTicketController