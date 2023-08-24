import { SpectraActorChecker } from "./integrations/spectra-actor-checker"

export * as SpectraIntegrations from './integrations/index'

export type Flag = string | number | symbol
export type OverrideFn<Actor> = { actor: Actor } | ((flag?: Flag) => boolean)

/**
 * The options for spectra.
 */
export interface SpectraOptions<Actor extends unknown, Flags extends Record<Flag, boolean>> {
    /**
     * Actor checker for Spectra.
     */
    actors?: SpectraActorChecker<Actor>

    /**
     * The flag list.
     */
    flags: Flags
}

/**
 * The feature flag library.
 */
export class SpectraFlags<Actor, Flags extends Record<string, boolean>> {

    /**
     * The adapter that handles actor-based feature flag.
     */
    protected actors?: SpectraActorChecker<Actor>

    /**
     * The property that holds all flags.
     */
    protected flags: Flags

    /**
     * Initializes a instance of Spectra.
     */
    public constructor(options: SpectraOptions<Actor, Flags>) {
        this.actors = options.actors
        this.flags = options.flags
    }

    /**
     * Initializes a flag.
     */
    public enabled<Flag extends keyof Flags>(flag: Flag, override?: OverrideFn<Actor> | boolean): boolean {
        if (this.flags[flag] === false) return false

        if (typeof override === 'function') {
            return override(flag)
        } else if (typeof override === 'boolean') {
            return override
        } else if (typeof override === 'object') {
            if (!this.actors) {
                throw new Error("Spectra is not configured with an actor checker. (See https://github.com/zhaoworks/spectra-flags)")
            }

            return this.actors.check(flag, override.actor)
        }

        return true
    }
}

/**
 * Initializes Spectra.
 */
export default function spectra<F extends Record<string, boolean>, A = unknown>(options: SpectraOptions<A, F>) {
    return new SpectraFlags(options)
}