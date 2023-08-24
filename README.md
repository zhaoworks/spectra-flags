### Spectra

A simple feature flags library for your application.

#### Install

```
$ yarn add spectra-flags
```

#### Usage

```ts
// You can just import, initialize an instance.
import spectra from 'spectra-flags'

const flags = spectra({
    flags: { create_account: true, create_room: false } 
})

export default flags
```

In a real-word example:

```ts
import express from 'express'
import flags from './flags'

const application = express()

application.post('/create-account', (request, response) => {
    // When `create_account` flag is disabled, the code below is triggered.
    if (!flags.enabled('create_account')) {
        return response.status(500).json({ success: false, error: "Account creation is disabled." }) 
    }

    // ...
})
```

### Actor Checkers

Spectra works well with [`bitbouncer`](https://github.com/zhaoworks/bitbouncer), which is a library for handling bitflags.

```
$ yarn add bitbouncer
```

```ts
import spectra, { SpectraIntegrations } from 'spectra-flags'
import bitbouncer from 'bitbouncer'

const PERMISSIONS = { 
    create_account: true,
    create_room: false
}

export const bouncer = bitbouncer.from(PERMISSIONS)

export const flags = spectra({
    actors: new SpectraIntegrations.BitBouncer(bouncer)
    flags: PERMISSIONS
})

export default flags
```

```ts
import { User } from './models'

import express from 'express'
import flags from './flags'

const application = express()

application.post('/create-room', async (request, response) => {
    const user = await User.byId(request.user_id)

    // When `create_room` is disabled or actor does not have permission to `create_room` 
    if (!flags.enabled('create_room', { actor: { flags: user.flags } })) {
        return response.status(500).json({ success: false, error: "You're unable to create rooms." }) 
    }

    // ...
})
```

##### License

> Both [`spectra-flags`](/LICENSE) and [`bitbouncer`](https://github.com/zhaoworks/bitbouncer/blob/main/LICENSE) licensed under [MIT](/LICENSE) &copy; [@sxhk0](https://github.com/sxhk0/)
