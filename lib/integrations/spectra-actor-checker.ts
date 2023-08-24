import { Flag } from "..";

/**
 * The flag checker for spectra actors.
 */
export abstract class SpectraActorChecker<Actor> {
    /**
     * Checks a flag against an actor.
     */
    public abstract check(flag: Flag, actor: Actor): boolean
}