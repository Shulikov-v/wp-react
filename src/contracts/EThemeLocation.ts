export default class EThemeLocation {
    private static values: EThemeLocation[] = new Array();

    constructor( private value: string ) {
        EThemeLocation.values.push( this );
    }

    toString() {
        return this.value;
    }

    static fromString( str: string ): EThemeLocation {
        return EThemeLocation.values.find( l => l.value === str );
    }
}

export const SIDE = new EThemeLocation( 'side_nav' );
export const START = new EThemeLocation( 'start_menu' );