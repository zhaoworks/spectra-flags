import bitbouncer from 'bitbouncer'

import { SpectraActorChecker } from "./spectra-actor-checker";
import { Flag } from '..';

/**
 * Spectra + Bitbouncer
 */
export class SpectraBitbouncer extends SpectraActorChecker<{ flags: number }> {
    /**
     * Initializes Spectra Actor Checker with bitbouncer.
     */
    public constructor(
        protected bouncer: ReturnType<typeof bitbouncer.from>
    ) {
        super()
    }

    /**
     * Checks if an actor's flags can run under flag given by Spectra.
     */
    public check(flag: Flag, actor: { flags: number; }): boolean {
        return this.bouncer.can(actor.flags, flag as string | number)
    }

}